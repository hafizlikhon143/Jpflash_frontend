import ReactDOM from 'react-dom/client';
import Main from './components/main';
import { HashRouter } from "react-router-dom";
import { StrictMode } from 'react';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <HashRouter hashtype='noslash'>
            <Main/>
        </HashRouter>
    </StrictMode>
)