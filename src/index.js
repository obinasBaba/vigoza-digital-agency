import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {theme} from "./theme/theme";
import ThemeWrapper from "./theme/ThemeWrapper";
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
        <ThemeWrapper theme={theme} valueOf={{}}>
            <Router>
                <App />
            </Router>
        </ThemeWrapper>
    </React.StrictMode>,
    document.getElementById('root')
);