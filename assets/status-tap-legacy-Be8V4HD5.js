System.register(["./ionic-vendor-legacy-yg-zdVpb.js","./react-vendor-legacy-Col0SQsU.js"],function(e,t){"use strict";var n,r,s,o,i;return{setters:[e=>{n=e.X,r=e.Y,s=e.Z,o=e.$,i=e.a0},null],execute:function(){
/*!
             * (C) Ionic http://ionicframework.com - MIT License
             */
e("startStatusTap",()=>{const e=window;e.addEventListener("statusTap",()=>{n(()=>{const t=e.innerWidth,n=e.innerHeight,a=document.elementFromPoint(t/2,n/2);if(!a)return;const c=r(a);c&&new Promise(e=>s(c,e)).then(()=>{o(async()=>{c.style.setProperty("--overflow","hidden"),await i(c,300),c.style.removeProperty("--overflow")})})})})})}}});
