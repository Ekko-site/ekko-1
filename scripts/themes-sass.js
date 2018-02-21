import fse from 'fs-extra'
import junk from 'junk'
import sass from 'node-sass'

const processSass = async theme => {
    return new Promise((resolve, reject) => {
        const themePath = `${__dirname}/../src/themes/${theme}`
        sass.render({
            file: `${themePath}/sass/app.scss`,
            outputStyle: 'compressed'
        }, async (err, result) => {
            if(err) return reject(err)
            if(result) {
                let output
                const outputPath = `${themePath}/css/app.css`
                const outputCSS = result.css.toString()
                try {
                    output = await fse.outputFile(outputPath, outputCSS)
                } catch (error) {
                    return reject(error)
                }
                return resolve()
            }
        })
    })
}

(async () => {
    try {
        const themeDirs = await fse.readdir(`${__dirname}/../src/themes/`)
        const themes = themeDirs
                        .filter(junk.not)
                        .filter(d => !['components', 'layouts'].includes(d))
        const css = await Promise.all(themes.map(processSass))
    } catch (error) {
        console.error(error)
    }
})()
