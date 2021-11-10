const fs = require('fs');
const path = require('path');
const {copyFile }= require('fs/promises');
const  { mkdir, rmdir } = require ('fs/promises');
const  { readdir } = require ('fs/promises');

let dir = path.join(__dirname, 'files-copy');
let currentDir = path.join(__dirname, 'files');

async function copyDirectory () {
    await rmdir(dir, { recursive: true });
    await mkdir(dir, { recursive: true });
    try {
        const files = await readdir(currentDir);
        for (const file of files) {
            const currentFile = path.join(__dirname, 'files', file);
            const destinationFile = path.join(__dirname, 'files-copy', file);
            await copyFile(currentFile, destinationFile);
        }
    } catch (err) {
        console.error(err);
    }
}

copyDirectory();