const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });

let file = path.join(__dirname, 'text.txt');
let writableStream = fs.createWriteStream(file,'utf8')
writableStream.on('open', () => {});

console.log('Hi! Write me something!');

 rl.on('line', (input) => {
     if (input !== 'exit') {
        writableStream.write(input + '\n');
     } else {
        console.log('Thank you for your text!');
        rl.pause();
     }
    
});

rl.on('SIGINT', () => {
    console.log('Thank you for your text!');
    rl.pause();
});

