import React from 'react';

export default function () {
    return <>
        <div className="af-class-separator">
            <div className="af-class-divseparatorleft" />
            <div className="af-class-divseparatorcenter" />
            <div className="af-class-divseparatorright" />
        </div>
        <div className="af-class-section">
            <div className="row div-footer">
                <div className=" col-md-3 col-12 pb-3 d-flex align-items-center" >
                    <img src="images/v2.png" loading="lazy" id="footer-img" srcSet="images/v2-p-500.png 500w, images/v2-p-800.png 800w, images/v2-p-1080.png 1080w, images/v2-p-1600.png 1600w, images/v2-p-2000.png 2000w, images/v2-p-2600.png 2600w, images/v2-p-3200.png 3200w, images/v2.png 5967w" />
                </div>
                <div id="footer-link" className="af-class-div-block-31 col-12 col-md-6 pb-3">
                    <div className="af-class-div-block-32">
                        <a href="#Home" className="af-class-linkfooter">Home</a>
                        <a href="#About" className="af-class-linkfooter">About</a>
                        <a href="#Team" className="af-class-linkfooter">Team</a>
                        <a href="#Faq" className="af-class-linkfooter">Faq</a>
                    </div>
                    <div className="af-class-div-block-33">
                        <a href="#" className="af-class-linkfooter">Play Now</a>
                        <a href="/explore" target="_blank" className="af-class-linkfooter">Explore the Mine</a>
                    </div>
                </div>
                <div className="af-class-div-block-28 col-md-3 col-12">
                    <div className="af-class-div-block-30">
                        <p>Find us on social networks !</p>
                    </div>
                    <div className="af-class-div-block-29">
                        <a href="https://twitter.com/elrond_miners" target="" className="af-class-link-block-2 w-inline-block"><img src="images/twitter_1.png" loading="lazy" srcSet="images/twitter_1-p-500.png 500w, images/twitter_1.png 512w" sizes="50px" /></a>
                        <a href="https://discord.gg/MrBcfZhYwy" target="" className="af-class-link-block-3 w-inline-block"><img src="images/discord.png" loading="lazy" srcSet="images/discord-p-500.png 500w, images/discord.png 512w" sizes="50px" /></a>
                    </div>
                </div>
            </div>
            <div className="af-class-text-block-2">Made with ❤️ by Elrond Miners.<br />Copyright ©2022. All rights reserved Elrond Miners.</div>
        </div>
    </>
}