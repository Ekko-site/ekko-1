import FB from "fb";
import { reduce } from "asyncro";
import ApiError from "@/etc/error";
import { logger } from "@/etc/logger";
import MediaStore from "@/etc/media-store";
FB.options({
  version: "v2.7"
});

class Facebook {
  constructor(token, facebook_id) {
    this.token = token;
    this.facebook_id = facebook_id;
  }

  async extendToken(token) {
    let res;
    try {
      res = await FB.api("oauth/access_token", {
        client_id: process.env.FACEBOOK_APP_ID,
        client_secret: process.env.FACEBOOK_CLIENT_SECRET,
        grant_type: "fb_exchange_token",
        fb_exchange_token: token
      });
    } catch (e) {
      throw new ApiError(502, e);
    }
    const { access_token, expires } = res;
    return {
      access_token
    };
  }

  async fetchPages(
    opts = {
      withoutContent: false
    }
  ) {
    FB.setAccessToken(this.token);
    let res;
    try {
      logger.info("fetching facebook accounts for", this.facebook_id);
      res = await FB.api(this.facebook_id + "/accounts");
    } catch (e) {
      throw new ApiError(502, e);
    }
    logger.info("Fetched facebook accounts for", this.facebook_id, res);
    if (!res) {
      return {
        pages: []
      };
    }
    if (!res.data) {
      return {
        pages: []
      };
    }
    if (!res.data.length) {
      return {
        pages: []
      };
    }
    if (opts.withoutContent) {
      return {
        pages: res.data
      };
    }
    const promises = res.data.map(page =>
      this.fetchPage(page.id, page.access_token)
    );
    const pages = await Promise.all(promises);
    return {
      pages
    };
  }

  fetchSubscribeToPage(res) {
    return {
      subscribed: res
    };
  }

  async fetchPhotos(data, pageId, preview) {
    const mediaStore = new MediaStore();

    const queried = data
      .sort((a, b) => {
        return new Date(b.created_time) - new Date(a.created_time);
      })
      .slice(0, 20)
      .map(photo => {
        return {
          ...photo,
          images: photo.images.filter(image => {
            return image.width == photo.width;
          })
        };
      })
      .filter(photo => photo.images.length)
      .filter(
        photo =>
          ["Cover Photos", "Profile Pictures"].indexOf(photo.album.name) == -1
      );

    if (!queried.length) {
      return {
        photos: []
      };
    }

    if (preview) {
      return {
        photos: queried
      };
    }

    let promises = queried.map(async photo => {
      if (!photo.images.length) {
        return photo;
      }
      const { id } = photo;
      const { source } = photo.images[0];
      const stored = await mediaStore.upload("photo", id, pageId, source);
      return {
        ...photo,
        images: photo.images.map(img => {
          if (img.id !== id) {
            return img;
          }
          return {
            ...img,
            source: stored.fileName
          };
        })
      };
    });

    const photos = await Promise.all(promises);

    return {
      photos
    };
  }

  async fetchPosts(data, pageId, preview) {
    const mediaStore = new MediaStore();

    const queried = data
      .filter(post => post.message)
      .sort((a, b) => {
        return new Date(b.created_time) - new Date(a.created_time);
      })
      .slice(0, 10);

    if (!queried.length) {
      return {
        posts: []
      };
    }

    if (preview) {
      return {
        posts: queried
      };
    }

    let promises = queried.map(async post => {
      if (!post.full_picture) {
        return post;
      }
      const { full_picture, id } = post;
      const stored = await mediaStore.upload("post", id, pageId, full_picture);
      return {
        ...post,
        full_picture: stored.fileName
      };
    });

    const posts = await Promise.all(promises);

    return {
      posts
    };
  }

  async fetchPicture(data, pageId, preview) {
    if (preview) {
      return {
        picture: data
      };
    }
    const mediaStore = new MediaStore();
    const { url } = data;
    const stored = await mediaStore.upload("picture", pageId, pageId, url);
    return {
      picture: {
        ...data,
        url: stored.fileName
      }
    };
  }

  async fetchEvents(data, preview) {
    const mediaStore = new MediaStore();

    const filtered = data.filter(
      event => +new Date(event.start_time) > +new Date()
    );

    if (!filtered.length) {
      return {
        events: []
      };
    }

    if (preview) {
      return {
        events: filtered
      };
    }

    const promises = filtered.map(async event => {
      if (!event.cover) {
        return event;
      }
      const { source: url, id } = event.cover;
      const stored = await mediaStore.upload("event", id, pageId, url);
      return {
        ...event,
        cover: {
          ...event.cover,
          source: stored.fileName
        }
      };
    });

    const events = Promise.all(promises);

    return {
      events
    };
  }

  fetchRatings(data) {
    return {
      ratings: data
    };
  }

  fetchCallToActions(data) {
    return {
      call_to_actions: data
    };
  }

  fetchScreenames(data) {
    return {
      screennames: data
    };
  }

  async storeCover(cover, pageId) {
    const mediaStore = new MediaStore();
    const { source: url, id } = cover;
    const stored = await mediaStore.upload("cover", id, pageId, url);
    return {
      ...cover,
      source: stored.fileName
    };
  }

  async unsubscribeFromPage({ facebookPageId, access_token }) {
    FB.setAccessToken(access_token);
    logger.info("Unsubscribing FB Page", facebookPageId);
    try {
      await FB.api(`${facebookPageId}/subscribed_apps`, "delete");
    } catch (e) {
      logger.error(e);
    }
    logger.info("Unsubscribed FB Page", facebookPageId);
    return {};
  }

  async fetchFBPageByURL(url, token) {
    FB.setAccessToken(token);
    let res;
    try {
      res = await FB.api(url);
    } catch (e) {
      throw new ApiError(502, e);
    }
    const { id } = res;
    return id;
  }

  async fetchPage(
    id,
    token = this.token,
    subscribe = true,
    opts = {
      preview: false
    }
  ) {
    FB.setAccessToken(token);
    const preview = opts.preview;
    const methods = [
      "fetchPage",
      "fetchPhotos",
      "fetchPosts",
      "fetchPicture",
      "fetchEvents",
      "fetchCallToActions",
      "fetchScreenames"
    ]
      .concat(subscribe ? ["fetchSubscribeToPage"] : null)
      .filter(Boolean);

    let res,
      pageFields = [
        "id",
        "name",
        "about",
        "cover",
        "category",
        "description",
        "access_token",
        "hours",
        "link",
        "location",
        "phone",
        "emails",
        "restaurant_services",
        "restaurant_specialties"
      ],
      batch = [
        { method: "get", relative_url: `${id}?fields=${pageFields.join(",")}` },
        {
          method: "get",
          relative_url: `${id}/photos/uploaded?fields=${[
            "images",
            "album",
            "created_time",
            "name",
            "width"
          ].join(",")}`
        },
        {
          method: "get",
          relative_url: `${id}/posts?fields=${[
            "full_picture",
            "object_id",
            "message",
            "created_time"
          ].join(",")}`
        },
        {
          method: "get",
          relative_url: `${id}/picture?type=large&redirect=false`
        },
        {
          method: "get",
          relative_url: `${id}/events?fields=${[
            "cover",
            "name",
            "start_time",
            "end_time",
            "description",
            "place"
          ].join(",")}`
        },
        {
          method: "get",
          relative_url: `${id}/call_to_actions?fields=${[
            "web_url",
            "type",
            "status",
            "web_destination_type"
          ].join(",")}`
        },
        { method: "get", relative_url: `${id}/screennames` }
      ]
        .concat(
          subscribe
            ? [
                {
                  method: "post",
                  relative_url: `${id}/subscribed_apps`,
                  body: `access_token=${token}`
                }
              ]
            : null
        )
        .filter(Boolean);
    try {
      logger.info("fetching facebook page", id);
      res = await FB.api("", "post", {
        batch
      });
    } catch (e) {
      throw new ApiError(502, e);
    }
    if (res.some(r => r.code !== 200)) {
      logger.error(
        "error fetching facebook page",
        id,
        this.facebook_id,
        res
          .filter(r => r.code !== 200)
          .map(r => ({ body: JSON.parse(r.body), headers: r.headers }))
      );
      throw new ApiError(502, "Bad Facebook request");
    }
    const bodies = res.map(r => JSON.parse(r.body));
    const data = await reduce(
      bodies,
      async (accum, current, index) => {
        const methodName = methods[index];
        const method = this[methodName];
        if (methodName == "fetchPage") {
          current.cover =
            current.cover && !preview
              ? await this.storeCover(current.cover, id)
              : current.cover;
          return {
            ...accum,
            ...current
          };
        }
        if (methodName == "fetchSubscribeToPage") {
          return {
            ...accum,
            ...method(current)
          };
        }
        const result = await method(current.data, id, preview);
        return {
          ...accum,
          ...result
        };
      },
      {}
    );
    logger.info("Fetched FB page", id);
    const { access_token, subscribed } = data;
    return {
      data,
      access_token,
      id,
      subscribed: subscribed && subscribed.success
    };
  }
}

export default Facebook;
