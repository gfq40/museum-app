System.register(["./ionic-vendor-legacy-DGQmYh3I.js","./react-vendor-legacy-iaCydbcM.js"],function(e,t){"use strict";var n,r,s,o,a;return{setters:[e=>{n=e.ab,r=e.ac,s=e.ad,o=e.ae,a=e.af},null],execute:function(){
/*!
             * (C) Ionic http://ionicframework.com - MIT License
             */
e("startStatusTap",()=>{const e=window;e.addEventListener("statusTap",()=>{n(()=>{const t=e.innerWidth,n=e.innerHeight,i=document.elementFromPoint(t/2,n/2);if(!i)return;const c=r(i);c&&new Promise(e=>s(c,e)).then(()=>{o(async()=>{c.style.setProperty("--overflow","hidden"),await a(c,300),c.style.removeProperty("--overflow")})})})})})}}});
