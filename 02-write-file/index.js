const fs = require('fs');
const path = require('path');
const { stdin, stdout} = process;

const textFile = path.join(__dirname, 'text.txt');
const stream = fs.createWriteStream(textFile);

stdout.write('Введите, пожалуйста, текст.\n');

stdin.on('data', (data) => {
  if (data.toString().trim().toLowerCase() == 'exit') {
    process.exit();
  }

  stream.write(data);
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => {
  stdout.write('Файл создан. Удачи!');
});
