const fse = require("fs-extra");
const junk = require("junk");

const getEntries = async () => {
  const themeDirs = await fse.readdir(__dirname);
  const themes = themeDirs
    .filter(junk.not)
    .filter(d => !["components", "layouts", "webpack.config.js"].includes(d));

  return themes.map(themeName => {
    return {
      path: `${__dirname}/${themeName}/js/client.js`,
      name: themeName
    };
  });
};

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    const entries = await getEntries();
    const configs = entries.reduce((configs, theme) => {
      const { path, name } = theme;
      return [
        ...configs,
        {
          entry: path,
          output: {
            path: `${__dirname}/${name}/js`,
            filename: "built.js"
          }
        }
      ];
    }, []);
    resolve(configs);
  });
};
