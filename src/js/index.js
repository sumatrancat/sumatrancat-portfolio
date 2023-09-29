const rive = require('@rive-app/canvas')
const riveFile = new URL('../rive/sumatrancat.riv', import.meta.url)

const artboardSC = loadArtboard('Sumatrancat', '.ab-sc')
const artboardDesk = loadArtboard('Desk', '.ab-desk')
const artboardMusic = loadArtboard('Music', '.ab-music')
const artboardSocialResume = loadArtboard('SocialResume', '.ab-social-resume')

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