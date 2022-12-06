/* eslint-disable */
import React, { useEffect, useRef, useState, createRef } from 'react';
import Background from './Background';
import { getIsLoggedIn } from "@elrondnetwork/dapp-core/utils";


export default function Game ({ setWindowMint }: any) {

  const isLoggedIn = getIsLoggedIn();

  return (
    <>
    <div id='div-game-container'>
      <div id='div-game'>
        <iframe src="https://itch.io/embed-upload/6956470?color=333333"><a href="https://kartabble.itch.io/elrondminers">Play Elrondminers on itch.io</a></iframe>
      </div>
    </div>
    </>
  )

}


/* eslint-enable */