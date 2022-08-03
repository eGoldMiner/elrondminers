import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <span>
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url(/css/elrondminers.css);
          @import url(/css/custom_bootstrap.css);
          @import url(/css/normalize.css);
          @import url(/css/webflow.css);
          @import url(/css/elrondminers.webflow.css);


          .button-2:hover {
            color: #fff;
            text-shadow: 0 0 3px #212121;
          }
          .button-2 .textspantext {
            max-width: 0;
            -webkit-transition: max-width .5s;
            transition: max-width .5s;
            display: inline-block;
            vertical-align: top;
            white-space: nowrap;
            overflow: hidden;
          }
          .button-2:hover .textspantext {
            max-width: 10rem;
          }
          .textspantext {
            display: block;
            -webkit-box-flex: 0;
            -webkit-flex: 0 0 auto;
            -ms-flex: 0 0 auto;
            flex: 0 0 auto;
          }
            ::-webkit-scrollbar {
               width: 12px;
           }
          ::-webkit-scrollbar-track {
               background-color: rgba(01, 00, 01,0);
               -webkit-border-radius: 20px;
               border-radius: 20px;
           }
           ::-webkit-scrollbar-thumb {
               -webkit-border-radius: 20px;
               border-radius: 20px;
               background: rgb(65, 94, 116);
           }
        ` }} />


      <span className="af-view">
        <div className="af-class-body">
          <App/>
        </div>
      </span>
    </span>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
