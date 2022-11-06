const path = require("path");
const fs = require("fs");

fs.readdir(path.join(__dirname, "styles"), "utf-8", (err, files) => {
  if (err) throw err;
  let arrDataCssFiles = [];
  let filesLength = files.length;

  files.forEach((file, ind) => {
    let fileBreakDown = file.split(".");
    const reader = fs.createReadStream(path.join(__dirname, "styles", file));
    reader.on("data", (chunk) => {
      if (fileBreakDown[1] === "css") {
        arrDataCssFiles.push(chunk.toString());
      }
    });

    if(ind === filesLength - 1 ){
      reader.on("end", ()=>{
        fs.writeFile(path.join(__dirname, "project-dist", "bundle.css"), arrDataCssFiles.join(''), (err) => {
            if (err) throw err;          
          }
        );
      });
       console.log("\x1b[32m","🎉bundle.css was created successfully", "\x1b[37m");
    }   
  });
});

