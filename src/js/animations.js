import gsap from 'gsap'

export function homeTitle() {
  const $ = gsap.utils.selector('#home .content-wrapper')

  // light animation
  gsap.to($('#clip path'), {
    x: 650,
    duration: 1.5,
    ease: 'power4.out',
    repeat: -1,
    repeatDelay: 1
  })
  
  gsap.to($('#home-title'), {
    delay: .5,
    opacity: 1,
    y: 0
  })

  gsap.to($('#home-title #stars path:first-child'), {
    scale: 1,
    rotate: 0,
    repeat: -1,
    repeatDelay: 1,
    onComplete: () => {
      gsap.to($('#home-title #stars path:first-child'), {
        scale: 0
      })
    }
  })
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
      duration: .6,
      ease: 'power2.out'
    })
    .to($('#clip-layer-1 circle'), {
      r: () => {
        if(window.innerWidth > window.innerHeight || window.innerWidth == window.innerHeight) {
          return window.innerWidth/2 + 500
        } else {
          return window.innerHeight/2 + 500
        }
      },
      duration: .6,
      ease: 'power2.out'
    }, .15)
}