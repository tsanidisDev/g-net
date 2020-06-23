import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import serialize from 'serialize-javascript';
const express = require('express');
import dotenv from 'dotenv';
const serveStatic = require('serve-static');
import * as path from 'path';
import * as fs from 'fs';
import ServerRoutes from '../routes';
import Firebase from './Firebase';
import { ServerRoute } from './typings';
import { App } from '../client/controllers/App/App';
import store from '../client/controllers/App/App_store';

const app = express();
dotenv.config();
const PORT = process.env.TEST_PORT;

export const FB_CONFIG = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};

const database = new Firebase().db;
var data: any, isDataLoaded: boolean;


export function loadData(page?: string) {
    const loadData = new Promise((res, rej) => {
        database.ref("/").on("value",
            (e: any) => {
                data = e.val() as any;
                isDataLoaded = true;
                res(page ? data.page : data);
            });
    })
    return loadData;
}

app.use("/", express.static(path.resolve("public")));

app.get('/', (req, res) => {
    let dataPromise;
    const currentRoute: ServerRoute = ServerRoutes.find(route => matchPath(req.url, route));

    if (currentRoute && currentRoute.loadData) {
        dataPromise = currentRoute.loadData();
    } else {
        dataPromise = Promise.resolve(null);
    }

    console.log("currRoute: ", req.url)
    dataPromise.then((data) => {
        const context = { data };

        const app = ReactDOMServer.renderToString(
            <StaticRouter
                location={req.url}
                context={context}
            >
                <h1>SSR</h1>
                {/* <App store={store} /> */}
            </StaticRouter>
        )

        const indexFile = path.resolve("./public/index.html");

        console.log(data, app, indexFile)
        fs.readFile(indexFile, "utf8", (err, indexData) => {
            // if (err) {
            //     console.error('Something went wrong:', err);
            //     res.status(500).send('Oops, better luck next time!');
            //     return;
            // }
            // if (context.status === 404) {
            //     res.status(404);
            //     return;
            // }
            // if (context.url) {
            //     res.redirect(301, context.url);
            //     return;
            // }

            return res.send(
                indexData
                    .replace('<div id="SiteContainer"></div>', `<div id="SiteContainer">${app}</div>`)
                // .replace(
                //     '</body>',
                //     `<script>window.__ROUTE_DATA__ = ${serialize(data)}</script></body>`
                // )
            )
        })
    })
});

const server = app.listen(PORT, function () {
    // server.close(function () { console.log("closed") })
});

server;