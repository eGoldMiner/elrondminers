import React from 'react';
import { useEffect } from 'react';
import {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal
} from '@elrondnetwork/dapp-core/UI';
import { DappProvider } from '@elrondnetwork/dapp-core/wrappers';

import { ThemeProvider } from '@mui/material';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer';
import Menu from './components/Menu';
import theme from './styles/theme';
import IndexView from './views/IndexView';
import MineExplorerView from './views/MineExplorerView';

const environment = 'devnet';

export default function App(props) {

  const scripts = [
    { loading: fetch("js/scripts2.js").then(body => body.text()), isAsync: false },
    { loading: fetch("js/scripts.js").then(body => body.text()), isAsync: false },
  ]


  useEffect(() => {
    const htmlEl = document.querySelector('html')
    htmlEl.dataset['wfPage'] = '62c4a55388e2eeb60b7cdcc0'
    htmlEl.dataset['wfSite'] = '62c4a55388e2ee5d2d7cdcbd'


    scripts.concat(null).reduce((active, next) => Promise.resolve(active).then((active) => {
      const loading = active.loading.then((script) => {
        new Function(`
          with (this) {
            eval(arguments[0])
          }
      `).call(window, script)

        return next
      })

      return active.isAsync ? next : loading
    }))
  }, [])

  return <>
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
  </>
}