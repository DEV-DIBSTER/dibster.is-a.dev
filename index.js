const ExpressJS = require('express');
const Exec = require('child_process').exec;
const Path = require('path');
const Configuration = require('./config.json');
const Favicon = require('serve-favicon');

const Server = ExpressJS();

Server.use(Favicon(Path.join(__dirname, 'public/favicon.ico')));
Server.use('/public', ExpressJS.static(Path.join(__dirname, "public")));

Server.get("/", (Request, Response) => {
    Response.sendFile(__dirname + '/index.html');
});

function GetFromGitHub(){
    Exec(`git pull`, (error, stdout) => {
        let response = (error || stdout);
        if (!error) {
            if (response.includes("Already up to date.")) {
            } else {
                setTimeout(() => {
                    process.exit();
                }, 1000);
            };
        };
    });
};

setInterval(() => {
    GetFromGitHub();
}, 30 * 1000);

Server.listen(Configuration.Port, () => {
    console.clear();
    console.log(`Server Started on ${Configuration.Port}!`);
});