let fs = require('fs')

let element = fs.readFileSync(__dirname + '/element/css/app.css', 'utf8');
let boutique = fs.readFileSync(__dirname + '/boutique/css/app.css', 'utf8');
let junipero = fs.readFileSync(__dirname + '/junipero/css/app.css', 'utf8');
let kafee = fs.readFileSync(__dirname + '/kafee/css/app.css', 'utf8');
let swiss = fs.readFileSync(__dirname + '/swiss/css/app.css', 'utf8');
let kendrick = fs.readFileSync(__dirname + '/kendrick/css/app.css', 'utf8');
let snapshot = fs.readFileSync(__dirname + '/snapshot/css/app.css', 'utf8');
let funk = fs.readFileSync(__dirname + '/funk/css/app.css', 'utf8');
let arlo = fs.readFileSync(__dirname + '/arlo/css/app.css', 'utf8');

export default {
    element,
    boutique,
    junipero,
    kafee,
    swiss,
    kendrick,
    snapshot,
    funk,
    arlo
}
