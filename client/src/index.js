import React from 'react';
import { createRoot } from 'react-dom/client';
import Data from './routes/Data';
import reportWebVitals from './reportWebVitals';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Graph from './routes/Graphs';
import "./index.css"


const root = createRoot(document.getElementById('root'))
const main = (
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Data/>}/> 
        <Route path = "/graph" element={<Graph/>}/>
        {/* TODO: Replace the above path with /data, and create a separate connected homepage. */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

root.render(main)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
