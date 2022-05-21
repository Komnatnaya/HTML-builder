const fs = require('fs');
const path = require('path');
const { stdin, stdout} = process;
const textFile = path.join(__dirname, 'text.txt');

fs.open(textFile, 'w', (err) => {
  if(err) throw err;
  stdout.write('Введите текст\n');
});

stdin.on('data', (data) => {
  if (data.toString().trim() == 'exit') {
    process.exit();
  }

  fs.appendFile(
    textFile,
    data,
    err => {
      if (err) throw err;
    }
  );
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => {
  stdout.write('Файл создан. Удачи!');
});
