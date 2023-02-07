/* eslint-disable */
import React, { useEffect, useRef, useState, createRef } from 'react';
import Background from './Background';
import { getIsLoggedIn } from "@elrondnetwork/dapp-core/utils";
import { useGetAccountInfo, useGetLoginInfo } from "@elrondnetwork/dapp-core/hooks/account";


export default function Game({ setWindowMint }: any) {

  const { account } = useGetAccountInfo();
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [calledWL, setCalledWL] = useState(false);
  const [nbMiners, setNbMiners] = useState(0);
  const [calledNbMiners, setCalledNbMiners] = useState(false);


  useEffect(() => {
    async function fetchWhitelist() {
      try {
        const response = await fetch('https://elrondminers.com/WL.json');
        const whitelist = await response.json();
        let wlisted = whitelist.includes(account.address)
        setIsWhitelisted(wlisted)
        setCalledWL(true)
      } catch (error) {
        // Handle error
        console.error(error);
      }
    }

    fetchWhitelist();
  }, []);

  useEffect(() => {
    async function checkNbMiners() {
      try {
        const response = await fetch('https://api.elrond.com/accounts/' + account.address + '/nfts/count?collections=EMINERS-5b421f');
        const nbMiners = await response.json();
        setNbMiners(Number(nbMiners))
        setCalledNbMiners(true)
      } catch (error) {
        // Handle error
        console.error(error);
      }
    }

    checkNbMiners();
  }, []);



  return (
    <>
      {calledWL && calledNbMiners ?
        <div id='div-game-container'>
          <div id='div-game'>
            {!getIsLoggedIn()
              ?
              <h1 style={{ color: "#fff" }}>Please log in</h1>
              : <>
                {isWhitelisted || nbMiners > 0
                  ? <iframe src="https://elrondminers.com/WebGL"></iframe>
                  : <>
                    <h1 style={{ color: "#fff" }}>You do not have the early access !</h1>
                    <h1 style={{ color: "#fff" }}>Grab a miner here :</h1>
                    <h2 style={{ color: "#fff", textAlign: 'center', textDecoration: "underline", whiteSpace: "pre", marginBottom: "30%" }} onClick={() => setWindowMint(true)} >Mint Miners</h2>
                    <h1 style={{ color: "#fff" }}>Or get a WL by joining our Discord here :</h1>
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