const  { readdir } = require ('fs/promises');
const fs = require('fs');
const  { mkdir } = require ('fs/promises');
const {copyFile }= require('fs/promises');
const path = require('path');

let componentsPath = path.join(__dirname, 'components');
const templateFile = path.join(__dirname, 'template.html');
let dir = path.join(__dirname, 'project-dist');
let stylesDir = path.join(__dirname, 'styles');
let destinationFile = path.join(__dirname, 'project-dist', 'style.css');
let currentDirAssets = path.join(__dirname, 'assets');


async function buildHTML() {
    await mkdir(dir, { recursive: true });
    let fileHTML = path.join(__dirname, 'project-dist', 'index.html');
    let writableStream = fs.createWriteStream(fileHTML,'utf8')
    writableStream.on('open', () => {});
    try {
        const files = await readdir(componentsPath);
        
        let readableStream = fs.createReadStream(templateFile,'utf8');
        readableStream.on('data', function (data) {
            for (const file of files) {
                const fileJoin = path.join(__dirname, 'components', file);
                fs.stat(fileJoin, (error, stats) => {
                    if (error) {
                      console.log(error);
                    }
                    else {
                      if (!stats.isDirectory() && path.extname(file) === '.html') {
                        let readableStream = fs.createReadStream(fileJoin,'utf8')
                        readableStream.on('data', function (dataComp) {
                            let re = `{{${path.basename(fileJoin, '.html')}}}`;
                            let newstr = data.replace(re, dataComp);
                            data = newstr;
                            fs.writeFile(fileHTML, data, function(){})
                        })
                      }
                    }
                }) 
            }  
        }) 
    } catch (err) {
        console.error(err);
    }
}

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

async function copyFilesDirectory (dirName) {
    let dir = path.join(__dirname, 'project-dist', 'assets', dirName);
    await mkdir(dir, { recursive: true });
    try {
        let inputDir = path.join(__dirname, 'assets', dirName);
        const files = await readdir(inputDir);
        for (const file of files) {
            const currentFile = path.join(__dirname, 'assets', dirName, file);
            const destinationFile = path.join(__dirname, 'project-dist', 'assets', dirName, file);
            fs.WriteStream(destinationFile);
            await copyFile(currentFile, destinationFile);
        }
    } catch (err) {
        console.error(err);
    }
}

async function copyDirectory () {
    try {
        const directories = await readdir(currentDirAssets);
        for (const directory of directories) {
            copyFilesDirectory(directory);
        }
    } catch (err) {
        console.error(err);
    }
}

buildHTML();
mergeStyles();
copyDirectory();



