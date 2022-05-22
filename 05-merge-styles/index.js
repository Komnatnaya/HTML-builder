const fs = require('fs');
const path = require('path');

fs.open(path.join(__dirname, 'project-dist', 'bundle.css'), 'w', (err) => {
  if(err) throw err;
});

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      if (path.extname(file).slice(1) === 'css') {
        fs.readFile(path.join(__dirname, 'styles', file), 'utf8', (err, data) => {
          if (err) {
            console.log(err);
          } else {
            fs.appendFile(
              path.join(__dirname, 'project-dist', 'bundle.css'),
              `\n${data}`,
              err => {
                if (err) throw err;
              }
            );
          }
        });
      }
    });
  }
});