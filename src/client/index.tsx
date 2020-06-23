import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { IS_MOBILE, IS_EMBED } from './config';
import "./main.scss";
import store from './controllers/App/App_store';
import { App } from './controllers/App/App';



(function () {

    if (IS_MOBILE) {
        document.querySelector("body").classList.add("mobile");
    }
    if (IS_EMBED) {
        document.querySelector("body").classList.add("embed");
    }

    ReactDOM.hydrate(
        <BrowserRouter>
            <App />
        </BrowserRouter>
        , document.getElementById('SiteContainer'), () => {
        });
}());