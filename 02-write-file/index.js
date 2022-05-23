const fs = require('fs');
const path = require('path');
const { stdin, stdout} = process;
const readline = require('readline');

const textFile = path.join(__dirname, 'text.txt');
const stream = fs.createWriteStream(textFile);

// fs.open(textFile, 'w', (err) => {
//   if(err) throw err;
//   stdout.write('Введите текст\n');
// });
stdout.write('Введите, пожалуйста, текст.\n');

const rl = readline.createInterface({input: stdin, output: stdout});

rl.on('line', (input) => {
  if (input.toString().trim().toLowerCase() == 'exit') {
    // process.exit();
    stdout.write('Файл создан. Удачи!');
    rl.close();
  }
  stream.write(`${input}\n`);
});

rl.on('SIGINT', () => {
  stdout.write('Файл создан. Удачи!');
  rl.close();
});

// rl.question('What do you think of Node.js? ', (answer) => {
//   // TODO: Log the answer in a database
//   console.log(
//     `Thank you for your valuable feedback: ${answer}`
//   );

//   rl.close();
// });

// stdin.on('data', (data) => {
//   if (data.toString().trim().toLowerCase() == 'exit') {
//     process.exit();
//   }

//   // fs.appendFile(
//   //   textFile,
//   //   data,
//   //   err => {
//   //     if (err) throw err;
//   //   }
//   // );
//   stream.write(data);
// });

// process.on('SIGINT', () => {
//   process.exit();
// });

// process.on('exit', () => {
//   stdout.write('Файл создан. Удачи!');
// });
