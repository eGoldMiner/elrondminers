import { Typography } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Clip } from "./MineExplorerView";
import { useGetAccountInfo, useGetLoginInfo } from "@elrondnetwork/dapp-core/hooks/account";

const ClaimGoldBar = (props) => {

  const [minedData, setMinedData] = useState(null);
  const { account } = useGetAccountInfo();
  const { isLoggedIn } = useGetLoginInfo();
  const { setWindowConnect } = props;
  const [selectedMints, setSelectedMints] = useState([]);

  const onChange = (id) => {
    if (selectedMints.hasOwnProperty(id)) {
      delete (selectedMints[id])
    } else {

      selectedMints[id] = id;
    
    }

    setSelectedMints({ ...selectedMints });
  }

  console.log(Object.keys(selectedMints).length)
  const getData = (address) => {
    axios.get(`https://api.multiversx.com/accounts/erd1x2avtcjdvvgpszwm8fxujlnxmsy6gcch43vk8uzrj3nswud0cjjsas0d08/nfts?search=EMINERS-5b421f`)
      .then(response => {
        setMinedData(response.data);
      })
  }
  useEffect(() => {
    // if(isLoggedIn){
    getData(account.address);
    // }
    // else{
    //   // menuNav.current.classList.toggle("open");
    //   props.setWindowConnect(true);
    // }
  }, []);



  return (
    <div id="explorer" className="claim-page">
      <div id="header">
        <div className="row p-3 div-block-header-filter-my-miners align-items-center">
          <div className="col-md-4 p-0">
            <div id="count">10 NFT</div>
            <div id="miners">non blacklisted held</div>
          </div>
          <div className="col-md-4 p-0">
            <div id="count" className="text-center">=</div>
          </div>
          <div className="col-md-4 p-0">
            <div id="count" className="text-end">1 Gold bar</div>
          </div>
        </div>
      </div>
      <div className="af-class-separator af-class-separator-explorer">
        <div className="af-class-divseparatorleft"></div>
        <div className="af-class-divseparatorcenter"></div>
        <div className="af-class-divseparatorright"></div>
      </div>
      <div className="col-12 ps-sm-5 pe-sm-5 mt-4 pt-1">
        <div className="row w-100">
          {minedData && minedData.map((item, index) => {
            return (
              <div key={item.identifier} className="col-6 col-md-4 col-xl-3 col-xxl-2 p-3">
                <label className="minted-nfts">
                  <input type="checkbox" onChange={onChange} />
                    <span className="checkmark"></span>
                    <div className="miner-item h-100">
                      <div className="id">
                        <Typography variant="p">
                          {item.name}
                        </Typography>
                      </div>
                      <Clip url={item.media[0].thumbnailUrl} id={item.metadata[0].id} />
                    </div>
                </label>
              </div>
            )
          })}

        </div>
      </div>
    </div>
  );
}

export default ClaimGoldBar;