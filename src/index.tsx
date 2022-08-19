import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);


root.render(
  <>
    <span>
      {/* @import url(/css/normalize.css); */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url(/css/normalize.css);
          @import url(/css/webflow.css);
          @import url(/css/elrondminers.css);
          @import url(/css/custom_bootstrap.css);
          @import url(/css/elrondminers.webflow.css);
          @import url(/css/background.css);
        ` }} />


      <span className="af-view">
        <div className="af-class-body">
          <App />
        </div>
      </span>
    </span>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();