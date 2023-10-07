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
  
  gsap.to($('#stagger-text path'), {
    delay: .4,
    opacity: 1,
    y: 0,
    stagger: .035,
    ease: 'power2.out',
    onComplete: () => {
      gsap.set($('#stagger-text'), {
        display: 'none'
      })
      gsap.set($('#main-text'), {
        display: 'block'
      })
    }
  })

  // gsap.to($('#stars path:first-child'), {
  //   scale: 1,
  //   rotate: 0,
  //   repeat: -1,
  //   repeatDelay: 1,
  //   onComplete: () => {
  //     gsap.to($('#home-title #stars path:first-child'), {
  //       scale: 0
  //     })
  //   }
  // })
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
  const duration = 1.25
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