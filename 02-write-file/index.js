const fs = require('fs');
const path = require('path');
const { stdin, stdout} = process;
const textFile = path.join(__dirname, 'text.txt');

// fs.writeFile (
//   textFile,
//   '',
//   (err) => {
//     if (err) throw err;
//     stdout.write('Введите список\n');
//   }
// );

fs.open(textFile, 'w', (err) => {
  if(err) throw err;
  stdout.write('Введите текст\n');
});


// const readline = require('readline');
// const { stdin: input, stdout: output } = require('process');

// const rl = readline.createInterface({ input, output });

// rl.on('line', (input) => {
//   console.log(`Received: ${input}`);
// });

stdin.on('data', (data) => {

  if (data.toString().trim() == 'exit') {
    process.exit();
  }
    
  fs.appendFile(
    textFile,
    data,
    err => {
      if (err) throw err;
      console.log('Что-нибудь еще?');
    }
  );
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => {
  stdout.write('Файл создан. Удачи!');
});
