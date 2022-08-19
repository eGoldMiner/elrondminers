import React from 'react';
//import { useEffect } from 'react';

import * as DappUI from "@elrondnetwork/dapp-core/UI";
import { DappProvider } from '@elrondnetwork/dapp-core/wrappers';

import { ThemeProvider } from '@mui/material';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer';
import Menu from './components/Menu';
import theme from './styles/theme';
import IndexView from './views/IndexView.tsx';
import MineExplorerView from './views/MineExplorerView';
import Background from 'views/Background';

const environment = 'mainnet';
const { TransactionsToastList, SignTransactionsModals, NotificationModal } =
  DappUI;
const App = () => {
  // const scripts = [
  //     { loading: fetch("https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=62c4a55388e2ee5d2d7cdcbd").then(body => body.text()), isAsync: false },
  //     { loading: fetch("js/scripts.js").then(body => body.text()), isAsync: false },

  // ]

  // useEffect(() => {
  //     const htmlEl = document.querySelector('html')
  //     htmlEl.dataset['wfPage'] = '62c4a55388e2eeb60b7cdcc0'
  //     htmlEl.dataset['wfSite'] = '62c4a55388e2ee5d2d7cdcbd'

  //     scripts.concat(null).reduce((active, next) => Promise.resolve(active).then((active) => {
  //         const loading = active.loading.then((script) => {
  //             /*jslint evil: true */
  //             new Function(`
  //               with (this) {
  //                 eval(arguments[0])
  //               }
  //             `).call(window, script)

  //             return next
  //         })

  //         return active.isAsync ? next : loading
  //     }))
  // }, [])

  return (
    <>
      <Router>
        <DappProvider
          environment={environment}
          customNetworkConfig={{ name: 'customConfig', apiTimeout: 6000 }}
        >
          <TransactionsToastList />
          <NotificationModal />
          <SignTransactionsModals className='custom-class-for-modals' />
          <ThemeProvider theme={theme}>
            <Background />
            <Menu />
            <Routes>
              <Route exact path="/" element={<IndexView />} />
              <Route exact path="/explore" element={<MineExplorerView />} />
              {/* <Route path='*' element={<PageNotFound />} /> */}
            </Routes>
            <Footer />
          </ThemeProvider>
        </DappProvider>
      </Router>
    </>
  );
}

export default App;