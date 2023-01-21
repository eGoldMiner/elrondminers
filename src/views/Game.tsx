/* eslint-disable */
import React, { useEffect, useRef, useState, createRef } from 'react';
import Background from './Background';
import { getIsLoggedIn } from "@elrondnetwork/dapp-core/utils";
import { useGetAccountInfo, useGetLoginInfo } from "@elrondnetwork/dapp-core/hooks/account";


export default function Game({ setWindowMint }: any) {

  const { account } = useGetAccountInfo();
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [version, setVersion] = useState('');
  const [wl, setWl] = useState('');
  const [calledWL, setCalledWL] = useState(false);

  useEffect(() => {
    async function fetchWhitelist() {
      try {
        const response = await fetch('https://elrondminers.com/WL.json');
        const whitelist = await response.json();
        setWl(whitelist);
        let wlisted = whitelist.includes(account.address)
        setIsWhitelisted(wlisted)
        setCalledWL(true)
        console.log("Whitelisted : " + wlisted)
      } catch (error) {
        // Handle error
        console.error(error);
      }
    }

    fetchWhitelist();
  }, []);

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
      {calledWL ?
        <div id='div-game-container'>
          <div id='div-game'>
            {!getIsLoggedIn()
              ?
              <h1 style={{ color: "#fff" }}>Please log in</h1>
              : <>
                {isWhitelisted
                  ? <iframe src={version} allowFullScreen><a href="https://elrondminers.itch.io/elrond-miners-game">Play Elrondminers game on itch.io</a></iframe>
                  : <>
                    <h1 style={{ color: "#fff" }}>You do not have the early access !</h1>
                    <h1 style={{ color: "#fff" }}>Grab one by joining our Discord here :</h1>
                    <a href="https://discord.gg/MrBcfZhYwy" target="" className="" style={{ margin: "auto, 0", textAlign: 'center' }}>
                      <img src="images/discord.png" loading="lazy" srcSet="images/discord-p-500.png 500w, images/discord.png 512w" sizes="80px" style={{ margin: "auto" }} />
                    </a>
                  </>
                }
              </>
            }
          </div>
        </div>
        : null}
    </>
  )

}


/* eslint-enable */