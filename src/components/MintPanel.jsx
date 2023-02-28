import React, { useEffect, useState } from "react";
import * as transactionServices from "@multiversx/sdk-dapp/hooks/"
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { getIsLoggedIn } from "@multiversx/sdk-dapp/utils";
import { refreshAccount } from '@multiversx/sdk-dapp/utils/account';
import { getTransactions } from '../apiRequests/'
import { contractAddress } from 'config';
//import { StateType } from "./StateType";


export default function MintPanel({ windowState, setWindowState }) {
    const priceOneNft = 1;
    let addressApi = "https://api.elrond.com/collections/EMINERS-5b421f/nfts/count";
    const [minted, setMinted] = useState("...");
    const [numberMint, setNumberMint] = useState(1);
    const [priceTotal, setPriceTotal] = useState(0.700);
    const [transactionSessionId, setTransactionSessionId] = React.useState(null);
    const account = transactionServices.useGetAccountInfo();
    const { pendingTransactions, hasPendingTransactions } = transactionServices.useGetPendingTransactions();

    useEffect(() => {
      if (hasPendingTransactions) {
        console.log("pendingTransac");
        setTransactionSessionId(pendingTransactions[0][0]);
      }
    }, [hasPendingTransactions]);

    useEffect(() => {
        const price = Math.round(priceOneNft * numberMint * 100) / 100;
        setPriceTotal(price);
    }, [numberMint]);

    function callApiMinted() {
        fetch(addressApi).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Cannot success to refresh minted  NFTs");
        })
            .then((responseJson) => {
                setMinted(responseJson);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        callApiMinted();
        setInterval(() => {
            callApiMinted();
        }, 8000);
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

    const mintButton = async () => {
        if (getIsLoggedIn()) {
            const mintTransaction = {
                value: numberMint * '1000000000000000000',
                data: 'mint@0' + numberMint,
                receiver: contractAddress,
                gasLimit: 60000000
            };
            await refreshAccount();

            const { sessionId /*, error*/ } = await sendTransactions({
                transactions: mintTransaction,
                transactionsDisplayInfo: {
                    processingMessage: 'Processing Mint transaction',
                    errorMessage: 'An error has occured during Mint',
                    successMessage: 'Mint transaction successful'
                }
            });
            if (sessionId != null) {
                setTransactionSessionId(sessionId);
            }
        }
        else {
            document.getElementById("divmint").style.filter = "blur(4px)";
            document.getElementById("infoConnect").setAttribute("style", "display: block");
            closeWindowTimer();
        }
    };

    const {
        network: { apiAddress }
    } = transactionServices.useGetNetworkConfig();
    const { success, fail, hasActiveTransactions } =
        transactionServices.useGetActiveTransactionsStatus();

    const [state, setState] = React.useState({
        transactions: [],
        transactionsFetched: undefined
    });

    const fetchData = () => {
        if (success || fail || !hasActiveTransactions) {
            getTransactions({
                apiAddress,
                address: account.address,
                timeout: 3000,
                contractAddress
            }).then(({ data, success: transactionsFetched }) => {
                refreshAccount();
                setState({
                    transactions: data,
                    transactionsFetched
                });
            });
        }
    };

    React.useEffect(fetchData, [hasActiveTransactions]);

    const { transactions } = state;

    const transactionStatus = transactionServices.useTrackTransactionStatus({
        transactionId: transactionSessionId,
        onSuccess: () => {
            console.log('success');
            getTransactions({
                apiAddress,
                address: account.address,
                timeout: 3000,
                contractAddress
            }).then(({ data, success: transactionsFetched }) => {
                refreshAccount();
                /*window.location.href =
                    routeNames.reveal + '?txHash=' + data[0]['txHash'];*/
            });
        },
        onFail: () => console.log('fail'),
        onCancelled: () => console.log('canceled'),
        onCompleted: () => console.log('completed')
    });


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
                transform: windowState ? 'translate(0%)' : 'translate(-200%)'
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
                    <div>1000</div>
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