import http from 'http';
import {Server} from 'socket.io';
import {Request, Response} from 'express';

const express = require('express');
let app = express();

app.set('view engine', 'ejs');
app.use('/static', express.static(__dirname + '/../static'));

const server = new http.Server(app);
const sio = new Server(server);

app.get('/', (req: Request, res: Response) =>
{
    res.render('index.html.ejs');
})

server.listen(6969);
