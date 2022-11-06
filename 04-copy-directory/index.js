const path = require("path");
const fs = require("fs");
const promise = require('fs/promises');
const { copyFile } = promise;

   fs.readdir(path.join(__dirname, "files-copy"), "utf-8", (err, files) => {
     if (err){ return};

     files.forEach((file) => {
       fs.unlink(path.join(__dirname, "files-copy", file), (err) => {
         if (err) throw err;
         
       });
     });
   });

    

fs.readdir(path.join(__dirname, 'files'), 'utf-8', (err, files) => {
  if(err) throw err;

  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
    if (err) throw err});  
 
  files.forEach(file => {

    try {

      copyFile(
        path.join(__dirname, "files", file),
        path.join(__dirname, "files-copy", file)  
      );
      console.log(
        "\x1b[34m",
        `${file}`,
        "\x1b[32m",
        "was copied to",
        "\x1b[34m",
        "files-copy",
        "\x1b[37m"
      );

    } catch {

      console.log('The file could not be copied')
    }
  })
})
