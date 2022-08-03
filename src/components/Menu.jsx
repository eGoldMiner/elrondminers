import React from 'react';
import { useRef, useState } from "react";
import { Menu as BurgerMenu } from "@mui/icons-material";
import { IconButton } from "@mui/material";


export default function Menu() {
    const menuNav = useRef(null)
    const buttonMaiarAppConnect = useRef();
    const buttonMaiarExtConnect = useRef();
    const buttonWebWalConnect = useRef();
    const informationsConnect = useRef();
    const returnButtonConnect = useRef();

    const [openMenuConnect, setOpenMenuConnect] = useState(false);
    const [menuMaiar, setMenuMaiar] = useState(false);

    function clickConnectButton() {
        setOpenMenuConnect(!openMenuConnect)
    }

    function clickMaiarApp() {
        buttonMaiarExtConnect.current.style.display = "none";
        buttonWebWalConnect.current.style.display = "none";
        informationsConnect.current.style.display = "none";
        returnButtonConnect.current.style.display = "block";
    }

    function clickReturnConnectButton() {
        buttonMaiarExtConnect.current.style.display = "flex";
        buttonWebWalConnect.current.style.display = "flex";
        informationsConnect.current.style.display = "block";
        returnButtonConnect.current.style.display = "none";
    }

    return <>
        <div className="divconnectcontainer" style={{ opacity: openMenuConnect ? '1' : '0'}}>
            <img src="images/chart.png" loading="lazy" alt="" className="image-18" />
            <div data-w-id="2431201b-c920-69ba-1cdf-23d39d3d43f7" className="divclosebtnconnect" onClick={clickConnectButton}></div>
            <div data-w-id="d7ba1794-9c0f-b31a-d999-b80643e0c1f5" className="divreturnbtnconnect" ref={returnButtonConnect} onClick={clickReturnConnectButton}></div>
            <div>
                <div className="text-block-7">Connect wallet</div>
                <div className="text-block-6">Please select your login method :</div>
            </div>
            <div className="divbuttonsconnect">
                <div className="divmaiarappconnect" ref={buttonMaiarAppConnect} onClick={clickMaiarApp}>
                    <a data-w-id="2431201b-c920-69ba-1cdf-23d39d3d43ff" href="#" className="button-connect-elrond w-button">Maiar App</a>
                    <img src="images/smartphone-1.png" loading="lazy" srcSet="images/smartphone-1-p-500.png 500w, images/smartphone-1.png 512w" sizes="35px" alt="" className="imagemaiarapp" />
                </div>
                <div className="divmaiarextensionconnect" ref={buttonMaiarExtConnect}>
                    <a href="#" className="button-connect-elrond w-button">Maiar Extension</a>
                    <img src="images/puzzle-1.png" loading="lazy" srcSet="images/puzzle-1-p-500.png 500w, images/puzzle-1.png 512w" sizes="28px" alt="" className="imagemaiarextension" />
                </div>
                <div className="divwebwalletconnect" ref={buttonWebWalConnect}>
                    <a href="#" className="button-connect-elrond w-button">Web Wallet</a>
                    <img src="images/internet-1.png" loading="lazy" srcSet="images/internet-1-p-500.png 500w, images/internet-1.png 512w" sizes="28px" alt="" className="imagemaiarextension" />
                </div>
            </div>
            <div ref={informationsConnect}>
                <div className="divhowtoconnect">
                    <a href="https://help.maiar.com/en/articles/5161195-what-is-the-maiar-login" target="" className="link-block-5 w-inline-block">
                        <div className="text-block-9">How to connect ?</div>
                    </a>
                </div>
                <div className="divcreatewallet">
                    <a href="https://wallet.elrond.com/create" target="" className="link-block-5 w-inline-block">
                        <div className="text-block-9">Create an Elrond Wallet</div>
                    </a>
                </div>
                <div className="div-block-48"><img src="images/Fichier-7.png" loading="lazy" alt="" className="image-17" /></div>
            </div>
        </div>
        <div data-animation="over-right" className="af-class-navigation w-nav" data-easing2="linear" data-easing="ease-in-out-back" data-collapse="medium" data-w-id="4990a16e-0ffe-6b5d-24e6-cb04cd55b9ef" role="banner" data-duration={300} data-doc-height={1}>
            <div className="af-class-navigation-items">
                <a href="/" aria-current="page" className="af-class-logo-link w-nav-brand w--current"><img sizes="(max-width: 479px) 63vw, (max-width: 991px) 165px, 12vw" width={165} srcSet="images/v2-p-500.png 500w, images/v2-p-800.png 800w, images/v2-p-1080.png 1080w, images/v2-p-1600.png 1600w, images/v2-p-2000.png 2000w, images/v2-p-2600.png 2600w, images/v2-p-3200.png 3200w, images/v2.png 5967w" src="images/v2.png" alt className="af-class-logo-image" /></a>
                <div className="af-class-navigation-wrap d-md-block" ref={menuNav}>
                    <nav role="navigation" className="af-class-navigation-items af-class-navigationlist w-nav-menu">
                        <a href="/" className="af-class-navigation-item w-nav-link">HOME</a>
                        <a href="/#About" className="af-class-navigation-item w-nav-link">About</a>
                        <a href="/#Team" className="af-class-navigation-item w-nav-link">TEAM</a>
                        <a href="/#faq" className="af-class-navigation-item w-nav-link">faq</a>
                        <a href="#" className="af-class-button-2 w-button menu-button">
                            <span className="af-class-text-span-2">🕹️</span>
                            <span className="af-class-textspantext">Play now</span>
                        </a>
                        <a href="./explore" className="af-class-button-2 w-button menu-button">
                            <span className="af-class-text-span-2">⛏️</span>
                            <span className="af-class-textspantext">Explore the Mine</span>
                        </a>
                        <a href="#" className="af-class-button-2 w-button menu-button" onClick={clickConnectButton}>
                            <span className="af-class-text-span-2">⚡</span>
                            <span className="af-class-textspantext"> Connect Wallet</span>
                        </a>
                    </nav>
                </div>
            </div>
            <div
                className="d-lg-none"
            >
                <IconButton
                    aria-label="delete"
                    onClick={() => {
                        menuNav.current.classList.toggle("open")
                    }}
                >
                    <BurgerMenu />
                </IconButton>
            </div>
        </div>
    </>
}