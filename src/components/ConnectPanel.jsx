import React, { useState } from "react";
import { useGetAccountInfo, useGetLoginInfo } from "@multiversx/sdk-dapp/hooks/account";
import * as loginServices from '@multiversx/sdk-dapp/hooks/login';
import { logout } from "@multiversx/sdk-dapp/utils/"
import QRCode from 'qrcode';
import Cookies from 'js-cookie';

const ConnectPanel = ({ windowState, setWindowState, setWindowMint }) => {

    const [openMaiarApp, setOpenMaiarApp] = useState(false);

    const logoutRoute = '';
    const callbackRoute = '';
    const token = '';

    const [nbMiners, setNbMiners] = useState("");

    const [qrCodeSvg, setQrCodeSvg] = useState('');
    const isMobileDevice = platform?.os?.family === 'iOS' || platform?.os?.family === 'Android';
    const onLoginRedirect = false;

    const [
        initLoginWithWalletConnectV2,
        { error },
        {   connectExisting,
            removeExistingPairing,
            cancelLogin: cancelLoginV2,
            uriDeepLink: walletConnectDeepLinkV2,
            walletConnectUri: walletConnectUriV2,
            wcPairings
        }
    ] = loginServices.useWalletConnectV2Login({
        logoutRoute,
        token
    });

    const [onInitiateLogin] = loginServices.useWebWalletLogin({
        callbackRoute,
        token
    });

    const [onInitiateLoginExtension] = loginServices.useExtensionLogin({
        callbackRoute,
        token,
        onLoginRedirect
    });

    const generateQRCode = async () => {
        if (!walletConnectUriV2) {
            return;
        }
        const svg = await QRCode.toString(walletConnectUriV2, {
            type: 'svg'
        });
        setQrCodeSvg(svg);
    };

    const { isLoggedIn } = useGetLoginInfo();
    const { account } = useGetAccountInfo();


    React.useEffect(() => {
        if (isLoggedIn) {
            document.getElementById("btn-connect-wallet").innerHTML =
                "<span className='af-class-text-span-2'>" +
                "&#9889;" +
                "</span><span className='af-class-textspantext'> My Wallet</span>";
        } else {
            setOpenMaiarApp(false);
            initLoginWithWalletConnectV2(true);
            document.getElementById("btn-connect-wallet").innerHTML =
                "<span className='af-class-text-span-2' style='font-family: Noto Emoji; font-size: 15px; font-weight: 700;'>" +
                "&#9889;" +
                "</span><span className='af-class-textspantext'> Connect Wallet</span>";
        }
    }, [isLoggedIn]);

    React.useEffect(() => {
        if(isLoggedIn){
            callApiMyMiners(account.address);
            //call to save value in cookie
            console.log("connected with : " + account.address);
            if (account.address !== '') {
                Cookies.set('walletAddress', account.address, { secure: true, sameSite: 'none' });
            }
        }
    }, [account]);


    React.useEffect(() => {
        generateQRCode();
    }, [openMaiarApp]);

    /*React.useEffect(() => {
        setOpenMaiarApp(false);
    }, [windowState])*/

    function clickWebWallet() {
        onInitiateLogin();
    }

    function clickExtension() {
        onInitiateLoginExtension();
    }

    function callApiMyMiners(address) {
        if (address !== '') {
            const apiUrl = "https://api.elrond.com/accounts/" + address + "/nfts/count?collections=EMINERS-5b421f";
            fetch(apiUrl).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Cannot success to refresh minted NFTs");
            })
                .then((responseJson) => {
                    setNbMiners(responseJson);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <div className="divconnectpanel"
            id="connectPanel"
            style={{
                opacity: windowState ? '1' : '0',
                visibility: windowState ? 'visible' : 'hidden',
                transform: windowState ? 'translate(0%)' : 'translate(200%)',
                height: isLoggedIn ? '360px' : '430px'
            }}>
            <div className="divconnectcontainer" id="connectContainer"
                style={{
                    display: isLoggedIn ? 'none' : 'initial'
                }}>
                <div className="divclosebtnconnect" onClick={() => setWindowState(false)}></div>
                <div className="divreturnbtnconnect"
                    onClick={() => setOpenMaiarApp(false)}
                    style={{
                        display: isLoggedIn ? 'none' : openMaiarApp ? 'block' : 'none'
                    }} />
                <div>
                    <div className="text-block-7">Connect wallet</div>
                    <div className="text-block-6">Please select your login method :</div>
                </div>
                <div className="divbuttonsconnect">
                    <div className="divmaiarappconnect" onClick={() => setOpenMaiarApp(true)}>
                        <a className="button-connect-elrond w-button">Xportal App </a>
                        <img src="images/smartphone-1.png" loading="lazy" srcSet="images/smartphone-1-p-500.png 500w, images/smartphone-1.png 512w" sizes="35px" alt="" className="imagemaiarapp" />
                    </div>
                    <div className="divmaiarextensionconnect"
                        onClick={clickExtension}
                        style={{
                            display: openMaiarApp ? 'none' : 'flex'
                        }}>
                        <a className="button-connect-elrond w-button">DeFi Wallet</a>
                        <img src="images/puzzle-1.png" loading="lazy" srcSet="images/puzzle-1-p-500.png 500w, images/puzzle-1.png 512w" sizes="28px" alt="" className="imagemaiarextension" />
                    </div>
                    <div className="divwebwalletconnect"
                        onClick={clickWebWallet}
                        style={{
                            display: openMaiarApp ? 'none' : 'flex'
                        }}>
                        <a className="button-connect-elrond w-button">Web Wallet</a>
                        <img src="images/internet-1.png" loading="lazy" srcSet="images/internet-1-p-500.png 500w, images/internet-1.png 512w" sizes="28px" alt="" className="imagemaiarextension" />
                    </div>
                </div>
                <div className="qrcode-container"
                    style={{
                        display: openMaiarApp ? 'flex' : 'none'
                    }}>
                    <div className="qrcode"
                        dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
                        style={{
                            display: openMaiarApp ? 'block' : 'none'
                        }} />
                    {isMobileDevice ?
                        (
                            <>
                                <a className="divmaiarappconnect divmaiarmobileconnect" href={walletConnectDeepLinkV2} rel='noopener noreferrer nofollow' target='_blank'>
                                    <a className="button-connect-elrond w-button">Open Maiar Login</a>
                                </a>
                            </>
                        ) : (
                            <>
                                <div className="infoscanqrcode">
                                    Scan QR Code with Maiar application
                                </div>
                            </>
                        )}
                </div>
                <div style={{
                    display: openMaiarApp ? 'none' : 'block'
                }}>
                    <div className="divhowtoconnect">
                        <a href="https://help.maiar.com/en/articles/5161195-what-is-the-maiar-login" target="_blank" rel="noreferrer noopener" className="link-block-5 w-inline-block">
                            <div className="text-block-9">How to connect ?</div>
                        </a>
                    </div>
                    <div className="divcreatewallet">
                        <a href="https://wallet.elrond.com/create" target="_blank" rel="noreferrer noopener" className="link-block-5 w-inline-block">
                            <div className="text-block-9">Create an MultiversX Wallet</div>
                        </a>
                    </div>
                    <div className="div-block-48">
                        <img src="images/Fichier-7.png" loading="lazy" alt="" className="image-17" /></div>
                </div>
            </div>
            <div className="divconnectcontainer divconnectcontainer-copy" style={{ display: isLoggedIn ? 'initial' : 'none' }}>
                <div className="divclosebtnconnect" onClick={() => setWindowState(false)}></div>
                <div>
                    <div className="text-block-7">Account</div>
                    <div className="text-block-6">Information</div>
                </div>
                <div className="div-block-58">
                    <div className="div-block-59">
                        <img src="images/wallet-svgrepo-com.svg" loading="lazy" alt="" className="image-20" />
                        <div className="text-block-15">Address : </div>
                    </div>
                    <div className="text-block-16">{account.address.substring(0, 5)}...{account.address.substring(account.address.length - 5)}</div>
                </div>
                <div className="div-block-58">
                    <div className="div-block-59">
                        <img src="images/elrond-egld-egld-logo.svg" loading="lazy" alt="" className="image-20" />
                        <div className="text-block-15">Balance</div>
                    </div>
                    <div className="text-block-16">{(account.balance / Math.pow(10, 18)).toFixed(2)}</div>
                </div>
                <div className="div-block-58">
                    <div className="div-block-59">
                        <img src="images/pickaxeIcon.png" loading="lazy" sizes="(max-width: 767px) 25px, (max-width: 991px) 3vw, 25px" srcSet="images/pickaxeIcon.png 500w" alt="" className="image-20" />
                        <div className="text-block-15">Number of miners :</div>
                    </div>
                    <div className="text-block-16">{nbMiners}</div>
                </div>
                <div className="divbtnaccouninformation">
                    <a className="button-connect-elrond w-button" onClick={() => setWindowMint(true)} >Mint Miners</a>
                    <img src="images/cart.png" loading="lazy" alt="" className="imageAccountInformation" />
                </div>
                <div className="divbtnaccouninformation" onClick={() => logout('/')}>
                    <a className="button-connect-elrond w-button">Disconnect</a>
                    <img src="images/log-out-svgrepo-com.svg" loading="lazy" alt="" className="imageAccountInformation" />
                </div>
            </div>
        </div>
    )
}
export default ConnectPanel;