import fse from 'fs-extra'
import junk from 'junk'
import shell from 'shelljs'

const install = async theme => {
  return new Promise((resolve, reject) => {
    const themePath = `${__dirname}/../src/themes/${theme}`
    shell.cd(themePath)
    shell.echo(process.cwd())
    shell.exec('npm install')
    return resolve()
  })
}

(async () => {
  try {
    const themeDirs = await fse.readdir(`${__dirname}/../src/themes/`)
    const themes = themeDirs
      .filter(junk.not)
      .filter(d => !['components', 'layouts'].includes(d))
    const installed = await Promise.all(themes.map(install))
  } catch (error) {
    console.error(error)
  }
})()
