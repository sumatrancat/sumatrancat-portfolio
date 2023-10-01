import gsap from 'gsap'
// import { SplitText } from 'gsap/all'

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

const tl = gsap.timeline({
  repeatDelay: 1,
  repeat: -1
})
const $ = gsap.utils.selector('#home-title')

const yo = $('#clip path')

tl
  .to($('#clip path'), {
    x: 650,
    duration: 1,
    ease: 'power4.out'
  })