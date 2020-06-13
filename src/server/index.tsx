import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

const app = express();

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.listen(4000);