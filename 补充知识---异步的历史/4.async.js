let fs = require('fs');
function readFile(filename) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filename, 'utf8', function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        })
    })
}
async function read() {
    let template = await readFile('./template.txt');
    let data = await readFile('./data.txt');
    return template + '+' + data;
}
let result = read();
result.then(data=>console.log(data));