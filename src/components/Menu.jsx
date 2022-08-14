import React, { useEffect } from 'react';
import { useRef, useState } from "react";
import { Menu as BurgerMenu } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import ConnectPanel from './ConnectPanel';

export default function Menu() {
    const [windowStateConnect, setWindowStateConnect] = useState(false);
    const menuNav = useRef(null)

    var lastScrollTop = 0;
    window.addEventListener("scroll", function () {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            //SCROLL DOWN
            setWindowStateConnect(false);
            if (st > lastScrollTop + 200) {
                this.document.getElementById("connectPanel").setAttribute("style", "margin-top:80px");
                this.document.getElementById("af-class-navigation").setAttribute("style", "margin-top:0px; height:70px");
                lastScrollTop = st <= 0 ? 0 : st;
            }
        }
        if (st < lastScrollTop) {
            //SCROLL UP
            setWindowStateConnect(false);
            if (st < lastScrollTop - 200) {
                this.document.getElementById("connectPanel").setAttribute("style", "margin-top:110px");
                this.document.getElementById("af-class-navigation").setAttribute("style", "margin-top:20px; height:80px");
                lastScrollTop = st <= 0 ? 0 : st;
            }
        }
    }, false);


    return <>
        <ConnectPanel windowState={windowStateConnect} setWindowState={setWindowStateConnect}></ConnectPanel>
        <div data-animation="over-right" id="af-class-navigation" className="af-class-navigation w-nav" data-easing2="linear" data-easing="ease-in-out-back" data-collapse="medium" data-w-id="4990a16e-0ffe-6b5d-24e6-cb04cd55b9ef" role="banner" data-duration={300} data-doc-height={1}>
            <div className="af-class-navigation-items">
                <a href="/" aria-current="page" className="af-class-logo-link w-nav-brand w--current"><img sizes="(max-width: 479px) 63vw, (max-width: 991px) 165px, 12vw" width={165} srcSet="images/v2-p-500.png 500w, images/v2-p-800.png 800w, images/v2-p-1080.png 1080w, images/v2-p-1600.png 1600w, images/v2-p-2000.png 2000w, images/v2-p-2600.png 2600w, images/v2-p-3200.png 3200w, images/v2.png 5967w" src="images/v2.png" alt className="af-class-logo-image" /></a>
                <div className="af-class-navigation-wrap d-md-block" ref={menuNav}>
                    <nav role="navigation" className="af-class-navigation-items af-class-navigationlist w-nav-menu">
                        <a href="/#Home" className="af-class-navigation-item w-nav-link">HOME</a>
                        <a href="/#About" className="af-class-navigation-item w-nav-link">ABOUT</a>
                        <a href="/#Team" className="af-class-navigation-item w-nav-link">TEAM</a>
                        <a href="/#Faq" className="af-class-navigation-item w-nav-link">FAQ</a>
                        <a href="#" className="af-class-button-2 w-button menu-button">
                            <span className="af-class-text-span-2">🕹️</span>
                            <span className="af-class-textspantext"> Play now</span>
                        </a>
                        <a href="/explore" target="_blank" className="af-class-button-2 w-button menu-button">
                            <span className="af-class-text-span-2">⛏️</span>
                            <span className="af-class-textspantext"> Explore the Mine</span>
                        </a>
                        <a className="af-class-button-2 w-button menu-button" onClick={() => setWindowStateConnect(true)}>
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
