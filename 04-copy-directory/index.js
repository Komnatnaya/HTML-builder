
const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;
// const filesFolder = path.join(__dirname, 'files');
// const copyFolder = path.join(__dirname, 'files-copy');

let copyDir = function(folder, copyFolder) {
  fsPromises.mkdir(path.join(__dirname, copyFolder), { recursive: true })
    .then(function() {
      console.log('Directory created successfully');

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
              .then(function() {
                console.log('File Copied');
              })
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
