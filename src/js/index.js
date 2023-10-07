// requirements
import gsap from 'gsap'
import * as animations from './animations'
import * as setup from './setup'
const rive = require('@rive-app/canvas')
const riveFile = new URL('../rive/sumatrancat10.riv', import.meta.url)

// app
class App {
  constructor() {
    this.setup()

    window.addEventListener('resize', () => {
      setup.loader()
    })
  }

  setup() {
    setup.loader()
    setup.homeTitle()
  }

  loadArtboards() {
    this.numberOfLoadedArtboards = 0
    this.artboardNames = ['Sumatrancat', 'Desk', 'Music', 'SocialResume']
    this.artboardSelectors = ['sc', 'desk', 'music', 'social-resume']
    this.inputs = {}
    this.artboards = {}
    this.artboardNames.forEach((name, i) => {
      // insert blank object to inputs object
      this.inputs[name] = {}
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
    animations.homeTitle()

    this.inputs.Music = this.artboards.Music.stateMachineInputs('SM')
    this.inputs.Music.onLoaded = this.inputs.Music.find((i) => i.name === 'isLoaded')
    this.inputs.SocialResume = this.artboards.SocialResume.stateMachineInputs('SM')
    this.inputs.SocialResume.onLoaded = this.inputs.SocialResume.find((i) => i.name === 'isLoaded')

    gsap.delayedCall(.3, () => {
      this.inputs.Music.onLoaded.value = true
      this.inputs.SocialResume.onLoaded.value = true
    })
  }
}

const app = new App()

document.addEventListener('DOMContentLoaded', () => {
  app.loadArtboards()
})