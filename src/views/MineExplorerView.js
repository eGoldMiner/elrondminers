import React from 'react';
import All from '../data/All';
import Filters from "../data/Filters";
import Assets from "../data/Assets.json"
import { useState, useEffect, useRef } from 'react';
import { Button, FormControl, IconButton, FormControlLabel, Radio, RadioGroup, Select } from "@mui/material"
import { Typography, MenuItem } from '@mui/material';
import { Close } from '@mui/icons-material';


const Clip = ({ url, id }) => {
  const videoRef = useRef();

  const stopMovie = (e) => {
    e.target.pause();
  }

  const playMovie = (e) => {
    e.target.play();
  }

  useEffect(() => {
    videoRef.current?.load();
  }, [url]);

  return (
    <video loop playsInline muted ref={videoRef} src={url}
      onMouseOver={playMovie}
      onMouseOut={stopMovie}
      poster={'/images/miners/' + id + '.png'}
    >
    </video>
  );
}


export default function MineExplorerView() {
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({})
  const [order, setOrder] = useState("highest")
  const [current, setCurrent] = useState(109) ///////REMETTRE A NULL
  const filtersMenu = useRef(null)
  const itemList = useRef()
  const modal = useRef()


  const loadMore = () => {
    if (window.scrollY + window.innerHeight >= (itemList.current.offsetTop + itemList.current.offsetHeight) - 200) {
      setCurrentPage(currentPage + 1)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', () => {
      loadMore()
    });

  }, [currentPage])

  useEffect(() => {
    loadMore()
  }, [])

  useEffect(() => {
    if (current) {
      modal.current.classList.add("open")
    } else {
      modal.current.classList.remove("open")
    }
  }, current)

  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  let items = All
  if (Object.keys(filters).length) {
    Object.keys(filters).map(filter => {
      if (filters[filter]) {
        if (filter === "Accessory" && filters[filter] === "Unique") {
          items = items.filter(item => {
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
              "Onyx"
            ]
            return unique.includes(item.assets[Filters[filter].index])
          })
        } else {
          let filterValue = filters[filter]
          if (filter === "Beards") {
            let beards = {
              "Small Brown": "T1 Brown",
              "Small Red": "T2 Red",
              "Small Blond": "T3 Blond",
              "Big Blond": "T4 Blond",
              "Big Brown": "T5 Brown",
              "Big Red": "T6 Red"
            }
            filterValue = beards[filterValue]
          }
          items = items.filter(item => {
            return item.assets[Filters[filter].index] === filterValue
          })
        }
      }
    })
  }

  let totalItems = items.length
  let currentItem = items.filter(i => i.id === current)[0]
  if (order === "lowest") {
    items.sort((a, b) => b.rank - a.rank)
  } else {
    items.sort((a, b) => a.rank - b.rank)
  }
  items = items.slice(0, currentPage * 24)


  return <>
    <div id="explorer">
      <div className='col-12 text-center'>
        <Button
          variant='outlined'
          color='secondary'
          className='mb-3 d-sm-none'
          onClick={() => {
            filtersMenu.current.classList.toggle('open')
          }}
        >Filters</Button>
      </div>
      <div className='row mt-3'>
        <div className='col-lg-3 col-md-4 col-sm-5 px-5 mb-3' id="filters" ref={filtersMenu}>
          <div>
            <div className="filter">
              {
                Object.keys(Filters).map((filter, index) => {
                  if (filter === "Pickaxe") return <>
                    {/* <FormControl className='w-100'>
                      <RadioGroup
                        className='d-flex flex-row justify-content-center'
                        onChange={(e) => { setFilters({ ...filters, [filter]: e.target.value }) }}
                        value={filters[filter] || null}
                      >
                        {
                          Filters[filter]['values'].map((item, index) => {
                            return <div className='d-flex mb-3'>
                              <FormControlLabel control={<Radio />} value={item} className="m-0" />
                              <img src={"/images/pickaxe-" + (index + 1) + ".png"} alt="pickaxe-1" height={"40"} />
                            </div>
                          })
                        }
                      </RadioGroup>
                    </FormControl> */}
                    <div id="select-pickaxe" className='row'>
                      {
                        Filters[filter]['values'].map((item, index) => {
                          return (
                            <div key={item} className='col p-1 radio-pickaxe'>
                              <a
                                className={filters[filter] === item ? "selected" : ""}
                                onClick={() => {
                                  setFilters({ ...filters, [filter]: filters[filter] === item ? null : item })
                                }}
                              >
                                <img
                                  src={"/images/pickaxe-" + (index + 1) + ".png"}
                                  alt={"pickaxe" + 1}
                                />
                              </a>
                            </div>
                          )
                        })
                      }
                    </div>
                  </>
                  return <>
                    <Typography variant="body1">{filter}</Typography>
                    <Select className='w-100'
                      onChange={(e) => {
                        setFilters({ ...filters, [filter]: e.target.value })
                      }}
                      value={filters[filter] || null}
                    >
                      {
                        Filters[filter]['values'].map((item, index) => {
                          return (
                            <MenuItem key={item} value={item}>{item}</MenuItem>
                          )
                        })
                      }
                    </Select>
                  </>
                })
              }
              <div className='text-center mt-3'>
                <Button onClick={() => setFilters({})} size="small" variant='contained'>Clear filters</Button>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-9 col-md-8 col-sm-7 px-0'>
          <div id="results-container" className='row w-100'>
            <div className='col-lg-12 ps-sm-3 pe-sm-5' id="header">
              <div className='row p-3'>
                <div className="col-auto p-0">
                  <div id="count">{totalItems}</div>
                  <div id="miners">Miners</div>
                </div>
                <div className="col p-0 d-flex align-items-center justify-content-end">
                  <FormControl>
                    <Select
                      value={order}
                      onChange={(e) => {
                        setOrder(e.target.value)
                      }}
                    >
                      <MenuItem value={'lowest'}>Lowest rank</MenuItem>
                      <MenuItem value={'highest'}>Highest rank</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            <div className='col-12 ps-sm-3 pe-sm-5 mt-4 pt-1' id="miner-list-container">
              <div className='row w-100' ref={itemList} id="miner-list">
                {
                  items.map((item, index) => {
                    return <div className='col-12 col-md-6 col-lg-4 col-xl-3 p-3' key={index} onClick={() => setCurrent(item.id)}>
                      <div className='miner-item h-100'>
                        <div className='rank'><Typography variant="p">Rank {item.rank}</Typography></div>
                        <div className='id'><Typography variant="p">Miner #{item.id}</Typography></div>
                        <div></div>
                        <Clip url={item.videoLink} id={item.id} />
                      </div>
                    </div>
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div id="miner-modal" ref={modal}>
        {
          current ? <>

            <video className='videoOpenMiner' autoPlay loop playsInline muted src={"https://ipfs.io/ipfs/bafybeia7lyiz5fxsr3w4tgr3e5zw32upjgevkf6wvplkyhzfnaetldlxue/" + currentItem.id + ".mp4"}>
            </video>
            <div id="miner-modal-content">
              <div>
                <img src={"/images/Logo_T4.png"} alt="elrond-miners" />
              </div>
              <div>
                <IconButton id='close-button' onClick={() => setCurrent(null)}>
                  <Close />
                </IconButton>
                <Typography variant="h1" component={"p"} align="center">MINER <span>#{currentItem.id}</span></Typography>
                <div className='row'>
                  <div className='item'>
                    <img src="/images/icons/crystal.png" />
                    <div>
                      <Typography variant="h2" component={"p"}>{currentItem.rank}</Typography>
                      <Typography><span>/7000</span></Typography>
                    </div>
                  </div>
                  <div className='item'>
                    <img src="/images/icons/pickaxe.png" />
                    <div>
                      <Typography variant="h2" component={"p"}>{currentItem.assets[3]}</Typography>
                      <Typography><span>{Assets['Pickaxe'][currentItem.assets[3]]}%</span></Typography>
                    </div>
                  </div>
                  <div className="divider">
                    <div />
                    <div />
                  </div>
                  <div className='item'>
                    <img src="/images/icons/helmet.png" />
                    <div>
                      <Typography variant="h2" component={"p"}>{currentItem.assets[0]}</Typography>
                      <Typography><span>{Assets['Helmet'][currentItem.assets[0]]}%</span></Typography>
                    </div>
                  </div>
                  <div className='item'>
                    <img src="/images/icons/eye.png" />
                    <div>
                      <Typography variant="h2" component={"p"}>{currentItem.assets[2]}</Typography>
                      <Typography><span>{Assets['Eyes'][currentItem.assets[2]]}%</span></Typography>
                    </div>
                  </div>
                  <div className='item'>
                    <img src="/images/icons/beards.png" />
                    <div>
                      <Typography variant="h2" component={"p"}>{currentItem.assets[1]}</Typography>
                      <Typography><span>{Assets['Beard'][currentItem.assets[1]]}%</span></Typography>
                    </div>
                  </div>
                  <div className='item'>
                    <img src="/images/icons/tshirt.png" />
                    <div>
                      <Typography variant="h2" component={"p"}>{currentItem.assets[4]}</Typography>
                      <Typography><span>{Assets['Clothes'][currentItem.assets[4]]}%</span></Typography>
                    </div>
                  </div>
                  <div className='item'>
                    <img src="/images/icons/bag.png" />
                    <div>
                      <Typography variant="h2" component={"p"}>{currentItem.assets[6]}</Typography>
                      <Typography><span>{Assets['Bag'][currentItem.assets[6]]}%</span></Typography>
                    </div>
                  </div>
                  <div className='item'>
                    <img src="/images/icons/photos.png" />
                    <div>
                      <Typography variant="h2" component={"p"}>{currentItem.assets[5]}</Typography>
                      <Typography><span>{Assets['Background'][currentItem.assets[5]]}%</span></Typography>
                    </div>
                  </div>
                  <div className='item'>
                    <img src="/images/icons/man.png" />
                    <div>
                      <Typography variant="h2" component={"p"}>{currentItem.assets[7]}</Typography>
                      <Typography><span>{Assets['Miner'][currentItem.assets[7]]}%</span></Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
            : <></>
        }

      </div> */}

      <div ref={modal}>
        {
          current ? <>
            <div className="divcardcontainer-wrapper">
              <div className="divcardexplorer">
                <div className="div-block-35">
                  <div className="div-block-36">
                    <h1 className="headingExplorerMiner"><span className="text-span-10">MINER</span> #{currentItem.id}</h1>
                    <div className="div-block-41">
                      <div className="divblockrank">
                        <div className="divblockcategoryimg">
                          <img src="images/icons/crystal.png" loading="lazy" sizes="33px" alt="" className="image-15" />
                        </div>
                        <div className="div-block-39">
                          <div className="text-block-3">Rank {currentItem.rank}<br /></div>
                          <div className="text-block-4">/5000</div>
                        </div>
                      </div>
                      <div className="divblockpickaxe">
                        <div className="divblockcategoryimg">
                          <img src="images/icons/pickaxe.png" loading="lazy" alt="" className="image-15" />
                        </div>
                        <div className="div-block-39">
                          <div className="text-block-3">{currentItem.assets[3]}<br /></div>
                          <div className="text-block-4">{Assets['Pickaxe'][currentItem.assets[3]]}%</div>
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
                          <img src="images/icons/helmet.png" loading="lazy" sizes="33px" alt="" className="image-15" />
                        </div>
                        <div className="div-block-39">
                          <div className="text-block-3">{currentItem.assets[0]}<br /></div>
                          <div className="text-block-4">{Assets['Helmet'][currentItem.assets[0]]}%</div>
                        </div>
                      </div>
                      <div className="divblockeyes">
                        <div className="divblockcategoryimg">
                          <img src="images/icons/eye.png" loading="lazy" sizes="33px" alt="" className="image-15" />
                        </div>
                        <div className="div-block-39">
                          <div className="text-block-3">{currentItem.assets[2]}<br /></div>
                          <div className="text-block-4">{Assets['Eyes'][currentItem.assets[2]]}%</div>
                        </div>
                      </div>
                      <div className="divblockbeard">
                        <div className="divblockcategoryimg">
                          <img src="images/icons/beards.png" loading="lazy" sizes="33px" alt="" className="image-15" />
                        </div>
                        <div className="div-block-39">
                          <div className="text-block-3">{currentItem.assets[1]}<br /></div>
                          <div className="text-block-4">{Assets['Beard'][currentItem.assets[1]]}%</div>
                        </div>
                      </div>
                      <div className="divblockclothes">
                        <div className="divblockcategoryimg">
                          <img src="images/icons/tshirt.png" loading="lazy" sizes="33px" alt="" className="image-15" />
                        </div>
                        <div className="div-block-39">
                          <div className="text-block-3">{currentItem.assets[4]}<br /></div>
                          <div className="text-block-4">{Assets['Clothes'][currentItem.assets[4]]}%</div>
                        </div>
                      </div>
                      <div className="divblockbag">
                        <div className="divblockcategoryimg">
                          <img src="images/icons/bag.png" loading="lazy" sizes="33px" alt="" className="image-15" />
                        </div>
                        <div className="div-block-39">
                          <div className="text-block-3">{currentItem.assets[6]}<br /></div>
                          <div className="text-block-4">{Assets['Bag'][currentItem.assets[6]]}%</div>
                        </div>
                      </div>
                      <div className="divblockbackground">
                        <div className="divblockcategoryimg">
                          <img src="images/icons/photos.png" loading="lazy" sizes="33px" alt="" className="image-15" />
                        </div>
                        <div className="div-block-39">
                          <div className="text-block-3">{currentItem.assets[5]}<br /></div>
                          <div className="text-block-4">{Assets['Background'][currentItem.assets[5]]}%</div>
                        </div>
                      </div>
                      <div className="divblockminer">
                        <div className="divblockcategoryimg">
                          <img src="images/icons/man.png" loading="lazy" sizes="33px" alt="" className="image-15" />
                        </div>
                        <div className="div-block-39">
                          <div className="text-block-3">{currentItem.assets[7]}<br /></div>
                          <div className="text-block-4">{Assets['Miner'][currentItem.assets[7]]}%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="divcardexplorervideo">
                  <div data-poster-url="videos/3538-poster-00001.jpg" data-video-urls="videos/3538-transcode.mp4,videos/3538-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="background-video-4 w-background-video w-background-video-atom">
                    <video autoPlay loop="" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
                      <source src={"https://ipfs.io/ipfs/bafybeia7lyiz5fxsr3w4tgr3e5zw32upjgevkf6wvplkyhzfnaetldlxue/" + currentItem.id + ".mp4"} data-wf-ignore="true" />
                      <source src={"https://ipfs.io/ipfs/bafybeia7lyiz5fxsr3w4tgr3e5zw32upjgevkf6wvplkyhzfnaetldlxue/" + currentItem.id + ".mp4"} data-wf-ignore="true" />
                    </video></div>
                </div>
                <div className="divcardexplorerbtnquit" onClick={() => setCurrent(null)}></div>
                <div className="div-block-42">
                  <img src="images/Fichier-7.png" loading="lazy" alt="" />
                </div>
                <div className="div-block-43">
                  <img src="images/v2.png" loading="lazy" srcSet="images/v2-p-500.png 500w, images/v2-p-800.png 800w, images/v2-p-1080.png 1080w, images/v2-p-1600.png 1600w, images/v2-p-2000.png 2000w, images/v2-p-2600.png 2600w, images/v2-p-3200.png 3200w, images/v2.png 5967w" sizes="200px" alt="" className="image-16" />
                </div>
              </div>
              <div className="divclosecardwrapper" onClick={() => setCurrent(null)}></div>
            </div>
          </>
            : <></>
        }
      </div>
    </div>
  </>
}