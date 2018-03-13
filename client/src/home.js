import $ from "jquery";
import "waypoints/lib/noframework.waypoints.js";
const Waypoint = window.Waypoint;

// JS for homepage

// Sticky header

$(window).scroll(function() {
  if ($(this).scrollTop() > 1) {
    $(".site-header").addClass("sticky");
  } else {
    $(".site-header").removeClass("sticky");
  }
});

const homepageInit = () => {
  // Fade in effects

  // const waypoint = new Waypoint({
  //     element: document.querySelector('.home-extended-intro'),
  //     handler: direction => {
  //         $('.home-extended-intro').addClass('visible');
  //     },
  //     offset: '60%',
  //     triggerOnce: true
  // })

  // The intro fade ins

  setTimeout(function() {
    $(".home-intro__headline__fb-page").addClass("active");
    $(".fb-circle-img")
      .addClass("flipInX")
      .delay(1000)
      .queue(function(next) {
        next();
        $(".loader")
          .addClass("spinning")
          .delay(1000)
          .queue(function(next) {
            next();
            $(".home-intro__headline__fb-page").removeClass("active");
            $(".loader").addClass("hide");
            $(".triangle")
              .addClass("fadeInUpLeft")
              .delay(600)
              .queue(function(next) {
                next();
                $(".home-intro__headline__create-website").addClass("active");
                $(".big-circle")
                  .addClass("bounceIn")
                  .delay(800)
                  .queue(function(next) {
                    next();
                    $(".shape-wrapper")
                      .addClass("moveback")
                      .delay(400)
                      .queue(function(next) {
                        next();
                        $(".shape-wrapper")
                          .addClass("bounceOut")
                          .delay(750)
                          .queue(function(next) {
                            next();
                            $(".home-intro__headline").addClass("pushup");
                            $(
                              ".home-intro__headline__create-website"
                            ).removeClass("active");
                            $(".site-logo-link__logomark")
                              .addClass("fadeInLeft")
                              .delay(500)
                              .queue(function(next) {
                                $(".main-cta").addClass("fadeIn");
                                next();
                              });
                          });
                      });
                  });
              });
          });
      });
  }, 0);

  // Modals

  $(document).on("click", ".launch-subscribe-modal", function(e) {
    e.preventDefault();
    $("body").addClass("subscribe-modal-active");
  });

  $(document).on("click", ".modal-clicker, .modal-close", function(e) {
    e.preventDefault();
    $("body").removeClass("iframe-modal-active subscribe-modal-active");
  });

  $(document).on("touchstart", ".modal-bg", function(e) {
    e.preventDefault();
  });

  // Laptop fader
  $(".just-works__bg-area > div:gt(0)").hide();
  setInterval(function() {
    $(".just-works__bg-area > :first-child")
      .fadeOut()
      .next("div")
      .fadeIn()
      .end()
      .appendTo(".just-works__bg-area");
  }, 3000);
};

export default homepageInit;
