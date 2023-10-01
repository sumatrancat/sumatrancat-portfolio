import gsap from 'gsap'
import { SplitText } from 'gsap/all'

const rive = require('@rive-app/canvas')
const riveFile = new URL('../rive/sumatrancat.riv', import.meta.url)

const artboardSC = loadArtboard('Sumatrancat', '.artboard-sc')
const artboardDesk = loadArtboard('Desk', '.artboard-desk')
const artboardMusic = loadArtboard('Music', '.artboard-music')
const artboardSocialResume = loadArtboard('SocialResume', '.artboard-social-resume')

function loadArtboard(name, wrapper) {
  if(riveFile) {
    const artboard = new rive.Rive({
      src: riveFile,
      artboard: name,
      stateMachines: 'SM',
      canvas: document.querySelector(wrapper),
      onLoad: e => {
        artboard.resizeDrawingSurfaceToCanvas()
        artboard.play()
      }
    })
    return artboard
  }
}

// gsap.registerPlugin(SplitText)

// const animatedTitle = new SplitText('#home-title', {
//   type: 'chars'
// })
// const tl = gsap.timeline({
//   repeat: -1,
//   yoyo: true
// })

// tl
//   .to('#home-title > div', {
//     y: -15,
//     stagger: .009,
//     ease: 'power2.out'
//   })