// ==UserScript==
// @name         yt-adb
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const target = document.querySelector('.html5-video-player');
  const btnMute = document.querySelector('.ytp-mute-button');
  const volSlider = document.querySelector('.ytp-volume-slider-handle');

//   console.log(target)

  const config = {
      attributes: true,
    //   childList: true,
    //   subtree: true
  };

  const callback = function(mutationsList, observer) {
      console.log('start')
      for (let mutation of mutationsList) {
          if (mutation.attributeName === 'class') {

            const vol = !!parseInt(volSlider.style.left);

            console.log(vol)

            if (target.classList.contains('ad-showing') && vol) {
                btnMute.click()
                // btnMute.setAttribute('data-mute', true)
            }

            if () {}
          }
      }
  };

  const observer = new MutationObserver(callback);

  observer.observe(target, config);

})();
