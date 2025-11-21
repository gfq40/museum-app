System.register(["./ionic-vendor-legacy-DQaOJSvl.js","./react-vendor-legacy-C-kG-Wxm.js"],function(e,t){"use strict";var n,r,o;return{setters:[e=>{n=e.a0,r=e.a1,o=e.a2},null],execute:function(){
/*!
             * (C) Ionic http://ionicframework.com - MIT License
             */
e("createSwipeBackGesture",(e,t,a,c,i)=>{const s=e.ownerDocument.defaultView;let l=n(e);const u=e=>l?-e.deltaX:e.deltaX;return r({el:e,gestureName:"goback-swipe",gesturePriority:101,threshold:10,canStart:r=>(l=n(e),(e=>{const{startX:t}=e;return l?t>=s.innerWidth-50:t<=50})(r)&&t()),onStart:a,onMove:e=>{const t=u(e)/s.innerWidth;c(t)},onEnd:e=>{const t=u(e),n=s.innerWidth,r=t/n,a=(e=>l?-e.velocityX:e.velocityX)(e),c=a>=0&&(a>.2||t>n/2),d=(c?1-r:r)*n;let h=0;if(d>5){const e=d/Math.abs(a);h=Math.min(e,540)}i(c,r<=0?.01:o(0,r,.9999),h)}})})}}});
