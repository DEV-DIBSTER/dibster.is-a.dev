import express, { Express, Request, Response } from 'express';
import favicon from 'serve-favicon';
import { join } from 'path';
import child_process from 'child_process';

const app: Express = express();
const port = process.env.SERVER_PORT || 3000;

app.use(favicon(join(__dirname, 'public/favicon.ico')));
app.use('/public', express.static(join(__dirname, "public")));

app.get("/", (req: Request, res: Response) => {
    res.sendFile(__dirname + '/index.html');
});

 function GetFromGitHub(){
        child_process.exec(`git pull`, (error, stdout) => {
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

app.listen(port, () => {
    console.clear();
    console.log(`Server Started on ${port}!`);
});
