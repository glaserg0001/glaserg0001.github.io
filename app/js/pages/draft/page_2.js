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

  let target = document.querySelector('.html5-video-player');

  const config = {
      attributes: true,
      childList: true,
      subtree: true
  };

  const callback = function(mutationsList, observer) {
      for (let mutation of mutationsList) {
          if (mutation.attributeName === 'class') {
            if (target.classList.contains('ad-showing')) {
                console.log('wwwwwwww')
            }
          }
      }
  };

  const observer = new MutationObserver(callback);

  observer.observe(target, config);

})();
