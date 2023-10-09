import gsap from 'gsap'
import { CustomEase } from 'gsap/all'
gsap.registerPlugin(CustomEase)

export function homeTitle() {
  const $ = gsap.utils.selector('#home .content-wrapper')
  CustomEase.create('easeInOutCirc', '.85, 0, .15, 1')

  // light animation
  const tl = gsap.timeline({})
  tl
    .set('use', {
      delay: .3,
      display: 'block'
    })
    .to($('#clip path'), {
      x: 650,
      duration: 1.5,
      ease: 'easeInOutCirc',
      repeat: -1,
      repeatDelay: 1
    })
    .to($('.button'), {
      opacity: 1,
      y: 0,
      pointerEvents: 'auto'
    }, 1)
    .to($('#stars path'), {
      opacity: 1,
      duration: .75,
      stagger: .1,
      ease: 'power2.out'
    }, 1)
  
  gsap.to($('#stagger-text path'), {
    delay: .4,
    opacity: 1,
    y: 0,
    stagger: .035,
    ease: 'power2.out',
    onComplete: () => {
      // gsap.set($('#stagger-text'), {
      //   display: 'none'
      // })
      gsap.set($('#main-text'), {
        display: 'block'
      }) 
    }
  })

  gsap.to('#stars path', {
    rotate: 360,
    duration: 5,
    ease: 'linear',
    repeat: -1
  })

  animateStar('path:first-child', .5)
  animateStar('path:nth-child(2)', 1.75)

  function animateStar(selector, delay) {
    gsap.to($('#stars ' + selector), {
      delay: delay,
      scale: 1,
      repeat: -1,
      repeatDelay: .5,
      yoyo: true,
      duration: 1,
    })
  }
}

export function rive() {
  gsap.to('#rive', {
    delay: .3,
    opacity: 1,
    duration: .6,
    ease: 'power2.out'
  })
}

export function loader() {
  const duration = 1.5
  const $ = gsap.utils.selector('#loader')
  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set('#loader', {
        display: 'none'
      })
    }
  })

  tl
    .to($('#clip-layer-2 circle'), {
      r: () => {
        if(window.innerWidth > window.innerHeight || window.innerWidth == window.innerHeight) {
          return window.innerWidth/2 + 500
        } else {
          return window.innerHeight/2 + 500
        }
      },
      duration: duration,
      ease: 'expo.out'
    })
    .to($('#clip-layer-1 circle'), {
      r: () => {
        if(window.innerWidth > window.innerHeight || window.innerWidth == window.innerHeight) {
          return window.innerWidth/2 + 500
        } else {
          return window.innerHeight/2 + 500
        }
      },
      duration: duration,
      ease: 'expo.out'
    }, .2)
}