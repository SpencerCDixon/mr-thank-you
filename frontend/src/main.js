import { h, render } from 'preact';
import App from './components/app.js';
import 'styles/normalize.css';
import 'styles/global.css';
import 'whatwg-fetch';

render(<App />, document.body)
