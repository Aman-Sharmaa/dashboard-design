(function(jQuery) {
  "use strict";
  document.addEventListener('DOMContentLoaded', (event) => {
    if(typeof gsap !== typeof undefined) {

      var t1 = gsap.timeline({repeat: -1});
      
      t1.set("#error-4004", {TransformOrigin: "24% 24%"});
      t1.from("#error-4004", {duration:3, rotate: -360});

      // confirm mail animation

      const mail = gsap.timeline()
      // mail.set("#Tick-1, #Tick-2, #Tick-3, #Tick-4", {TransformOrigin: "24% 24%"});
      mail.to("#Tick-1, #Tick-2, #Tick-3", {duration:1.5, y: 80, repeat: -1, yoyo: true});
      mail.to("#Tick-4", {duration:1.5, y: 80, repeat: -1, yoyo: true});

      //error 500
      var t2 = gsap.timeline({repeat: -1});

      t2.set("#Tick-11", {TransformOrigin: "24% 24%"});
      t2.to("#Tick-12, #Tick-13, #Tick-14", {duration:1.5, y: 80, repeat: -1, yoyo: true});
      t2.from("#Tick-11 ", {duration:5, rotate:-360, repeat: -1});
    } 
  })
})(jQuery);
