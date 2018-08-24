// (function(psdw){
//     var dpr=0 , rem=0 , scale=0;
//     var htmlDOM=document.documentElement;
//     dpr=window.devicePixelRatio;
//     var currentWidth=htmlDOM.clientWidth;
//     scale=currentWidth/psdw;
//     rem=psdw/10;
//     rem=rem*scale;
//     htmlDOM.style.fontSize=rem+'px';
//     htmlDOM.setAttribute('data-dpr',dpr)
//   })(750)
var winSize = (function (doc, win) {
  var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      clientWidth,
      recalc = function () {
          clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          if (!doc.addEventListener) return;
          if (clientWidth < 750) {
              docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
          }
          else {
              docEl.style.fontSize = 100 + 'px';

          }
      };
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
}(document, window));