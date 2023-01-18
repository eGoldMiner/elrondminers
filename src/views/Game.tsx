/* eslint-disable */
import React, { useEffect, useRef, useState, createRef } from 'react';
import Background from './Background';
import { getIsLoggedIn } from "@elrondnetwork/dapp-core/utils";
import { useGetAccountInfo, useGetLoginInfo } from "@elrondnetwork/dapp-core/hooks/account";
import { wl } from "../../src/WL.json"


export default function Game({ setWindowMint }: any) {

  const { account } = useGetAccountInfo();
  const [isWhitelisted, setIsWhitelisted] = useState(false);
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

  useEffect(() => {
    console.log(wl)
    console.log(account.address)
    setIsWhitelisted(wl.includes(account.address))
    console.log("Whitelisted : " + isWhitelisted)
  }, []);

  return (
    <>
      <div id='div-game-container'>
        <div id='div-game'>
            {isWhitelisted ?
            (
              <iframe src={version} allowFullScreen><a href="https://elrondminers.itch.io/elrond-miners-game">Play Elrondminers game on itch.io</a></iframe>
            ) : (
              <>
                <h1 style={{color: "#fff"}}>You are not Whitelisted !</h1>
                <h1 style={{color: "#fff"}}>Join our Discord here :</h1>
                <a href="https://discord.gg/MrBcfZhYwy" target="" className="" style={{margin: "auto, 0", textAlign: 'center'}}>
                  <img src="images/discord.png" loading="lazy" srcSet="images/discord-p-500.png 500w, images/discord.png 512w" sizes="80px" style={{margin: "auto"}}/>
                </a>
              </>
            )}
        </div>
      </div>
    </>
  )

}


/* eslint-enable */