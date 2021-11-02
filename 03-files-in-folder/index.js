const  { readdir } = require ('fs/promises');
const fs = require('fs');
const path = require('path');

let secretDir = path.join(__dirname, '/secret-folder');

async function readDirectory() {
    try {
        const files = await readdir(secretDir);
        for (const file of files) {
            const fileJoin = path.join(__dirname, '/secret-folder', file);
            fs.stat(fileJoin, (error, stats) => {
                if (error) {
                  console.log(error);
                }
                else {
                  if (!stats.isDirectory()) {
                      const extName = path.extname(fileJoin);
                    console.log(`${path.basename(fileJoin, extName)} - ${extName.substring(1)} - ${stats.size/1000}kb`);
                  }
                }
            }) 
        }
    } catch (err) {
        console.error(err);
    }
}

readDirectory()