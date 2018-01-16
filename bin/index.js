
const spawn = require('cross-spawn');
const newFolder = process.argv[2];
const chalk = require("chalk");
const ncp = require("ncp").ncp;
const path = require("path");
ncp.limit = 0;

const install = () => {
    console.log(chalk.green.inverse('Installing', newFolder));    
    spawn('npm', ['--prefix', newFolder, 'install' ], { stdio: 'inherit' });
}

const makeThings = () => {
    if (!newFolder) {
        console.log(chalk.red.inverse('Hey!'));
        console.log(chalk.red('I need a name... How about "component-pack my-fancy-name?"'));
        return null;
    } else {
        ncp(path.join(process.argv[1], "/react-npm"), path.join("./", newFolder), function (err) {
            if (err) {
                return console.error(chalk.red(err));
            }
            console.log(chalk.green.inverse("Starting..."));
            console.log(chalk.green(newFolder, "created"));
            install();
        });
    }
}

makeThings();