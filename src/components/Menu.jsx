import React from 'react';
import { useRef } from "react";
import { Menu as BurgerMenu } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function Menu({ setWindowConnect }) {
    const menuNav = useRef(null)

    var lastScrollTop = 0;
    window.addEventListener("scroll", function () {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            //SCROLL DOWN
            setWindowConnect(false);
            if (st > lastScrollTop + 200) {
                this.document.getElementById("connectPanel").setAttribute("style", "margin-top:80px");
                if (this.screen.width < 600) {
                    this.document.getElementById("af-class-navigation").setAttribute("style", "margin-top:0px; height:50px");
                }
                else {
                    this.document.getElementById("af-class-navigation").setAttribute("style", "margin-top:0px; height:70px");
                }
                lastScrollTop = st <= 0 ? 0 : st;
            }
        }
        if (st < lastScrollTop) {
            //SCROLL UP
            setWindowConnect(false);
            if (st < lastScrollTop - 200) {
                this.document.getElementById("connectPanel").setAttribute("style", "margin-top:110px");
                if (this.screen.width < 600) {
                    this.document.getElementById("af-class-navigation").setAttribute("style", "margin-top:20px; height:60px");
                }
                else {
                    this.document.getElementById("af-class-navigation").setAttribute("style", "margin-top:20px; height:80px");
                }
                lastScrollTop = st <= 0 ? 0 : st;
            }
        }
    }, false);


    return <>
        <div data-animation="over-right" id="af-class-navigation" className="af-class-navigation w-nav" data-easing2="linear" data-easing="ease-in-out-back" data-collapse="medium" data-w-id="4990a16e-0ffe-6b5d-24e6-cb04cd55b9ef" role="banner" data-duration={300} data-doc-height={1}>
            <div className="af-class-navigation-items">
                <a href="/" aria-current="page" className="af-class-logo-link w-nav-brand">
                    <img src="images/v2.png" className="af-class-logo-image" />
                </a>
                <div className="af-class-navigation-wrap d-md-block" ref={menuNav}>
                    <nav role="navigation" className="af-class-navigation-items af-class-navigationlist w-nav-menu">
                        <a href="/#Home" className="af-class-navigation-item w-nav-link" onClick={() => { menuNav.current.classList.toggle("open") }}>HOME</a>
                        <a href="/#About" className="af-class-navigation-item w-nav-link" onClick={() => { menuNav.current.classList.toggle("open") }}>ABOUT</a>
                        <a href="/#Team" className="af-class-navigation-item w-nav-link" onClick={() => { menuNav.current.classList.toggle("open") }}>TEAM</a>
                        {/*                         <a href="/#Faq" className="af-class-navigation-item w-nav-link" onClick={() => { menuNav.current.classList.toggle("open") }}>FAQ</a> */}
                        <a href="#" className="af-class-button-2 w-button menu-button" onClick={() => { menuNav.current.classList.toggle("open") }}>
                            <span className="af-class-text-span-2">&#128377;</span>
                            <span className="af-class-textspantext"> Play now</span>
                        </a>
                        <a href="/explore" target="_blank" className="af-class-button-2 w-button menu-button" onClick={() => { menuNav.current.classList.toggle("open") }}>
                            <span className="af-class-text-span-2">&#9935;</span>
                            <span className="af-class-textspantext"> Explore the Mine</span>
                        </a>
                        <a id="btn-connect-wallet" className="af-class-button-2 w-button menu-button"
                            onClick={() => {
                                setWindowConnect(true);
                                menuNav.current.classList.toggle("open");
                            }}>
                            <span className="af-class-text-span-2">&#9889;</span>
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
                    <img src="images/burger-menu-35.svg" />
                </IconButton>
            </div>
        </div>
    </>
}
