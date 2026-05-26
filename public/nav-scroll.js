(function(){
  function init(){
    var n=document.getElementById("main-nav");
    if(!n){setTimeout(init,100);return;}

    var theme=n.closest("[style*='--p-bg']");
    if(theme){
      var bg=getComputedStyle(theme).getPropertyValue("--p-bg").trim();
      if(bg){
        document.documentElement.style.backgroundColor=bg;
        document.body.style.backgroundColor=bg;
      }
    }

    function c(){
      if(window.scrollY>10){
        n.style.backgroundColor="color-mix(in srgb, var(--p-bg) 85%, transparent)";
        n.style.backdropFilter="blur(12px)";
        n.style.webkitBackdropFilter="blur(12px)";
      }else{
        n.style.backgroundColor="transparent";
        n.style.backdropFilter="none";
        n.style.webkitBackdropFilter="none";
      }
    }
    c();
    window.addEventListener("scroll",c,{passive:true});
  }
  if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",init);}else{init();}
})();
