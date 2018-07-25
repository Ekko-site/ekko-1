import fse from "fs-extra";
import junk from "junk";

const getEntries = async () => {
  const themeDirs = await fse.readdir(__dirname);
  const themes = themeDirs
    .filter(junk.not)
    .filter(d => !["components", "layouts", "webpack.config.js"].includes(d));

  return themes.map(themeName => {
    return {
        path: `./${themeName}/js/built.js`,
        name: themeName
    }
  });
};

export default () => {
  return new Promise((resolve, reject) => {
    const entries = await getEntries()
    const configs = entries.reduce((configs, theme) => {
        const { path, name } = theme
        return [
            ...configs,
            {
                entry: name,
                output: {
                    path: `./${name}/js/`,
                    filename: 'built.js'
                }
            }
        ]
    }, [])
    resolve(configs)
  });
};
