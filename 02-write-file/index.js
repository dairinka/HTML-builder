const path = require('path');
const fs = require('fs');
const readline = require("readline");
const { stdin: input, stdout:output } = process;
const rl = readline.createInterface({input, output})

fs.writeFile(path.join(__dirname, '02-write-file.txt'), '', (err) => {
  if(err) throw err;

  console.log("\x1b[32m",'file was made\n');
  console.log("\x1b[36m", "What would you like to write a file?", "\x1b[37m");

  rl.on("line", (answer) => {
  
    if(answer === 'exit'){
      console.log("\x1b[35m", "Glad to see you! Bye", "\x1b[37m");
      rl.close();
      rl.removeAllListeners();
    } else {
      
      fs.appendFile(path.join(__dirname, "02-write-file.txt"),`${answer}\n`,
        (err) => {
        
          if (err) throw err;
          console.log("\x1b[32m", "text was added", "\x1b[37m");
        }
      );
    }
       
  });          

    
});

rl.on("SIGINT", () => {
  console.log("\x1b[35m", "Glad to see you! Bye", "\x1b[37m");
  rl.close();
  rl.removeAllListeners();
});

