import fs from 'fs'
import browserify from 'browserify'
import babelify from 'babelify'
import NCP from 'ncp'
import themes from './../dist/'

const { ncp } = NCP

const outputPath = '../etc/ekko-renderer/dist/views/themes/'

ncp('dist/', outputPath, err => {
    if(err) {
        return console.error(err)
    }
    console.log(`Built`)
    Object.keys(themes).forEach(themeName => {
        const mainFile = `dist/${themeName}/js/client.js`
        const bundleFs = fs.createWriteStream(`${outputPath}${themeName}/js/client.js`)

        const b = browserify(mainFile)
        b.transform(babelify)
        b.transform({
          global: true
        }, 'uglifyify')
        b.bundle().pipe(bundleFs)

        bundleFs.on('finish', () => {
            console.log('finished clients')
        })
    })
})
