/* eslint-disable */
import React, { useEffect, useRef, useState, createRef } from 'react';
import Background from './Background';
import { getIsLoggedIn } from "@elrondnetwork/dapp-core/utils";


export default function Game({ setWindowMint }: any) {

  const [version, setVersion] = useState('');
  useEffect(() => {
    async function fetchStringVersion() {
      try {
        const response = await fetch('https://elrondminers.com/version.txt');
        const text = await response.text();
        setVersion('https://itch.io/embed-upload/' + text + '?color=333333');
      } catch (error) {
        // Handle error
        console.error(error);
      }
    }

    fetchStringVersion();
  }, []);

  return (
    <>
      <div id='div-game-container'>
        <div id='div-game'>
          <iframe src={version} allowFullScreen><a href="https://elrondminers.itch.io/elrond-miners-game">Play Elrondminers game on itch.io</a></iframe>
        </div>
      </div>
    </>
  )

}


/* eslint-enable */