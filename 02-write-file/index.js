const fs = require('fs');
const path = require('path');
const { stdin, stdout} = process;

const textFile = path.join(__dirname, 'text.txt');
const stream = fs.createWriteStream(textFile);

const readline = require('readline');
const rl = readline.createInterface({input: stdin, output: stdout});

stdout.write('Введите, пожалуйста, текст.\n');

rl.on('line', (input) => {
  if (input.toString().trim().toLowerCase() === 'exit') {
    stdout.write('Файл создан. Удачи!');
    rl.close();
  } else {
    stream.write(`${input}\n`);
  }
});

rl.on('SIGINT', () => {
  stdout.write('Файл создан. Удачи!');
  rl.close();
});
