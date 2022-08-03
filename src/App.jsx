import React from 'react';
import { useEffect } from 'react';
import {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal
} from '@elrondnetwork/dapp-core/UI';
import { DappProvider } from '@elrondnetwork/dapp-core/wrappers';

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import MineExplorerView from './views/MineExplorerView';
import { ThemeProvider } from '@mui/material';
import theme from './styles/theme';
import Menu from './components/Menu';
import Footer from './components/Footer';
import IndexView from './views/IndexView';

const environment = 'devnet';

const App = () => {

  const scripts = [
    // { loading: fetch("https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=62c4a55388e2ee5d2d7cdcbd").then(body => body.text()), isAsync: false },
    // { loading: fetch("js/scripts.js").then(body => body.text()), isAsync: false },
  ]

  useEffect(() => {
    const htmlEl = document.querySelector('html')
    htmlEl.dataset['wfPage'] = '62c4a55388e2eeb60b7cdcc0'
    htmlEl.dataset['wfSite'] = '62c4a55388e2ee5d2d7cdcbd'

    scripts.concat(null).reduce((active, next) => Promise.resolve(active).then((active) => {
      const loading = active.loading.then((script) => {
        new Function(
          // with (this) {
          //   eval(arguments[0])
          // }
        ).call(window, script)

        return next
      })

      return active.isAsync ? next : loading
    }))
  }, [])

  return (
    <Router>
      <DappProvider
        environment={environment}
        customNetworkConfig={{ name: 'customConfig', apiTimeout: 6000 }}
      >
        <TransactionsToastList />
        <NotificationModal />
        <SignTransactionsModals className='custom-class-for-modals' />
        <ThemeProvider theme={theme}>
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
  );
};

export default App;
