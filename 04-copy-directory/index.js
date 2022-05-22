
const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;

let copyDir = function(folder, copyFolder) {
  fsPromises.mkdir(path.join(__dirname, copyFolder), { recursive: true })
    .then(function() {

      fs.readdir(path.join(__dirname, copyFolder), (err, files) => {
        if (err) {
          console.log(err);
        } else {
          files.forEach((file) => {

            fs.unlink(path.join(path.join(__dirname, copyFolder), file), (err) => {
              if (err) throw err;
            });

          });
        }
      });

      fs.readdir(path.join(__dirname, folder), (err, files) => {
        if (err) {
          console.log(err);
        } else {
          files.forEach((file) => {

            fsPromises.copyFile(path.join(__dirname, folder, file), path.join(__dirname, copyFolder, file))
              .then(function() {})
              .catch(function(error) {
                console.log(error);
              });

          });
        }
      });

    }).catch(function() {
      console.log('failed to create directory');
    });
};

copyDir('files', 'files-copy');
