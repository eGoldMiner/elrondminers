import React, { useEffect, useState, useRef } from "react";
import { useWalletConnectLogin } from '@elrondnetwork/dapp-core/hooks/login';
import { useGetAccountInfo, useGetLoginInfo } from "@elrondnetwork/dapp-core/hooks/account";
import QRCode from 'qrcode';

const ConnectPanel = ({ windowState, setWindowState })=> {

    const buttonMaiarAppConnect = useRef();
    const buttonMaiarExtConnect = useRef();
    const buttonWebWalConnect = useRef();
    const informationsConnect = useRef();
    const returnButtonConnect = useRef();

        const logoutRoute = '/';
        const callbackRoute = '/';
        const token = '';

        const { address, account } = useGetAccountInfo();

        const [qrCodeSvg, setQrCodeSvg] = useState('');
        const isMobileDevice = platform?.os?.family === 'iOS' || platform?.os?.family === 'Android';

        const [
             initLoginWithWalletConnect,
             { error },
             { uriDeepLink, walletConnectUri }
         ] = useWalletConnectLogin({
             logoutRoute,
             callbackRoute,
             token
             });


         const generateQRCode = async () => {
             if (!walletConnectUri) {
                 return;
             }
             console.log(walletConnectUri);
             const svg = await QRCode.toString(walletConnectUri, {
                 type: 'svg'
             });

             setQrCodeSvg(svg);
         };

         const { isLoggedIn } = useGetLoginInfo();

         React.useEffect(() => {
           if (isLoggedIn) {
             console.log("oui")
           }
         }, [isLoggedIn]);


        //setUserConnected(true);

        useEffect(() => {
            initLoginWithWalletConnect(true);
        }, []);

    function clickMaiarApp() {
        generateQRCode();
        buttonMaiarExtConnect.current.style.display = "none";
        buttonWebWalConnect.current.style.display = "none";
        informationsConnect.current.style.display = "none";
        returnButtonConnect.current.style.display = "block";
    }

    function initConnectMenu() {
        buttonMaiarExtConnect.current.style.display = "flex";
        buttonWebWalConnect.current.style.display = "flex";
        informationsConnect.current.style.display = "block";
        returnButtonConnect.current.style.display = "none";
    }

    function disconnect() {
        initConnectMenu();
        setUserConnected(false);
    }

    return (
        <div className="divconnectpanel"
            id="connectPanel"
            style={{ opacity: windowState ? '1' : '0', visibility: windowState ? 'visible' : 'hidden', height: userConnected ? '360px' : '430px'}}>
            <div className="divconnectcontainer" id="connectContainer" style={{ display: userConnected ? 'none' : 'initial'}}>
                <div className="divclosebtnconnect" onClick={() => setWindowState(false)}></div>
                <div className="divreturnbtnconnect" ref={returnButtonConnect} onClick={initConnectMenu}></div>
                <div>
                    <div className="text-block-7">Connect wallet</div>
                    <div className="text-block-6">Please select your login method :</div>
                </div>
                <div className="divbuttonsconnect">
                    <div className="divmaiarappconnect" ref={buttonMaiarAppConnect} onClick={clickMaiarApp}>
                        <a className="button-connect-elrond w-button">Maiar App</a>
                        <img src="images/smartphone-1.png" loading="lazy" srcSet="images/smartphone-1-p-500.png 500w, images/smartphone-1.png 512w" sizes="35px" alt="" className="imagemaiarapp" />
                    </div>
                    <div className="divmaiarextensionconnect" ref={buttonMaiarExtConnect}>
                        <a className="button-connect-elrond w-button">Maiar Extension</a>
                        <img src="images/puzzle-1.png" loading="lazy" srcSet="images/puzzle-1-p-500.png 500w, images/puzzle-1.png 512w" sizes="28px" alt="" className="imagemaiarextension" />
                    </div>
                    <div className="divwebwalletconnect" ref={buttonWebWalConnect}>
                        <a className="button-connect-elrond w-button">Web Wallet</a>
                        <img src="images/internet-1.png" loading="lazy" srcSet="images/internet-1-p-500.png 500w, images/internet-1.png 512w" sizes="28px" alt="" className="imagemaiarextension" />
                    </div>
                </div>
                <div className="m-3 w-48 h-48" dangerouslySetInnerHTML={{__html: qrCodeSvg}}/>
                {isMobileDevice ?
                (
                    <>
                      <p>Open Maiar Login</p>
                      <a
                        href={uriDeepLink}
                        rel='noopener noreferrer nofollow'
                        target='_blank'
                      >
                      </a>
                    </>
                ):(<></>)}

                <div ref={informationsConnect}>
                    <div className="divhowtoconnect">
                        <a href="https://help.maiar.com/en/articles/5161195-what-is-the-maiar-login" target="_blank" rel="noreferrer noopener" className="link-block-5 w-inline-block">
                            <div className="text-block-9">How to connect ?</div>
                        </a>
                    </div>
                    <div className="divcreatewallet">
                        <a href="https://wallet.elrond.com/create" target="_blank" rel="noreferrer noopener" className="link-block-5 w-inline-block">
                            <div className="text-block-9">Create an Elrond Wallet</div>
                        </a>
                    </div>
                    <div className="div-block-48">
                        <img src="images/Fichier-7.png" loading="lazy" alt="" className="image-17" /></div>
                </div>
            </div>
            <div className="divconnectcontainer divconnectcontainer-copy" style={{ display: userConnected ? 'initial' : 'none' }}>
                <div className="divclosebtnconnect"></div>
                <div>
                    <div className="text-block-7">Account</div>
                    <div className="text-block-6">Information</div>
                </div>
                <div className="div-block-58">
                    <div className="div-block-59">
                        <img src="images/wallet-svgrepo-com.svg" loading="lazy" alt="" className="image-20" />
                        <div className="text-block-15">Address : </div>
                    </div>
                    <div className="text-block-16">{address.substring(0,5)}...{address.substring(address.length -5)}</div>
                </div>
                <div className="div-block-58">
                    <div className="div-block-59">
                        <img src="images/elrond-egld-egld-logo.svg" loading="lazy" alt="" className="image-20" />
                        <div className="text-block-15">Balance</div>
                    </div>
                    <div className="text-block-16">{(account.balance / Math.pow(10,18)).toFixed(2)}</div>
                </div>
                <div className="div-block-58">
                    <div className="div-block-59">
                        <img src="images/pickaxeIcon.png" loading="lazy" sizes="(max-width: 767px) 25px, (max-width: 991px) 3vw, 25px" srcSet="images/pickaxeIcon.png 500w" alt="" className="image-20" />
                        <div className="text-block-15">Number of miners :</div>
                    </div>
                    <div className="text-block-16">18</div>
                </div>
                <div className="divbtnaccouninformation">
                    <a className="button-connect-elrond w-button">Mint Miners</a>
                    <img src="images/cart.png" loading="lazy" alt="" className="imageAccountInformation" />
                </div>
                <div className="divbtnaccouninformation" onClick={disconnect}>
                    <a className="button-connect-elrond w-button">Disconnect</a>
                    <img src="images/log-out-svgrepo-com.svg" loading="lazy" alt="" className="imageAccountInformation" />
                </div>
            </div>
        </div>
    )
}
export default ConnectPanel;