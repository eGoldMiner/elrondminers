import { Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { refreshAccount, getAddress } from '@elrondnetwork/dapp-core/utils/account';
import { getIsLoggedIn } from "@elrondnetwork/dapp-core/utils";
import All from "../data/All";
import Assets from "../data/Assets.json";
import Filters from "../data/Filters";
import React from "react";
import { isMobile } from "react-device-detect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAccordionButton } from "react-bootstrap";

const Clip = ({ url, id }) => {
  const videoRef = useRef();

  const stopMovie = (e) => {
    e.target.pause();
  };

  const playMovie = (e) => {
    e.target.play();
  };

  useEffect(() => {
    videoRef.current?.load();
  }, [url]);

  return (
    <video
      loop
      playsInline
      muted
      ref={videoRef}
      src={url}
      onMouseOver={playMovie}
      onMouseOut={stopMovie}
      poster={"/images/miners/" + id + ".png"}
    ></video>
  );
};

export default function MineExplorerView({ setWindowConnect }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [order, setOrder] = useState("highest");
  const [current, setCurrent] = useState(null); ///////REMETTRE A NULL
  const itemList = useRef();
  const modal = useRef();
  const [selectedID, setSelectedID] = useState(null);
  const clearField = useRef();
  const [myMiners, setMyMiners] = useState(false);

  // const [mobileScreen, setMobileScreen] = useState(false);

  // const handleMobileScreen =()=> {
  //   if(window.innerWidth < 768){
  //     setMobileScreen = true;
  //   }
  // }

  async function getMyMinersApiCall() {
    let address = await getAddress();
    const apiUrl = "https://api.multiversx.com/accounts/" + address + "/nfts?search=EMINERS-5b421f";
    fetch(apiUrl).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Cannot success to refresh minted NFTs");
    })
      .then((responseJson) => {
        let listMyMiners = "";
        responseJson.forEach(value => {
          listMyMiners += value["metadata"][0]["id"] + ",";
        });
        listMyMiners = listMyMiners.slice(0, -1);
        setSelectedID(listMyMiners);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const getMyMiners = () => {
    if (!getIsLoggedIn()) {
      document.getElementById("infoConnect").setAttribute("style", "display: block");
      setWindowConnect(true);
    }
    else {
      if (myMiners) {
        document.getElementsByClassName("div-text-my-miners")[0].style.color = "#33495a";
        document.getElementsByClassName("div-text-my-miners")[0].style.backgroundColor = "#eaba20";
        getMyMinersApiCall();
        setMyMiners(false);
      }
      else {
        document.getElementsByClassName("div-text-my-miners")[0].style.color = "#eaba20";
        document.getElementsByClassName("div-text-my-miners")[0].style.backgroundColor = "#33495a";
        setSelectedID("");
        setMyMiners(true);
      }
    }
  }

  const loadMore = () => {
    if (itemList.current.offsetTop != null) {
      if (
        window.scrollY + window.innerHeight >=
        itemList.current.offsetTop + itemList.current.offsetHeight - 200
      ) {
        setCurrentPage(currentPage + 1);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      loadMore();
    });
  }, [currentPage]);

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    if (current) {
      modal.current.classList.add("open");
    } else {
      modal.current.classList.remove("open");
    }
  }, current);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, selectedID]);

  useEffect(() => {
    if (isMobile) {
      setShowFilters(false);
    }
  }, [setShowFilters]);

  let items = All
  console.log(items[0]);
  if (selectedID) {
    if (selectedID.includes(",")) {
      console.log(selectedID)
      let ids = selectedID.split(",").map(id => parseInt(id));

      console.log(ids)
      items = items.filter((item) => {
        return ids.includes(item.id)
      });
    } else {
      items = items.filter((item) => {
        return (item.id == selectedID)
      });

    }
    // console.log(selectedID)
    // console.log(items);
  } else if (Object.keys(filters).length) {
    Object.keys(filters).map((filter) => {
      if (filters[filter]) {
        if (filter === "Accessory" && filters[filter] === "Unique") {
          items = items.filter((item) => {
            let unique = [
              "Platinum",
              "Diamond",
              "Ruby",
              "Emerald",
              "Sapphire",
              "Quartz",
              "Pearl",
              "Opal",
              "Tourmaline",
              "Onyx",
            ];
            return unique.includes(item.assets[Filters[filter].index]);
          });
        } else {
          let filterValue = filters[filter];
          if (filter === "Beards") {
            let beards = {
              "Small Brown": "T1 Brown",
              "Small Red": "T2 Red",
              "Small Blond": "T3 Blond",
              "Big Blond": "T4 Blond",
              "Big Brown": "T5 Brown",
              "Big Red": "T6 Red",
            };
            filterValue = beards[filterValue];
          }
          items = items.filter((item) => {

            return item.assets[Filters[filter].index] === filterValue;

          });
        }
      }
    });
  }

  const clearFilters = () => {
    setFilters({});
    setSelectedID(null);
    clearField.current.value = "";
  }

  let totalItems = items.length;
  let currentItem = items.filter((i) => i.id === current)[0];
  if (order === "lowest") {
    items.sort((a, b) => b.rank - a.rank);
  } else {
    items.sort((a, b) => a.rank - b.rank);
  }
  items = items.slice(0, currentPage * 24);

  return (
    <>
      <div id="explorer">
        <div className={`filter-holder ${showFilters ? "filter-expended" : ""}`}>
          <Button
            variant="outlined"
            color="secondary"
            className="filter-toggle-btn"
            onClick={() => {
              setShowFilters(!showFilters);
            }}
          >
            <FontAwesomeIcon icon={faFilter} />
          </Button>
          <div className="div-block-65">
            <button className="filter-close-btn" onClick={() => { setShowFilters(!showFilters); }}><FontAwesomeIcon icon={faXmark} /></button>
            <a onClick={clearFilters} className="button-7 w-button">
              CLEAR
            </a>
            <div className="text-block-17">FILTERS</div>
            <div className="div-filter-id">
              <div className="div-text-filter-id">Miner ID :</div>
              <input
                ref={clearField}
                className="div-text-filter-id-num"
                onInput={(e) => {
                  setSelectedID(e.target.value)
                  // console.log(selectedID)
                }}
              ></input>
            </div>
            <div className="div-block-66">
              {Object.keys(Filters).map((filter) => {
                if (filter === "Pickaxe")
                  return (
                    <>
                      {/* <div className="form-block-3 w-form">
                    <input type="text" className="text-field-2 w-input" maxLength="256" name="Search-ID" data-name="Search ID" placeholder="Search ID" id="Search-ID" />
                  </div> */}
                      <div>
                        <div className="div-block-61">
                          {Filters[filter]["values"].map((item, index) => {
                            return (
                              <div
                                key={item}
                                className={
                                  filters[filter] === item
                                    ? "selected div-block-64"
                                    : "div-block-64"
                                }
                                onClick={() => {
                                  setFilters({
                                    ...filters,
                                    [filter]:
                                      filters[filter] === item ? null : item,
                                  });
                                }}
                              >
                                <img
                                  src={"images/pickaxe-" + (index + 1) + ".png"}
                                  loading="lazy"
                                  alt={"pickaxe" + 1}
                                  className="image-22"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  );
                return (
                  <>
                    <div className="form-block-2 w-form">
                      <div className="div-block-69">
                        <div className="text-block-17-copy-copy">{filter}</div>
                        <select
                          id="field-2"
                          name="field-2"
                          data-name="Field 2"
                          className="select-field w-select"
                          onChange={(e) => {
                            setFilters({ ...filters, [filter]: e.target.value });
                          }}
                          value={filters[filter] || null}
                        >
                          <option value="" selected>
                            All
                          </option>
                          {Filters[filter]["values"].map((item) => {
                            return (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div
            className="col-lg-3 px-5 mb-3"
            id="filters"
          ></div>
          <div className="col-lg-9 px-0">
            <div id="results-container" className="row w-100">
              <div id="header">
                <div className="row p-3 div-block-header-filter-my-miners">
                  <div className="col-auto p-0">
                    <div id="count">{totalItems}</div>
                    <div id="miners">Miners</div>
                  </div>
                  <Button className="div-text-my-miners" onClick={() => { getMyMiners() }}>MY MINERS</Button>
                  <div className="col p-0 d-flex align-items-center justify-content-end div-block-filter-container">
                    <div className="div-block-69">
                      <select
                        id="field-2"
                        name="field-2"
                        data-name="Field 2"
                        className="select-field select-field-2 w-select"
                        value={order}
                        onChange={(e) => {
                          setOrder(e.target.value);
                        }}
                      >
                        <option value={"lowest"}>Lowest rank</option>
                        <option value={"highest"}>Highest rank</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="af-class-separator af-class-separator-explorer">
                <div className="af-class-divseparatorleft" />
                <div className="af-class-divseparatorcenter" />
                <div className="af-class-divseparatorright" />
              </div>
              <div
                className="col-12 ps-sm-5 pe-sm-5 mt-4 pt-1"
                id="miner-list-container"
              >
                <div className="row w-100" ref={itemList} id="miner-list">
                  {items.map((item, index) => {
                    // {items.filter(el => el.id == selectedID && selectedID !== "").map((item, index) => {
                    return (
                      <div
                        className="col-6 col-lg-4 col-xl-3 p-3"
                        key={index}
                        onClick={() => setCurrent(item.id)}
                      >
                        <div className="miner-item h-100">
                          <div className="rank">
                            <Typography variant="p">
                              Rank {item.rank}
                            </Typography>
                          </div>
                          <div className="id">
                            <Typography variant="p">
                              Miner #{item.id}
                            </Typography>
                          </div>
                          <div></div>
                          <Clip url={item.videoLink} id={item.id} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div ref={modal} className="minor-item-modal">
          {current ? (
            <>
              <div className="divcardcontainer-wrapper">
                <div className="divcardexplorer">
                  <div className="div-block-35">
                    <div className="div-block-36">
                      <h1 className="headingExplorerMiner">
                        <span className="text-span-10">MINER</span> #
                        {currentItem.id}
                      </h1>
                      <div className="div-block-41">
                        <div className="divblockrank">
                          <div className="divblockcategoryimg">
                            <img
                              src="images/icons/crystal.png"
                              loading="lazy"
                              sizes="33px"
                              alt=""
                              className="image-15"
                            />
                          </div>
                          <div className="div-block-39">
                            <div className="text-block-3">
                              Rank {currentItem.rank}
                              <br />
                            </div>
                            <div className="text-block-4">/5000</div>
                          </div>
                        </div>
                        <div className="divblockpickaxe">
                          <div className="divblockcategoryimg">
                            <img
                              src="images/icons/pickaxe.png"
                              loading="lazy"
                              alt=""
                              className="image-15"
                            />
                          </div>
                          <div className="div-block-39">
                            <div className="text-block-3">
                              {currentItem.assets[3]}
                              <br />
                            </div>
                            <div className="text-block-4">
                              {Assets["Pickaxe"][currentItem.assets[3]]}%
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="separator separatorinside">
                        <div className="divseparatorleftinside"></div>
                        <div className="divseparatorrightinside"></div>
                      </div>
                      <div className="div-block-40">
                        <div className="divblockhead">
                          <div className="divblockcategoryimg">
                            <img
                              src="images/icons/helmet.png"
                              loading="lazy"
                              sizes="33px"
                              alt=""
                              className="image-15"
                            />
                          </div>
                          <div className="div-block-39">
                            <div className="text-block-3">
                              {currentItem.assets[0]}
                              <br />
                            </div>
                            <div className="text-block-4">
                              {Assets["Helmet"][currentItem.assets[0]]}%
                            </div>
                          </div>
                        </div>
                        <div className="divblockeyes">
                          <div className="divblockcategoryimg">
                            <img
                              src="images/icons/eye.png"
                              loading="lazy"
                              sizes="33px"
                              alt=""
                              className="image-15"
                            />
                          </div>
                          <div className="div-block-39">
                            <div className="text-block-3">
                              {currentItem.assets[2]}
                              <br />
                            </div>
                            <div className="text-block-4">
                              {Assets["Eyes"][currentItem.assets[2]]}%
                            </div>
                          </div>
                        </div>
                        <div className="divblockbeard">
                          <div className="divblockcategoryimg">
                            <img
                              src="images/icons/beards.png"
                              loading="lazy"
                              sizes="33px"
                              alt=""
                              className="image-15"
                            />
                          </div>
                          <div className="div-block-39">
                            <div className="text-block-3">
                              {currentItem.assets[1]}
                              <br />
                            </div>
                            <div className="text-block-4">
                              {Assets["Beard"][currentItem.assets[1]]}%
                            </div>
                          </div>
                        </div>
                        <div className="divblockclothes">
                          <div className="divblockcategoryimg">
                            <img
                              src="images/icons/tshirt.png"
                              loading="lazy"
                              sizes="33px"
                              alt=""
                              className="image-15"
                            />
                          </div>
                          <div className="div-block-39">
                            <div className="text-block-3">
                              {currentItem.assets[4]}
                              <br />
                            </div>
                            <div className="text-block-4">
                              {Assets["Clothes"][currentItem.assets[4]]}%
                            </div>
                          </div>
                        </div>
                        <div className="divblockbag">
                          <div className="divblockcategoryimg">
                            <img
                              src="images/icons/bag.png"
                              loading="lazy"
                              sizes="33px"
                              alt=""
                              className="image-15"
                            />
                          </div>
                          <div className="div-block-39">
                            <div className="text-block-3">
                              {currentItem.assets[6]}
                              <br />
                            </div>
                            <div className="text-block-4">
                              {Assets["Bag"][currentItem.assets[6]]}%
                            </div>
                          </div>
                        </div>
                        <div className="divblockbackground">
                          <div className="divblockcategoryimg">
                            <img
                              src="images/icons/photos.png"
                              loading="lazy"
                              sizes="33px"
                              alt=""
                              className="image-15"
                            />
                          </div>
                          <div className="div-block-39">
                            <div className="text-block-3">
                              {currentItem.assets[5]}
                              <br />
                            </div>
                            <div className="text-block-4">
                              {Assets["Background"][currentItem.assets[5]]}%
                            </div>
                          </div>
                        </div>
                        <div className="divblockminer">
                          <div className="divblockcategoryimg">
                            <img
                              src="images/icons/man.png"
                              loading="lazy"
                              sizes="33px"
                              alt=""
                              className="image-15"
                            />
                          </div>
                          <div className="div-block-39">
                            <div className="text-block-3">
                              {currentItem.assets[7]}
                              <br />
                            </div>
                            <div className="text-block-4">
                              {Assets["Miner"][currentItem.assets[7]]}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="divcardexplorervideo">
                    <div className="background-video-4 w-background-video w-background-video-atom">
                      <video autoPlay loop muted playsInline>
                        <source
                          src={
                            "https://ipfs.io/ipfs/bafybeia7lyiz5fxsr3w4tgr3e5zw32upjgevkf6wvplkyhzfnaetldlxue/" +
                            currentItem.id +
                            ".mp4"
                          }
                        />
                      </video>
                    </div>
                  </div>
                  <div
                    className="divcardexplorerbtnquit"
                    onClick={() => setCurrent(null)}
                  ></div>
                  <div className="div-block-42">
                    <img src="images/Logo_T4.png" loading="lazy" alt="" />
                  </div>
                </div>
                <div
                  className="divclosecardwrapper"
                  onClick={() => setCurrent(null)}
                ></div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
