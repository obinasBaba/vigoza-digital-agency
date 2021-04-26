import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {theme} from "./theme/theme";
import ThemeWrapper from "./theme/ThemeWrapper";

ReactDOM.render(
    <React.StrictMode>
        <ThemeWrapper theme={theme}>
            <App />
        </ThemeWrapper>
    </React.StrictMode>,
    document.getElementById('root')
);