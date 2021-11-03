const  { readdir } = require ('fs/promises');
const fs = require('fs');
const path = require('path');

let stylesDir = path.join(__dirname, 'styles');
let destinationFile = path.join(__dirname, 'project-dist', 'bundle.css');

async function mergeStyles() {
    fs.WriteStream(destinationFile);
    try {
        const files = await readdir(stylesDir);
        for (const file of files) {
            const fileJoin = path.join(__dirname, 'styles', file);
            fs.stat(fileJoin, (error, stats) => {
                if (error) {
                  console.log(error);
                }
                else {
                  if (!stats.isDirectory() && path.extname(file) === '.css') {
                    let readableStream = fs.createReadStream(fileJoin,'utf8')
                    readableStream.on('data', function (data) {
                        fs.appendFile(destinationFile, data, (err) => {
                            if (err) throw err;
                        });
                    }) 
                  }
                }
            }) 
        }
    } catch (err) {
        console.error(err);
    }
}

mergeStyles()