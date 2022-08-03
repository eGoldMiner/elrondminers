import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Close } from '@mui/icons-material';
import { Button, FormControl, IconButton, FormControlLabel, Radio, RadioGroup, Select } from "@mui/material"
import { Typography, MenuItem } from '@mui/material';
import All from '../data/All.json';
import Assets from "../data/Assets.json";
import Filters from "../data/Filters.json";

const Clip = ({ url, id }) => {
  const videoRef = useRef();

  // const stopMovie = (e) => {
  //   e.target.pause();
  // }

  // const playMovie = (e) => {
  //   e.target.play();
  // }

  useEffect(() => {
    videoRef.current?.load();
  }, [url]);

  return (
    <video loop playsInline muted ref={videoRef} src={url}
      // onMouseOver={playMovie}
      // onMouseOut={stopMovie}
      poster={'/images/miners/' + id + '.png'}
    >
    </video>
  );
}
export default function MineExplorerView() {
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({})
  const [order, setOrder] = useState("highest")
  const [current, setCurrent] = useState(null)
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
    if(current){
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
      console.log(filter);
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
                  console.log(filter);
                  if (filter === "Pickaxe") return <>
                    <FormControl className='w-100'>
                      <RadioGroup
                        className='d-flex flex-row justify-content-center'
                        onChange={(e) => { setFilters({ ...filters, [filter]: e.target.value }) }}
                        value={filters[filter] || null}
                      >
                        
                        {
                          Filters[filter]['values'].map((item, index) => {
                            return (
                              <div key={item} className='d-flex mb-3'>
                                <FormControlLabel control={<Radio />} value={item} className="m-0" />
                                <img src={"/images/pickaxe-" + (index + 1) + ".png"} alt="pickaxe-1" height={"40"} />
                              </div>
                            )
                          })
                        }
                      </RadioGroup>
                    </FormControl>
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
          <div className='row w-100'>
            <div className='col-lg-12' id="header">
              <div className='row'>
                <div className="col-auto">
                  <div id="count">{totalItems}</div>
                  <div id="miners">Miners</div>
                </div>
                <div className="col d-flex align-items-center justify-content-end">
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
            <div className='col-12 ps-sm-3 pe-sm-5 mt-4 pt-1'>
              <div className='row w-100' ref={itemList} id="miner-list">
                {
                  items.map((item, index) => {
                    return <div className='col-12 col-md-4 col-xl-3 p-3' key={index} onClick={() => setCurrent(item.id)}>
                      <div className='miner-item h-100'>
                        <div className='rank'><Typography>{item.rank}</Typography></div>
                        <div className='id'><Typography>Miner #{item.id}</Typography></div>
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
      <div id="miner-modal" ref={modal}>
        {
          current ? 
          <div id="miner-modal-container">
            <video autoPlay loop playsInline muted src={"https://ipfs.io/ipfs/bafybeia7lyiz5fxsr3w4tgr3e5zw32upjgevkf6wvplkyhzfnaetldlxue/" + currentItem.id + ".mp4"}>
            </video>
            <div id="miner-modal-content">
              <div>
                <img src={"/images/Logo_T4.png"} alt="elrond-miners" />
              </div>
              <div id="miner-modal-content-right">
                <div>
                  <IconButton id='close-button' onClick={() => setCurrent(null)}>
                    <Close/>
                  </IconButton>
                  <Typography variant="h1" component={"p"} align="center">MINER <span>#{currentItem.id}</span></Typography>
                  <div className='row'>
                    <div className='item col-6'>
                      <img src="/images/icons/crystal.png" />
                      <div>
                        <Typography variant="h2" component={"p"}>Rank 243</Typography>
                        <Typography><span>/7000</span></Typography>
                      </div>
                    </div>
                    <div className='item col-6'>
                      <img src="/images/icons/crystal.png" />
                      <div>
                        <Typography variant="h2" component={"p"}>{currentItem.assets[3]}</Typography>
                        <Typography><span>{Assets['Pickaxe'][currentItem.assets[3]]}%</span></Typography>
                      </div>
                    </div>
                    <div className="divider">
                      <div />
                      <div />
                    </div>
                    <div className='item col-6'>
                      <img src="/images/icons/crystal.png" />
                      <div>
                        <Typography variant="h2" component={"p"}>{currentItem.assets[0]}</Typography>
                        <Typography><span>{Assets['Helmet'][currentItem.assets[0]]}%</span></Typography>
                      </div>
                    </div>
                    <div className='item col-6'>
                      <img src="/images/icons/crystal.png" />
                      <div>
                        <Typography variant="h2" component={"p"}>{currentItem.assets[2]}</Typography>
                        <Typography><span>{Assets['Eyes'][currentItem.assets[2]]}%</span></Typography>
                      </div>
                    </div>
                    <div className='item col-6'>
                      <img src="/images/icons/crystal.png" />
                      <div>
                        <Typography variant="h2" component={"p"}>{currentItem.assets[1]}</Typography>
                        <Typography><span>{Assets['Beard'][currentItem.assets[1]]}%</span></Typography>
                      </div>
                    </div>
                    <div className='item col-6'>
                      <img src="/images/icons/crystal.png" />
                      <div>
                        <Typography variant="h2" component={"p"}>{currentItem.assets[4]}</Typography>
                        <Typography><span>{Assets['Clothes'][currentItem.assets[4]]}%</span></Typography>
                      </div>
                    </div>
                    <div className='item col-6'>
                      <img src="/images/icons/crystal.png" />
                      <div>
                        <Typography variant="h2" component={"p"}>{currentItem.assets[6]}</Typography>
                        <Typography><span>{Assets['Bag'][currentItem.assets[6]]}%</span></Typography>
                      </div>
                    </div>
                    <div className='item col-6'>
                      <img src="/images/icons/crystal.png" />
                      <div>
                        <Typography variant="h2" component={"p"}>{currentItem.assets[5]}</Typography>
                        <Typography><span>{Assets['Background'][currentItem.assets[5]]}%</span></Typography>
                      </div>
                    </div>
                    <div className='item col-6'>
                      <img src="/images/icons/crystal.png" />
                      <div>
                        <Typography variant="h2" component={"p"}>{currentItem.assets[7]}</Typography>
                        <Typography><span>{Assets['Miner'][currentItem.assets[7]]}%</span></Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            : <></>
        }

      </div>
    </div>
  </>
}