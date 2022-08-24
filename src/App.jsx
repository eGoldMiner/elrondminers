import React from 'react';
import { useState } from 'react';

import * as DappUI from "@elrondnetwork/dapp-core/UI";
import { DappProvider } from '@elrondnetwork/dapp-core/wrappers';

import { ThemeProvider } from '@mui/material';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Background from 'views/Background.tsx';
import Footer from './components/Footer';
import Menu from './components/Menu';
import theme from './styles/theme';
import IndexView from './views/IndexView.tsx';
import MineExplorerView from './views/MineExplorerView';
import MintPanel from 'components/MintPanel';
import ConnectPanel from 'components/ConnectPanel';

const environment = 'mainnet';
const { TransactionsToastList, SignTransactionsModals, NotificationModal } = DappUI;


const App = () => {
  const [windowStateConnect, setWindowStateConnect] = useState(false);
  const [windowStateMint, setWindowStateMint] = useState(false);

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
            <Menu setWindowConnect={setWindowStateConnect} />
            <ConnectPanel windowState={windowStateConnect}
              setWindowState={setWindowStateConnect}
            />
            <MintPanel windowState={windowStateMint}
              setWindowState={setWindowStateMint}
            />
            <Routes>
              <Route exact path="/" element={<IndexView setWindowMint={setWindowStateMint} />} />
              <Route exact path="/explore" element={<MineExplorerView />} />
              <Route path="*"
                element={
                  <Navigate to="/" />
                }>
              </Route>
            </Routes>
            <Footer />
          </ThemeProvider>
        </DappProvider>
      </Router>
    </>
  );
}

export default App;