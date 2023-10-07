import gsap from 'gsap'

export function loader() {
  const $ = gsap.utils.selector('#loader')
  const tl = gsap.timeline()
  tl
    .set($('#loader-svg circle'), {
      cx: () => window.innerWidth/2,
      cy: () => window.innerHeight/1
    })
}

export function rive() {
  gsap.set('#rive', {
    opacity: 0
  })
}

export function homeTitle() {
  const tl = gsap.timeline()
  const $ = gsap.utils.selector('#home-title')
  tl
    .set($('#main-text'), {
      display: 'none'
    })
    .set('use', {
      display: 'none'
    })
    .set('#stagger-text path', {
      y: 25,
      opacity: 0
    })
    .set('#stars path', {
      scale: 0,
      rotate: 360,
      transformOrigin: 'center center'
    })
}