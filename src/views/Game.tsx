/* eslint-disable */
import React, { useEffect, useRef, useState, createRef } from 'react';
import Background from './Background';
import { getIsLoggedIn } from '@elrondnetwork/dapp-core-components';


export default function Game ({ setWindowMint }: any) {

  const isLoggedIn = getIsLoggedIn();

  return (
    <>
    <div id='div-game-container'>
      <div id='div-game'>
        {isLoggedIn ? (
          <h1>Connected</h1>
         ) : (
          <h1>Not connected</h1>
         )}
      </div>
    </div>
    </>
  )

}


/* eslint-enable */