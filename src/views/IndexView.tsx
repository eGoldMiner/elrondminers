/* eslint-disable */
import React, { useEffect, useRef, useState, createRef } from 'react';
import { ImagesCoffre } from '../data/images/Coffre';
import { ImagesPioches } from '../data/images/Pioches';
import { ImagesCard } from '../data/images/Card';
import { ImagesLantern } from '../data/images/Lanterne';
import SequencePlayer from 'react-sequence-player';


export default function ({ setWindowMint }: any) {
  const timeline = createRef<HTMLDivElement>();

  const showFaq = async (e: any) => {
    let height = e.srcElement.closest('.af-class-faq-wrap').getElementsByClassName("af-class-faq-answer-2")[0].clientHeight;
    let heightContainer = e.srcElement.closest('.af-class-faq-wrap').getElementsByClassName("af-class-body-3")[0].clientHeight + 20;
    if (height === 0) {
      e.srcElement.closest('.af-class-faq-wrap').getElementsByClassName("af-class-faq-answer-2")[0].style.height = heightContainer + "px";
    }
    else {
      e.srcElement.closest('.af-class-faq-wrap').getElementsByClassName("af-class-faq-answer-2")[0].style.height = "0px";
    }
  };


  // const animImgPickaxe = async () => {
  //   let count = 0;
  //   while (true) {
  //     if (count >= ImagesPioches.length) {
  //       count = 0;
  //     }
  //     let img_Pickaxe = document.getElementById("img-pickaxe") as HTMLImageElement;
  //     if (img_Pickaxe != null) {
  //       img_Pickaxe.src = ImagesPioches[count];
  //     }
  //     count++;
  //     await new Promise(resolve => setTimeout(resolve, 30));
  //   }
  // }
  // const animImgCard = async () => {
  //   let count = 0;
  //   while (true) {
  //     if (count >= ImagesCard.length) {
  //       count = 0;
  //     }
  //     let img_Card = document.getElementById("img-card") as HTMLImageElement;
  //     if (img_Card != null) {
  //       img_Card.src = ImagesCard[count];
  //     }
  //     count++;
  //     await new Promise(resolve => setTimeout(resolve, 50));
  //   }
  // }


  useEffect(() => {
    Array.from(document.getElementsByClassName("af-class-faq-wrap")).forEach((el) => {
      el.addEventListener("click", showFaq);
    })
    return () => {
      Array.from(document.getElementsByClassName("af-class-faq-wrap")).forEach((el) => {
        el.removeEventListener("click", showFaq);
      })
    };
  }, []);

  // useEffect(() => {
    // animImgLantern();
    // animImgPickaxe();
    // animImgCard();
  // }, []);


  const offsetRatio = 1;

  document.addEventListener('scroll', function (e) {
    const containerCart = document.getElementById("img-carts");
    const cart1 = document.getElementById("cart-1");
    const cart3 = document.getElementById("cart-3");
    if (containerCart != null && cart1 != null && cart3 != null) {
      // //h0
      // let h0 = containerCart.offsetTop;
      // //h1
      // let h1 = containerCart.clientHeight;
      // //hS
      // let hS = window.scrollY;
      // //hH
      // let hH = window.innerHeight;
      // //hS1
      // let hS1 = h0 - hH;
      // //hS2
      // let hS2 = h0 + h1;
      // //percentage
      // let percentage = ((hS - hS1) / (hS2 - hS1));
      // percentage = percentage < 0 ? 0 : percentage > 1 ? 1 : percentage;

      // containerCart.style.background = 'green';
      // console.log(containerCart.clientWidth);
      // let translatemax = ((containerCart.clientWidth) / 3);
      // console.log("translate max : " + translatemax);
      // let translatemin = 0;
      // console.log("translate min : " + translatemin);
      // let curse = translatemax - translatemin;

      // cart1.style.transform = 'translateX(' + ((percentage * curse) - translatemax) + 'px)';
      // cart3.style.transform = 'translateX(' + (-((percentage * curse) - translatemax)) + 'px)';
      let innerHeight2 = window.innerHeight * offsetRatio;
      let scroll2 = window.scrollY + ((window.innerHeight * offsetRatio) / 2);
      let centerContainerY = containerCart.offsetTop - scroll2 + (containerCart.offsetHeight / 2);
      let percentage = centerContainerY / innerHeight2;
      percentage = percentage < 0 ? 0 : percentage > 100 ? 100 : percentage;

      let innerWidth = window.innerWidth;
      let offsetWidthCart1 = (innerWidth / 2) + cart1.clientWidth;
      let offsetWidthCart3 = (innerWidth / 2) + cart3.clientWidth;

      cart1.style.transform = 'translateX(' + (percentage * -offsetWidthCart1) + 'px)';
      cart3.style.transform = 'translateX(' + (percentage * offsetWidthCart3) + 'px)';
    }

    const containerNft = document.getElementById("carouselNft");
    const carouselNft1 = document.getElementById("carouselNft1");
    const carouselNft2 = document.getElementById("carouselNft2");
    if (containerNft != null && carouselNft1 != null && carouselNft2 != null) {
      //h0
      let h0 = containerNft.offsetTop;
      //h1
      let h1 = containerNft.clientHeight;
      //hS
      let hS = window.scrollY;
      //hH
      let hH = window.innerHeight;
      //hS1
      let hS1 = h0 - hH;
      //hS2
      let hS2 = h0 + h1;
      //percentage
      let percentage = ((hS - hS1) / (hS2 - hS1));
      percentage = percentage < 0 ? 0 : percentage > 1 ? 1 : percentage;

      let innerWidth = window.innerWidth;
      let translatemax = ((carouselNft1.clientWidth - innerWidth) / 2);
      let translatemin = -((carouselNft1.clientWidth - innerWidth) / 2);
      let curse = translatemax - translatemin;

      carouselNft1.style.transform = 'translateX(' + ((percentage * curse) - translatemax) + 'px)';
      carouselNft2.style.transform = 'translateX(' + (-((percentage * curse) - translatemax)) + 'px)';
    }
  });


  return (
    <>
      <div id="Home" className="af-class-sectionvideo af-class-wf-section">
        <img src="images/Prevu_Camera_1_001.PNG" loading="lazy" srcSet="images/Prevu_Camera_1_001-p-500.png 500w, images/Prevu_Camera_1_001-p-800.png 800w, images/Prevu_Camera_1_001-p-1080.png 1080w, images/Prevu_Camera_1_001-p-1600.png 1600w, images/Prevu_Camera_1_001.PNG 1920w" sizes="100vw" alt="" className="af-class-image-12" />
        <video autoPlay loop muted playsInline className='video-background'>
          <source src="videos/3Mineurs.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="af-class-divpresentation">
        <h1 className="af-class-headingpresentation">The NFT<br />who offers you <span className="af-class-text-span">real goldbar</span> !</h1>
        <div className="af-class-div-block-34">
          <a href="https://twitter.com/elrond_miners" target="_blank" className="w-inline-block">
            <img src="images/twitter.png" loading="lazy" alt="" className="img-social" />
          </a>
          <a href="https://discord.gg/MrBcfZhYwy" target="_blank" className="w-inline-block">
            <img src="images/discorde.png" loading="lazy" alt="" className="img-social" />
          </a>
        </div>
        <p className="af-class-paragraphepresentation">We are a strong team of 5,000 miners living in the Elrond Mine.<br />Our goal is to mine gold and <span className="af-class-text-span-4">reward you</span> !</p>
        <a className="af-class-buttonmint" onClick={() => setWindowMint(true)}>MINT&nbsp;LIVE</a>
      </div>
      <div id="img-carts" className="af-class-sectioncart af-class-wf-section">
        <img id="cart-1" src="images/Fichier-4_2.png" loading="lazy" alt="" className="af-class-carts" />
        <img id="cart-2" src="images/Fichier-2.png" loading="lazy" alt="" className="af-class-carts" />
        <img id="cart-3" src="images/Fichier-3_1.png" loading="lazy" alt="" className="af-class-carts" />
      </div>
      <div className="af-class-separator">
        <div className="af-class-divseparatorleft" />
        <div className="af-class-divseparatorcenter" />
        <div className="af-class-divseparatorright" />
      </div>
      <div className="af-class-sectionnftcarousel af-class-wf-section" id="carouselNft">
        <div className="af-class-divnft1" id="carouselNft1">
          <ul role="list" className="af-class-list w-list-unstyled">
            <li className="af-class-list-item-2">
              <div data-poster-url="videos/01-poster-00001.jpg" data-video-urls="videos/01-transcode.mp4,videos/01-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="af-class-background-video-2 w-background-video w-background-video-atom"><video id="1580ed56-282d-3159-421b-d6231bd2e80a-video" autoPlay loop style={{ backgroundImage: 'url("videos/01-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                <source src="videos/01-transcode.mp4" data-wf-ignore="true" />
                <source src="videos/01-transcode.webm" data-wf-ignore="true" />
              </video></div>
            </li>
            <li className="af-class-list-item-2">
              <div data-poster-url="videos/02-poster-00001.jpg" data-video-urls="videos/02-transcode.mp4,videos/02-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="af-class-background-video-2 w-background-video w-background-video-atom"><video id="91a48d5b-2a11-df48-a27e-9f4a3a18a558-video" autoPlay loop style={{ backgroundImage: 'url("videos/02-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                <source src="videos/02-transcode.mp4" data-wf-ignore="true" />
                <source src="videos/02-transcode.webm" data-wf-ignore="true" />
              </video></div>
            </li>
            <li className="af-class-list-item-2">
              <div data-poster-url="videos/03-poster-00001.jpg" data-video-urls="videos/03-transcode.mp4,videos/03-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="af-class-background-video-2 w-background-video w-background-video-atom"><video id="171ee4cb-e49a-2db0-f7f7-b54c6253449d-video" autoPlay loop style={{ backgroundImage: 'url("videos/03-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                <source src="videos/03-transcode.mp4" data-wf-ignore="true" />
                <source src="videos/03-transcode.webm" data-wf-ignore="true" />
              </video></div>
            </li>
            <li className="af-class-list-item-2">
              <div data-poster-url="videos/04-poster-00001.jpg" data-video-urls="videos/04-transcode.mp4,videos/04-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="af-class-background-video-2 w-background-video w-background-video-atom">
                <video id="a9c4fb18-144f-7e4e-1ce8-235faaee2e2e-video" autoPlay loop style={{ backgroundImage: 'url("videos/04-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                  <source src="videos/04-transcode.mp4" data-wf-ignore="true" />
                  <source src="videos/04-transcode.webm" data-wf-ignore="true" />
                </video></div>
            </li>
            <li className="af-class-list-item-2">
              <div data-poster-url="videos/05-poster-00001.jpg" data-video-urls="videos/05-transcode.mp4,videos/05-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="af-class-background-video-2 w-background-video">
                <video autoPlay loop style={{ backgroundImage: 'url("videos/05-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                  <source src="videos/05-transcode.mp4" data-wf-ignore="true" />
                  <source src="videos/05-transcode.webm" data-wf-ignore="true" />
                </video></div>
            </li>
            <li className="af-class-list-item-2">
              <div data-poster-url="videos/06-poster-00001.jpg" data-video-urls="videos/06-transcode.mp4,videos/06-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="af-class-background-video-2 w-background-video w-background-video-atom"><video id="7745a1b3-2b38-eca0-a38a-c944e54e37bf-video" autoPlay loop style={{ backgroundImage: 'url("videos/06-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                <source src="videos/06-transcode.mp4" data-wf-ignore="true" />
                <source src="videos/06-transcode.webm" data-wf-ignore="true" />
              </video></div>
            </li>
            <li className="af-class-list-item-2">
              <div data-poster-url="videos/07-poster-00001.jpg" data-video-urls="videos/07-transcode.mp4,videos/07-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="af-class-background-video-2 w-background-video w-background-video-atom"><video id="65bbe7e2-2310-6d09-1eae-6ddc559981df-video" autoPlay loop style={{ backgroundImage: 'url("videos/07-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                <source src="videos/07-transcode.mp4" data-wf-ignore="true" />
                <source src="videos/07-transcode.webm" data-wf-ignore="true" />
              </video></div>
            </li>
            <li className="af-class-list-item-2">
              <div data-poster-url="videos/08-poster-00001.jpg" data-video-urls="videos/08-transcode.mp4,videos/08-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="af-class-background-video-2 w-background-video w-background-video-atom"><video id="0a909e01-b5ed-87c8-4dd1-3d1c39152f61-video" autoPlay loop style={{ backgroundImage: 'url("videos/08-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                <source src="videos/08-transcode.mp4" data-wf-ignore="true" />
                <source src="videos/08-transcode.webm" data-wf-ignore="true" />
              </video></div>
            </li>
            <li className="af-class-list-item-2">
              <div data-poster-url="videos/09-poster-00001.jpg" data-video-urls="videos/09-transcode.mp4,videos/09-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="af-class-background-video-2 w-background-video w-background-video-atom"><video id="6b106d76-ed1b-1b88-8e5d-9c7924a68123-video" autoPlay loop style={{ backgroundImage: 'url("videos/09-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                <source src="videos/09-transcode.mp4" data-wf-ignore="true" />
                <source src="videos/09-transcode.webm" data-wf-ignore="true" />
              </video></div>
            </li>
            <li className="af-class-list-item-2">
              <div data-poster-url="videos/10-poster-00001.jpg" data-video-urls="videos/10-transcode.mp4,videos/10-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="af-class-background-video-2 w-background-video w-background-video-atom"><video id="9b15e687-4871-0c9e-f84a-d855dbab1ab5-video" autoPlay loop style={{ backgroundImage: 'url("videos/10-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                <source src="videos/10-transcode.mp4" data-wf-ignore="true" />
                <source src="videos/10-transcode.webm" data-wf-ignore="true" />
              </video></div>
            </li>
          </ul>
        </div>
        <div className="af-class-divnft2" id="carouselNft2">
          <ul role="list" className="af-class-list w-list-unstyled">
            <li className="af-class-list-item-2">
              <div data-poster-url="videos/11-poster-00001.jpg" data-video-urls="videos/11-transcode.mp4,videos/11-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="af-class-background-video-2 w-background-video w-background-video-atom"><video id="4acd5b47-de80-8693-cc27-044db9c4c07b-video" autoPlay loop style={{ backgroundImage: 'url("videos/11-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                <source src="videos/11-transcode.mp4" data-wf-ignore="true" />
                <source src="videos/11-transcode.webm" data-wf-ignore="true" />
              </video></div>
            </li>
            <li className="af-class-list-item-2">
              <div data-poster-url="videos/12-poster-00001.jpg" data-video-urls="videos/12-transcode.mp4,videos/12-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="af-class-background-video-2 w-background-video w-background-video-atom"><video id="4acd5b47-de80-8693-cc27-044db9c4c07d-video" autoPlay loop style={{ backgroundImage: 'url("videos/12-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                <source src="videos/12-transcode.mp4" data-wf-ignore="true" />
                <source src="videos/12-transcode.webm" data-wf-ignore="true" />
              </video></div>
            </li>
            <li className="af-class-list-item-2">
              <div data-poster-url="videos/13-poster-00001.jpg" data-video-urls="videos/13-transcode.mp4,videos/13-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="af-class-background-video-2 w-background-video w-background-video-atom"><video id="4acd5b47-de80-8693-cc27-044db9c4c07f-video" autoPlay loop style={{ backgroundImage: 'url("videos/13-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                <source src="videos/13-transcode.mp4" data-wf-ignore="true" />
                <source src="videos/13-transcode.webm" data-wf-ignore="true" />
              </video></div>
            </li>
            <li className="af-class-list-item-2">
              <div data-poster-url="videos/14-poster-00001.jpg" data-video-urls="videos/14-transcode.mp4,videos/14-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="af-class-background-video-2 w-background-video w-background-video-atom"><video id="4acd5b47-de80-8693-cc27-044db9c4c081-video" autoPlay loop style={{ backgroundImage: 'url("videos/14-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                <source src="videos/14-transcode.mp4" data-wf-ignore="true" />
                <source src="videos/14-transcode.webm" data-wf-ignore="true" />
              </video></div>
            </li>
            <li className="af-class-list-item-2">
              <div data-poster-url="videos/15b-poster-00001.jpg" data-video-urls="videos/15b-transcode.mp4,videos/15b-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="af-class-background-video-2 w-background-video w-background-video-atom"><video id="4acd5b47-de80-8693-cc27-044db9c4c083-video" autoPlay loop style={{ backgroundImage: 'url("videos/15b-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                <source src="videos/15b-transcode.mp4" data-wf-ignore="true" />
                <source src="videos/15b-transcode.webm" data-wf-ignore="true" />
              </video></div>
            </li>
            <li className="af-class-list-item-2">
              <div data-poster-url="videos/16-poster-00001.jpg" data-video-urls="videos/16-transcode.mp4,videos/16-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="af-class-background-video-2 w-background-video w-background-video-atom"><video id="4acd5b47-de80-8693-cc27-044db9c4c085-video" autoPlay loop style={{ backgroundImage: 'url("videos/16-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                <source src="videos/16-transcode.mp4" data-wf-ignore="true" />
                <source src="videos/16-transcode.webm" data-wf-ignore="true" />
              </video></div>
            </li>
            <li className="af-class-list-item-2">
              <div data-poster-url="videos/17b-poster-00001.jpg" data-video-urls="videos/17b-transcode.mp4,videos/17b-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="af-class-background-video-2 w-background-video w-background-video-atom"><video id="4acd5b47-de80-8693-cc27-044db9c4c087-video" autoPlay loop style={{ backgroundImage: 'url("videos/17b-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                <source src="videos/17b-transcode.mp4" data-wf-ignore="true" />
                <source src="videos/17b-transcode.webm" data-wf-ignore="true" />
              </video></div>
            </li>
            <li className="af-class-list-item-2">
              <div data-poster-url="videos/18-poster-00001.jpg" data-video-urls="videos/18-transcode.mp4,videos/18-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="af-class-background-video-2 w-background-video w-background-video-atom"><video id="4acd5b47-de80-8693-cc27-044db9c4c089-video" autoPlay loop style={{ backgroundImage: 'url("videos/18-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                <source src="videos/18-transcode.mp4" data-wf-ignore="true" />
                <source src="videos/18-transcode.webm" data-wf-ignore="true" />
              </video></div>
            </li>
            <li className="af-class-list-item-2">
              <div data-poster-url="videos/19-poster-00001.jpg" data-video-urls="videos/19-transcode.mp4,videos/19-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="af-class-background-video-2 w-background-video w-background-video-atom"><video id="4acd5b47-de80-8693-cc27-044db9c4c08b-video" autoPlay loop style={{ backgroundImage: 'url("videos/19-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                <source src="videos/19-transcode.mp4" data-wf-ignore="true" />
                <source src="videos/19-transcode.webm" data-wf-ignore="true" />
              </video></div>
            </li>
            <li className="af-class-list-item-2">
              <div data-poster-url="videos/20-poster-00001.jpg" data-video-urls="videos/20-transcode.mp4,videos/20-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="af-class-background-video-2 w-background-video w-background-video-atom"><video id="4acd5b47-de80-8693-cc27-044db9c4c08d-video" autoPlay loop style={{ backgroundImage: 'url("videos/20-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                <source src="videos/20-transcode.mp4" data-wf-ignore="true" />
                <source src="videos/20-transcode.webm" data-wf-ignore="true" />
              </video></div>
            </li>
          </ul>
        </div>
        <a href="/explore" target="_blank" className="af-class-buttonexplore">Explore NFT&nbsp;collection</a>
      </div>
      <div className="af-class-separator">
        <div className="af-class-divseparatorleft" />
        <div className="af-class-divseparatorcenter" />
        <div className="af-class-divseparatorright" />
      </div>
      <div id="About" className="af-class-sectionabout">
        <h1 className="af-class-headingsection af-class-centertitle">About the <span className="af-class-text-span-3">Project</span></h1>
        <div className="af-class-wf-section af-class-wf-section-explain">
          <p className="af-class-paragraphabout"> A collection of 5,000 3D animated miners mining real gold !<br />???<br />Elrond Miners are not only images of classic gold miners, those miners can also mine gold inside a cave and bring you rewards.<br />???<br />
            <span className="af-class-text-span-5">As before, gold miners work hard for rewards, today they are going to work for you in the world of Elrond blockchain.</span><br />
          </p>
          <img src="images/Elrond_Logo-300x292.png" loading="lazy" width={31} alt="" className="af-class-imageelrond" />
          <div className="divimageminer">
            <img id="img-pickaxe" src="/images/Pickaxe.gif" loading="lazy" sizes="(max-width: 991px) 100vw, (max-width: 6000px) 32vw, 1920px" alt="" className="af-class-imageabout" />
          </div>
        </div>
      </div>
      <div className="af-class-separator">
        <div className="af-class-divseparatorleft" />
        <div className="af-class-divseparatorcenter" />
        <div className="af-class-divseparatorright" />
      </div>
      <div className="af-class-sectionnode">
        <h1 className="af-class-headingsection af-class-centertitle">Validator <span className="af-class-text-span-3">Elrond Node</span></h1>
        <div className="af-class-wf-section af-class-wf-section-explain">
          <div className="af-class-divimagenode">
            <a href="https://docs.elrond.com/validators/overview/" target="_blank" className="af-class-linknode1 w-inline-block">
              <div className="af-class-divgear">
                <img src="images/Fichier-4.png" id="gear-1" loading="lazy" alt="" className="af-class-imagegear1" />
                <img src="images/Elrond_Logo-300x292.png" loading="lazy" alt="" className="af-class-imagegear1 af-class-imageinsidegear" />
              </div>
              <div className="af-class-divgear af-class-divgear2">
                <img src="images/Fichier-6.png" id="gear-2" loading="lazy" alt="" className="af-class-imagegear1" />
                <img src="images/Fichier-7.png" loading="lazy" alt="" className="af-class-imagegear1 af-class-imageinsidegear af-class-imageinsidegear2" />
              </div>
            </a>
          </div>
          <div className="af-class-divtextnode">
            <p className="af-class-paragraphexplain">Contributing in Elrond ecosystem growth is one of our goal.<br />This is why our objective is to open our own Validating node. <br /></p>
            <p className="af-class-paragraphexplain af-class-pargraph2node">By doing it, we participate to Elrond development, but also to get rewards for it. <br />Each time there is a transaction in Elrond's blockchain, nodes validate the transaction.<br />As a reward, gas fee of that transaction are split among those nodes.<br /></p>
            <p className="af-class-paragraphexplain af-class-paragraphexplain-end">Each week, we accumulate rewards that are then distributed to you.<br />Click on the wheels to know more about validiting nodes.<br /></p>
          </div>
        </div>
      </div>
      <div className="af-class-separator">
        <div className="af-class-divseparatorleft" />
        <div className="af-class-divseparatorcenter" />
        <div className="af-class-divseparatorright" />
      </div>
      <div className="af-class-sectiongold">
        <h1 className="af-class-headingsection af-class-centertitle">Earn real <span className="af-class-text-span-3">goldbar</span></h1>
        <div className="af-class-wf-section af-class-wf-section-explain">
          <div className="af-class-divtextgold">
            <p className="af-class-paragraphexplain af-class-paragraphearngold">We are the first collection to distribute real gold to holders. <br />Each week, we draw 5 winners among the holders. <br />These lucky miners will win either gold or silver bar. <br /><br />A miner's goal is to bring gold. Your miner, your gold. <br /><br />Elrond Miners give you electronic gold (EGLD) and real gold.<br />???</p>
          </div>
          <div className="af-class-divimagegold">
            <img id="img-goldbar" src="images/Coffre_a00000.png" loading="lazy" sizes="(max-width: 991px) 20vh, 21vw" alt="" className="af-class-imagegold" />
          </div>
        </div>
      </div>
      <div className="af-class-separator">
        <div className="af-class-divseparatorleft" />
        <div className="af-class-divseparatorcenter" />
        <div className="af-class-divseparatorright" />
      </div>
      <div className="af-class-sectioncard">
        <h1 className="af-class-headingsection af-class-centertitle">Collection of <span className="af-class-text-span-3">cards</span></h1>
        <div className="af-class-div-block-25 af-class-wf-section af-class-wf-section-explain">
          <div className="af-class-divimagecard">
            <img id="img-card" src="/images/Card.gif" loading="lazy" sizes="(max-width: 991px) 20vh, 21vw" alt="" className="af-class-imagegold" />
          </div>
          <div className="af-class-divtextcard">
            <p className="af-class-paragraphexplain af-class-paragraphexplain-end">Holders can also win their NFT in a physical collection card. <br />This is an IRL reminder of your hard working miner. Frame your NFT on your wall or on your desk.<br />???<br />Many collabs will use our collection card format. <br />If you???re not lucky, you can still order your NFT's collection card.<br />???<br />How much card will you collect ?</p>
          </div>
          <div />
        </div>
      </div>
      <div className="af-class-separator">
        <div className="af-class-divseparatorleft" />
        <div className="af-class-divseparatorcenter" />
        <div className="af-class-divseparatorright" />
      </div>
      <div>
        <h1 className="af-class-headingsection af-class-centertitle">Elrond Mine <span className="af-class-text-span-3">video game</span></h1>
        <div className="af-class-wf-section af-class-divgamesection af-class-wf-section-explain">
          <div className="af-class-divtextgame">
            <p className="af-class-paragraphexplain af-class-paragraphexplain-end">
              Playing video games and winning prizes. Our game is the first mobile P2E.
              <br />
              <br />
              Play with your NFT and go as far as possible to mine gold.
              <br />
              Fight against ennemies, dodge traps. Mines are full of dangers.
              <br />
              Tournaments are organized for the top players.
              <br />
              <span className="af-class-spantextvideogame">You can earn real gold, EGLD, NFTs ...</span>
              <br />
              <br />
              Join our Alpha and win prizes already !</p>
          </div>
          <div className="af-class-divimagegame">
            <img id="img-lantern" src="images/Lantern.gif" loading="lazy" alt="" className="af-class-image-6" />
          </div>
        </div>
      </div>
      <div className="af-class-div-block-21">
        <h1 className="af-class-heading-4">ROADMAP</h1><img src="images/Banniere-1.gif" loading="lazy" alt="" className="af-class-image-11" />
      </div>
      <div className="af-class-sectionroadmap" ref={timeline}>
        <div className="af-class-divdecoroadmap">
          <div className="af-class-divlineroadmap1" />
        </div>
        <div>
          <div className="af-class-divroadmapstep">
            <div className="af-class-divcircleroadmapinprogress col-auto col-auto" />
            <div>
              <h1 className="af-class-heading-5"><span className="af-class-text-span-7">Q1</span> 2022<br /><span className="af-class-text-span-8">Preparation of the pickaxes</span></h1>
              <p className="af-class-paragraph-6">- Disclosure social networks and the website<br />- Reveal of the first 3D animated NFTs<br />- Selection of Miner Pioneer who will participate to private sale<br />- Launch of the first private sale (100 NFTs available)<br />- Giveaways and gifts for members<br />- Collaboration with other collections</p>
            </div>
          </div>
          <div className="af-class-divroadmapstep">
            <div className="af-class-divcircleroadmapinprogress col-auto col-auto" />
            <div>
              <h1 className="af-class-heading-5"><span className="af-class-text-span-7">Q2</span> 2022<br /><span className="af-class-text-span-8">Work of the miners</span></h1>
              <p className="af-class-paragraph-6">- Launch of the second private sale (100 NFTs available)<br />- Launch of the first public sale (1000 NFTs)<br />- Giveaways of real gold every week<br />- Community based decisions<br />- Launch of the second public sale (2500 NFTs)<br />- Development of an interactive tool to retrieve your rewards<br />- Launch of the last public sale (3300 NFTs)<br />- Deployment of our validator node (sPoS)<br />- Start of the rewards distribution</p>
            </div>
          </div>
          <div className="af-class-divroadmapstep">
            <div className="af-class-divcircleroadmapinprogress col-auto" />
            <div className='col'>
              <h1 className="af-class-heading-5"><span className="af-class-text-span-7">Q3</span> 2022<br /><span className="af-class-text-span-8">Improvment of working conditions</span></h1>
              <p className="af-class-paragraph-6">- Giveaway of real gold every week<br />- Release of a teaser for the new Elrond Miners game</p>
            </div>
          </div>
          <div className="af-class-divroadmapstep">
            <div className="af-class-divcircleroadmapnot col-auto" />
            <div>
              <h1 className="af-class-heading-5"><span className="af-class-text-span-7">Q4</span> 2022<br /><span className="af-class-text-span-8">Passage to the Bronze Age</span></h1>
              <p className="af-class-paragraph-6">- New system to enhance your miner's efficiency</p>
            </div>
          </div>
          <div className="af-class-divroadmapstep af-class-divroadmaplaststep">
            <div className="af-class-divcircleroadmapnot col-auto" />
            <div>
              <h1 className="af-class-heading-5"><span className="af-class-text-span-7">Year</span> 2023<br /><span className="af-class-text-span-8">Passage to the Iron Age</span></h1>
              <p className="af-class-paragraph-6">- Release of the Elrond Miners game<br />- Launch of new collections that you decide</p>
            </div>
          </div>
        </div>
      </div>
      <div className="af-class-separator">
        <div className="af-class-divseparatorleft" />
        <div className="af-class-divseparatorcenter" />
        <div className="af-class-divseparatorright" />
      </div>
      <div className="af-class-sectionteam af-class-wf-section">
        <div id="Team" className="af-class-divcards">
          <div className="af-class-divcardcontainer">
            <div data-poster-url="videos/MarvelGreyBackground-poster-00001.jpg" data-video-urls="videos/MarvelGreyBackground-transcode.mp4,videos/MarvelGreyBackground-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="backgroundvideocard w-background-video w-background-video-atom">
              <video autoPlay loop muted playsInline data-wf-ignore="true" data-object-fit="cover">
                <source src="videos/MarvelGreyBackground-transcode.mp4" data-wf-ignore="true" />
                <source src="videos/MarvelGreyBackground-transcode.webm" data-wf-ignore="true" />
              </video>
            </div>
            <div className="af-class-div-block-24">
              <h1 className="af-class-headingteamname">Irving<br /></h1>
              <h1 className="af-class-headingteamrole">Co-founder Miner</h1>
            </div>
          </div>
          <div className="af-class-divcardcontainer">
            <div data-poster-url="videos/GokuGreyBackground-poster-00001.jpg" data-video-urls="videos/GokuGreyBackground-transcode.mp4,videos/GokuGreyBackground-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="backgroundvideocard w-background-video w-background-video-atom">
              <video autoPlay loop muted playsInline data-wf-ignore="true" data-object-fit="cover">
                <source src="videos/GokuGreyBackground-transcode.mp4" data-wf-ignore="true" />
                <source src="videos/GokuGreyBackground-transcode.webm" data-wf-ignore="true" />
              </video>
            </div>
            <div className="af-class-div-block-24">
              <h1 className="af-class-headingteamname">Kartabble<br /></h1>
              <h1 className="af-class-headingteamrole">Co-founder Miner</h1>
            </div>
          </div>
          <div className="af-class-divcardcontainer">
            <div data-poster-url="videos/SaitamaGreyBackground-poster-00001.jpg" data-video-urls="videos/SaitamaGreyBackground-transcode.mp4,videos/SaitamaGreyBackground-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="backgroundvideocard w-background-video w-background-video-atom">
              <video autoPlay loop muted playsInline data-wf-ignore="true" data-object-fit="cover">
                <source src="videos/SaitamaGreyBackground-transcode.mp4" data-wf-ignore="true" />
                <source src="videos/SaitamaGreyBackground-transcode.webm" data-wf-ignore="true" />
              </video>
            </div>
            <div className="af-class-divcard" />
            <div className="af-class-div-block-24">
              <h1 className="af-class-headingteamname">Kanpo<br /></h1>
              <h1 className="af-class-headingteamrole">Artist Miner</h1>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="af-class-wf-section af-class-sectionfaq" id="faq">
        <div id="Faq" className="w-layout-grid af-class-faq-grid-4">
          <div className="af-class-faq-wrap">
            <div data-w-id="20de4dac-73bc-a15e-c464-46b3f13ecd3d" className="af-class-faq-question-2">
              <img src="images/Fichier-7.png" loading="lazy" width={40} alt="" className="af-class-faq-icon" />
              <h5 className="af-class-faq-heading">Why Elrond ?</h5>
            </div>
            <div style={{ height: 0 }} className="af-class-faq-answer-2">
              <p className="af-class-body-3 af-class-bottom-margin-30">One of the fastest and with very low fees, we are convinced that Elrond is among the most powerful blockchain. This is why miners choose to mine on the best blockchain, Elrond.</p>
            </div>
          </div>
          <div className="af-class-faq-wrap">
            <div data-w-id="20de4dac-73bc-a15e-c464-46b3f13ecd1d" className="af-class-faq-question-2">
              <img src="images/Fichier-7.png" loading="lazy" width={40} alt="" className="af-class-faq-icon" />
              <h5 className="af-class-faq-heading">What are the Elrond Miners ?</h5>
            </div>
            <div style={{ height: 0 }} className="af-class-faq-answer-2">
              <p className="af-class-body-3 af-class-bottom-margin-30">Elrond Miners are a team of 7,000 NFTs randomly generated living on the Elrond Blockchain. Thanks to your miners you wil be able to earn real gold at home, but also EGLD each week.</p>
            </div>
          </div>
          <div className="af-class-faq-wrap">
            <div data-w-id="20de4dac-73bc-a15e-c464-46b3f13ecd25" className="af-class-faq-question-2">
              <img src="images/Fichier-7.png" loading="lazy" width={40} alt="" className="af-class-faq-icon" />
              <h5 className="af-class-faq-heading">Why should I invest in Elrond Miners ?</h5>
            </div>
            <div style={{ height: 0 }} className="af-class-faq-answer-2">
              <p className="af-class-body-3 af-class-bottom-margin-30">We are the first NFT collection with such IRL utilities. If you believe that gold is a safe investment, then Elrond Miners is too.</p>
            </div>
          </div>
          <div className="af-class-faq-wrap">
            <div data-w-id="20de4dac-73bc-a15e-c464-46b3f13ecd2d" className="af-class-faq-question-2">
              <img src="images/Fichier-7.png" loading="lazy" width={40} alt="" className="af-class-faq-icon" />
              <h5 className="af-class-faq-heading">How can I recruit miner onto my team ?</h5>
            </div>
            <div style={{ height: 0 }} className="af-class-faq-answer-2">
              <p className="af-class-body-3 af-class-bottom-margin-30">a</p>
            </div>
          </div>
          <div className="af-class-faq-wrap">
            <div data-w-id="20de4dac-73bc-a15e-c464-46b3f13ecd35" className="af-class-faq-question-2">
              <img src="images/Fichier-7.png" loading="lazy" width={40} alt="" className="af-class-faq-icon" />
              <h5 className="af-class-faq-heading">Will our miners really work for us ? How ?</h5>
            </div>
            <div style={{ height: 0 }} className="af-class-faq-answer-2">
              <p className="af-class-body-3 af-class-bottom-margin-30">Yes, they will work hard to make passive income. Mint revenue will be used to farm your rewards.</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* [if lte IE 9]><![endif] */}
    </>
  )

}


/* eslint-enable */