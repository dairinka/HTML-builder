const path = require('path');
const fs = require('fs');
const { stdout } = process;

fs.readdir(path.join(__dirname, 'secret-folder'), 'utf-8', (err, files) => {
     
  if (err) throw err;
    
  files.forEach(file => {
    
    fs.stat(path.join(__dirname, 'secret-folder', file), (err, stats) => {
          
      if (err) throw err;
         
      if (stats.isFile()) {
        let onlyFileName = file.split(".")[0];
        let fileExtension = file.split(".")[1];
        stdout.write(`${onlyFileName} - ${fileExtension} - ${stats.size / 1024}kb\n`);
      }
    });
  })
    
} )
