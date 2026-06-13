/* barba-init.js — jediný barba.init() pre celý web.
   Každá stránka si zachováva svoje page-specific funkcie (initHeroAnimation,
   initHomepage) ako inline skripty. nav-transitions.js (IIFE) sa stará
   o syncNav, revealAll, bindHover, initHamburger, resetCurtain po každej tranzícii. */

if (window.location.protocol !== 'file:') {
  barba.init({

    /* E-shop sa vykresľuje JS-om — potrebuje plné načítanie, nie barba swap.
       Stránky navigujú NA e-shop full-page reload, z e-shopu preč cez barbu normálne. */
    prevent: function (data) {
      return data.href && data.href.indexOf('eshop') !== -1;
    },

    transitions: [{
      name: 'botanical-curtain',

      leave: function (data) {
        document.documentElement.classList.add('is-transitioning');
        return new Promise(function (resolve) {
          gsap.timeline({ onComplete: resolve })
            .to(data.current.container, {
              opacity: 0,
              y: -12,
              duration: 0.3,
              ease: 'power2.in'
            })
            .to('#pageCurtain', {
              scaleY: 1,
              duration: 0.5,
              ease: 'power3.inOut',
              transformOrigin: 'bottom center'
            }, '-=0.15');
        });
      },

      enter: function (data) {
        window.scrollTo(0, 0);
        return new Promise(function (resolve) {
          gsap.timeline({ onComplete: resolve })
            .to('#pageCurtain', {
              scaleY: 0,
              duration: 0.55,
              ease: 'power3.inOut',
              transformOrigin: 'top center'
            })
            .from(data.next.container, {
              opacity: 0,
              y: 12,
              duration: 0.4,
              ease: 'power2.out'
            }, '-=0.25');
        });
      },

      after: function () {
        document.documentElement.classList.remove('is-transitioning');
      }
    }],

    views: [
      {
        namespace: 'home',
        afterEnter: function () {
          if (typeof initHomepage === 'function') initHomepage();
          if (typeof initHeroAnimation === 'function') initHeroAnimation();
        }
      },
      {
        namespace: 'soltesova',
        afterEnter: function () {
          if (typeof initHeroAnimation === 'function') initHeroAnimation();
        }
      },
      {
        namespace: 'timrava',
        afterEnter: function () {
          if (typeof initHeroAnimation === 'function') initHeroAnimation();
        }
      },
      {
        namespace: 'vansova',
        afterEnter: function () {
          if (typeof initHeroAnimation === 'function') initHeroAnimation();
        }
      }
    ]

  });
}
