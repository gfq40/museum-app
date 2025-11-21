System.register(["./ionic-vendor-legacy-DQaOJSvl.js","./react-vendor-legacy-C-kG-Wxm.js"],function(e,t){"use strict";var n,r,s,o,a;return{setters:[e=>{n=e.a5,r=e.a6,s=e.a7,o=e.a8,a=e.a9},null],execute:function(){
/*!
             * (C) Ionic http://ionicframework.com - MIT License
             */
e("startStatusTap",()=>{const e=window;e.addEventListener("statusTap",()=>{n(()=>{const t=e.innerWidth,n=e.innerHeight,i=document.elementFromPoint(t/2,n/2);if(!i)return;const c=r(i);c&&new Promise(e=>s(c,e)).then(()=>{o(async()=>{c.style.setProperty("--overflow","hidden"),await a(c,300),c.style.removeProperty("--overflow")})})})})})}}});
