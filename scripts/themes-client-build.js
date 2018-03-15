import fse from "fs-extra";
import junk from "junk";
import browserify from "browserify";
import babelify from "babelify";

const build = async theme => {
  return new Promise((resolve, reject) => {
    const themePath = `${__dirname}/../src/themes/${theme}`;
    browserify(`${themePath}/js/client.js`, {
      debug: false
    })
      .transform("uglifyify", { global: true })
      .transform(babelify)
      .bundle()
      .pipe(fse.createWriteStream(`${themePath}/js/built.js`));
    return resolve();
  });
};

(async () => {
  try {
    const themeDirs = await fse.readdir(`${__dirname}/../src/themes/`);
    const themes = themeDirs
      .filter(junk.not)
      .filter(d => !["components", "layouts"].includes(d));
    const built = await Promise.all(themes.map(build));
  } catch (error) {
    console.error(error);
  }
})();
