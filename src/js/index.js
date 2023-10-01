// requirements
import * as animations from './animations'
import * as setup from './setup'
const rive = require('@rive-app/canvas')
const riveFile = new URL('../rive/sumatrancat2.riv', import.meta.url)

// app
class App {
  constructor() {
    this.loaderSetup()

    window.addEventListener('resize', () => {
      setup.loader()
    })
  }

  loaderSetup() {
    setup.loader()
    // setup.rive()
    setup.homeTitle()
  }

  loadArtboards() {
    this.numberOfLoadedArtboards = 0
    this.artboardNames = ['Sumatrancat', 'Desk', 'Music', 'SocialResume']
    this.artboardSelectors = ['sc', 'desk', 'music', 'social-resume']
    this.artboards = {}
    this.artboardNames.forEach((name, i) => {
      this.artboards[name] = new rive.Rive({
        src: riveFile,
        artboard: name,
        stateMachines: 'SM',
        canvas: document.querySelector(`.artboard-${this.artboardSelectors[i]}`),
        onLoad: () => {
          this.artboards[name].resizeDrawingSurfaceToCanvas()
          this.artboards[name].play()
          this.artboardLoaded()
        }
      })       
    })
  }

  artboardLoaded() {
    this.numberOfLoadedArtboards +=1
    if(this.numberOfLoadedArtboards == this.artboardNames.length) {
      this.play()
    }
  }

  play() {
    animations.loader()
    // animations.rive()
    animations.homeTitle()
  }
}

const app = new App()

document.addEventListener('DOMContentLoaded', () => {
  app.loadArtboards()
})