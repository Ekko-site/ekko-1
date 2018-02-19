let fs = require('fs')

let element = fs.readFileSync(__dirname + '/element/js/client.js', 'utf8');
let boutique = fs.readFileSync(__dirname + '/boutique/js/client.js', 'utf8');
let junipero = fs.readFileSync(__dirname + '/junipero/js/client.js', 'utf8');
let kafee = fs.readFileSync(__dirname + '/kafee/js/client.js', 'utf8');
let swiss = fs.readFileSync(__dirname + '/swiss/js/client.js', 'utf8');
let kendrick = fs.readFileSync(__dirname + '/kendrick/js/client.js', 'utf8');
let snapshot = fs.readFileSync(__dirname + '/snapshot/js/client.js', 'utf8');
let funk = fs.readFileSync(__dirname + '/funk/js/client.js', 'utf8');
let arlo = fs.readFileSync(__dirname + '/arlo/js/client.js', 'utf8');

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
