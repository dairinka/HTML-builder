const path = require("path");
const fs = require("fs");
const promise = require("fs/promises");
const { copyFile } = promise;
const EventEmitter = require("events");
const emitter = new EventEmitter();

class BuildHtml {
  constructor() {
    this.dir = __dirname;
    this.projectDir = "project-dist";
    this.cssFileProject = "style.css";
    this.htmlComponentsDir = "components";
    this.htmlFileProject = "index.html";
    this.htmlTemplate = "template.html";
    this.readHtmlTemplate = "";
  }

  createDir(newDir) {
    promise.mkdir(this._doPath(newDir),{ recursive:true})
   
  }

  
  _doPath(...someDir) {
    return path.resolve(__dirname, someDir.join("/"));
  }

  copyFiles(fromDir, toDir) {
    promise.rm(this._doPath(toDir),{ recursive:true, force:true}).then(()=>{
      promise.mkdir(this._doPath(toDir),{ recursive:true})
      }).then(() => {
        fs.readdir(this._doPath(fromDir), "utf-8", (err, files) => {
          if (err) throw err;
      
          files.forEach((file) => {
            fs.stat(this._doPath(fromDir, file), (err, stats) => {
              if (err) throw err;

              if (stats.isFile()) {
                try {
                  copyFile(this._doPath(fromDir, file), this._doPath(toDir, file));
                
                } catch {
                  console.log("The file could not be copied");
                }
              } else {
                this.copyFiles(`${fromDir}\\${file}`, `${toDir}\\${file}`);
              }
            });
          });
        });
     }).catch((err) => { if(err) throw err})
    console.log("\x1b[34m",`files from ${fromDir}`, "\x1b[32m", "was copied to", "\x1b[34m",`${toDir}`,"\x1b[37m");
  }

  getStyleCss(cssDir) {
    fs.readdir(this._doPath(cssDir), "utf-8", (err, files) => {
      if (err) throw err;
      let arrDataCssFiles = [];
      let filesLength = files.length;

      files.forEach((file, ind) => {
        let fileBreakDown = file.split(".");
        const reader = fs.createReadStream(this._doPath(cssDir, file));
        reader.on("data", (chunk) => {
          if (fileBreakDown[fileBreakDown.length - 1] === "css") {
            arrDataCssFiles.push(chunk.toString() + '\n');
          }
        });

        if(ind === filesLength - 1 ){
          reader.on("end", ()=>{
            fs.writeFile(this._doPath(this.projectDir,this.cssFileProject), arrDataCssFiles.join(''), (err) => {
                if (err) throw err;          
              }
            );
          });
          console.log("🎉 style.css", "\x1b[32m","was created successfully", "\x1b[37m");
        }   
      });
    });

  }

  getIndexHtml(){
    let reader = fs.ReadStream(this._doPath(this.htmlTemplate), "utf-8");
    reader.on('data', (chunk) =>{
      this.readHtmlTemplate = chunk;
    })
   
    fs.readdir(this._doPath(this.htmlComponentsDir), "utf-8", (err, files) => {
      if(err) throw err;
      files.forEach( (file, ind) => {
        
        let parsefileName = file.split(".")[0];
        let contentComponent = fs.ReadStream(this._doPath(this.htmlComponentsDir, file), "utf-8");
        contentComponent.once('data', (chunk) =>{
          this.readHtmlTemplate = this.readHtmlTemplate.replace(`{{${parsefileName}}}`, chunk );
        
          fs.writeFile(this._doPath(this.projectDir, this.htmlFileProject), this.readHtmlTemplate, (err) => {
            if(err) throw err;
          })
        })
      })
    })
    console.log("🎉 index.html", "\x1b[32m", "was created successfully", "\x1b[37m");
  }  
    
}
const build = new BuildHtml();
build.copyFiles('assets','project-dist\\assets');
build.getStyleCss('styles');
build.getIndexHtml();

