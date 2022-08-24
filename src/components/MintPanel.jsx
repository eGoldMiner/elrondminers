import React, { useEffect, useState } from "react";
import { useGetAccountInfo, useGetLoginInfo } from "@elrondnetwork/dapp-core/hooks/account";

export default function MintPanel({ windowState, setWindowState }) {
    const priceOneNft = 1;
    const addressApi = "https://api.elrond.com/collections/EMINERS-5b421f/nfts/count";
    const [minted, setMinted] = useState("");
    const [numberMint, setNumberMint] = useState(1);
    const [priceTotal, setPriceTotal] = useState(0.700);

    const fetchDataMinted = async () => {
        try {
            const data = await fetch(addressApi);
            const json = await data.json();
            setMinted(json);
        }
        catch {
            console.log("Cannot succes to refresh minted NFTs")
        }
    }

    const { loggedIn } = useGetLoginInfo();

    useEffect(() => {
        const price = Math.round(priceOneNft * numberMint * 100) / 100;
        setPriceTotal(price);
    }, [numberMint]);

    useEffect(() => {
        fetchDataMinted();
        setInterval(() => {
            fetchDataMinted().catch(console.error);
        }, 5000);
    }, []);


    function addMint() {
        if (numberMint < 5) {
            setNumberMint(numberMint + 1);
        }
    }

    function removeMint() {
        if (numberMint > 1) {
            setNumberMint(numberMint - 1);
        }
    }

    function mintButton() {
        if (loggedIn) {

        }
        else {
            document.getElementById("divmint").style.filter = "blur(4px)";
            document.getElementById("infoConnect").setAttribute("style", "display: block");
            closeWindowTimer();
        }
    }

    const closeWindowTimer = async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setWindowState(false);
        await new Promise(resolve => setTimeout(resolve, 500));
        document.getElementById("divmint").style.filter = "blur(0px)";
        document.getElementById("infoConnect").setAttribute("style", "display: none");
    }


    return <>
        <div className="divmintcontainer"
            style={{
                opacity: windowState ? '1' : '0',
                visibility: windowState ? 'visible' : 'hidden',
                transform: windowState ? 'translate(0%)' : 'translate(200%)'
            }}>
            <div id="divmint">
                <div className="divclosebtnconnect" onClick={() => setWindowState(false)}></div>
                <div className="div-block-54">
                    <h1 className="heading-8">HIRING</h1>
                    <img src="images/pickaxe-reverse.png" className="img-pickaxe-mint" />
                    <div className="text-block-13">MINERS</div>
                    <img src="images/pickaxe.png" className="img-pickaxe-mint img-pickaxe-mint-2" />
                    <div id="flip">
                        <div><div></div></div>
                        <div><div></div></div>
                        <div><div></div></div>
                        <div><div></div></div>
                        <div><div></div></div>
                    </div>
                </div>
                <div className="div-block-55">
                    <div className="text-block-14">Miners already recruited :</div>
                </div>
                <div className="div-block-49">
                    <div>{minted}</div>
                    <div className="text-block-10">/</div>
                    <div>5000</div>
                </div>
                <div className="div-block-51">
                    <div className="div-block-50">
                        <a className="button-nbMint w-button" onClick={removeMint}>-</a>
                        <div className="text-block-11">{numberMint}</div>
                        <a className="button-nbMint w-button" onClick={addMint}>+</a>
                    </div>
                </div>
                <div className="div-block-53">
                    <div className="div-block-52">
                        <div>Price</div>
                        <div className="text-block-12">{priceOneNft}</div>
                        <img src="images/ElrondLogo_Blue.svg" loading="lazy" alt="" className="image-19" />
                    </div>
                    <div className="div-block-52">
                        <div>TOTAL</div>
                        <div className="text-block-12">{priceTotal}</div>
                        <img src="images/ElrondLogo_Blue.svg" loading="lazy" alt="" className="image-19" />
                    </div>
                </div>
                <div className="div-block-56" onClick={mintButton}>
                    <a className="button-5 w-button">MINT</a>
                </div>
            </div>
            <div id="infoConnect">
                You need to connect your wallet
            </div>
        </div>
    </>
}