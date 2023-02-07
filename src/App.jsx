import React from 'react';
import { useState } from 'react';

import * as DappUI from "@elrondnetwork/dapp-core/UI";
import { DappProvider } from '@elrondnetwork/dapp-core/wrappers';

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import ConnectPanel from 'components/ConnectPanel';
import MintPanel from 'components/MintPanel';
import Background from 'views/Background.tsx';
import Footer from './components/Footer';
import Menu from './components/Menu';
import IndexView from './views/IndexView.tsx';
import MineExplorerView from './views/MineExplorerView';
import Game from 'views/Game';

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
          <Background />
          <Menu setWindowConnect={setWindowStateConnect} />
          <ConnectPanel windowState={windowStateConnect} setWindowState={setWindowStateConnect} setWindowMint={setWindowStateMint} />
          <MintPanel windowState={windowStateMint} setWindowState={setWindowStateMint} />
          <Routes>
            <Route exact path="/" element={<IndexView setWindowMint={setWindowStateMint} />} />
            <Route exact path="/explore" element={<MineExplorerView setWindowConnect={setWindowStateConnect} />} />
            <Route exact path="/game" element={<Game setWindowMint={setWindowStateMint} />} />
          </Routes>
          <Footer />
        </DappProvider>
      </Router>
    </>
  );
}

export default App;