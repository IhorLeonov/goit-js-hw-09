const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),d=document.querySelector("body");function o(){return t.disabled?e.disabled?void 0:(e.disabled=!0,void(t.disabled=!1)):(t.disabled=!0,void(e.disabled=!1))}t.addEventListener("click",(function(){timerId=setInterval((()=>{const t=`#${Math.floor(16777215*Math.random()).toString(16)}`;d.style.backgroundColor=t}),1e3),o()})),e.addEventListener("click",(function(){clearInterval(timerId),o()}));
//# sourceMappingURL=01-color-switcher.8f2fd3fa.js.map