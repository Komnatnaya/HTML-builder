const fs = require('fs');
const path = require('path');

const secretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolder, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      fs.stat(path.join(__dirname, 'secret-folder', file), (err, stats) => {
        if (err) {
          console.log(err);
        } else {
          if(stats.isFile()) {
            console.log(`${path.parse(file).name} - ${path.extname(file).slice(1)} - ${stats.size}b`);
          }
        }
      });
    });
  }
});
