
const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;

let copyDir = function(folder, copyFolder) {
  fsPromises.mkdir(path.join(__dirname, copyFolder), { recursive: true })
    .then(function() {
      copyFiles(folder, copyFolder);

    }).catch(function() {
      console.log('failed to create directory');
    });
};

let copyFiles = (folder, copyFolder)=> {
  fs.readdir(path.join(__dirname, folder), (err, files) => {
    if(err) throw err;
    files.forEach((file) => {
      fs.stat(path.join(__dirname, folder, file), (err, stats) => {
        if(err) throw err;
        if(stats.isFile()) {
          fsPromises.copyFile(path.join(__dirname, folder, file), path.join(__dirname, copyFolder, file))
            .then(function() {})
            .catch(function(error) {
              console.log(error);
            });
        } else {
          copyDir(path.join(folder, file), path.join(copyFolder, file));
        }
      });
    });
  });
};

fs.rm(path.join(__dirname, 'files-copy'), {recursive: true, force: true}, (err) => {
  if(err) throw err;
  copyDir('files', 'files-copy');
});
