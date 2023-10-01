import gsap from 'gsap'

export function loader() {
  const $ = gsap.utils.selector('#loader')
  const tl = gsap.timeline()
  tl
    .set($('#loader-svg circle'), {
      cx: () => window.innerWidth/2,
      cy: () => window.innerHeight
    })
}

export function rive() {
  gsap.set('#rive', {
    opacity: 0
  })
}

export function homeTitle() {
  const tl = gsap.timeline()
  tl
    .set('#home-title', {
      opacity: 0,
      y: 30
    })
    .set('#home-title #stars path', {
      scale: 0,
      rotate: 360,
      transformOrigin: 'center center'
    })
}