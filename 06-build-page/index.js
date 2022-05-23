const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const stream = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
let data = '';
stream.on('data', chunk => data += chunk);
fs.rm(path.join(__dirname, 'project-dist'), {recursive: true, force: true}, () => {
  fsPromises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true })
    .then(function() {
      stream.on('end', () => {
        buildTemplate();
      });

      buildStyles();
      copyDir('assets', path.join('project-dist', 'assets'));

    }).catch(function() {
      console.log('failed to create directory');
    });
});


let buildTemplate = ()=> {
  if(data.includes('{{') ) {
    let startParentheses = data.indexOf('{{');
    let endParentheses = data.indexOf('}}');
    let nameTemplate = data.slice(startParentheses + 2, endParentheses);

    fs.readFile(path.join(__dirname, 'components', `${nameTemplate}.html`), 'utf8', (err, dataTemplate) => {
      if(err) throw err;
      data = data.replace(`{{${nameTemplate}}}`, dataTemplate);
      buildTemplate();
    });
  } else {
    fs.writeFile(
      path.join(__dirname, 'project-dist', 'index.html'),
      data,
      (err) => {
        if (err) throw err;
      }
    );
  }
};

let buildStyles = ()=> {
  fs.open(path.join(__dirname, 'project-dist', 'style.css'), 'w', (err) => {
    if(err) throw err;
  });
  
  fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
    if(err) throw err;
    files.forEach((file) => {
      if (path.extname(file).slice(1) === 'css') {
        fs.readFile(path.join(__dirname, 'styles', file), 'utf8', (err, data) => {
          if(err) throw err;
          fs.appendFile(
            path.join(__dirname, 'project-dist', 'style.css'),
            `\n${data}`,
            err => {
              if (err) throw err;
            }
          );
        });
      }
    });
  });
};

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