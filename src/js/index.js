// requirements
import gsap from 'gsap'
import * as animations from './animations'
import * as setup from './setup'
import mouse from './mouse'
const rive = require('@rive-app/canvas')
const riveFile = new URL('../rive/sumatrancat.riv', import.meta.url)

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
    this.userInputs = {
      'Sumatrancat': ['translateX', 'translateY', 'isMouthUwuFlipped'],
      'Desk': ['isLoaded'],
      'Music': ['isLoaded', 'isAudioActive'],
      'SocialResume': ['isLoaded', 'isTwitterHovered']
    }
    this.artboards = {}
    this.artboardInputs = {}

    this.artboardNames.forEach((name, i) => {
      // insert blank object to inputs object
      this.artboardInputs[name] = {}
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

    // repeat through user inputs and assign them to the artboard inputs object
    Object.keys(this.userInputs).forEach(key => {
      const objectName = key
      this.artboardInputs[objectName] = this.artboards[objectName].stateMachineInputs('SM')
      this.userInputs[objectName].forEach(input => {
        this.artboardInputs[objectName][input] = this.artboardInputs[objectName].find(i => i.name === input)
      })
    })

    this.mouse = new mouse(this.artboardInputs.Sumatrancat)

    gsap.delayedCall(.2, () => {
      this.artboardInputs.Music.isLoaded.value = true
    })

    gsap.delayedCall(.3, () => {
      this.artboardInputs.SocialResume.isLoaded.value = true
      this.artboardInputs.Desk.isLoaded.value = true
    })

    gsap.delayedCall(.6, () => {
      this.artboardInputs.Music.isAudioActive.value = true
    })

    console.log(this.artboardInputs.SocialResume)

    const twitter = document.querySelector('[data-social="twitter"]')
    twitter.addEventListener('mouseenter', () => {
      this.artboardInputs.SocialResume.isTwitterHovered.value = true
    })

    twitter.addEventListener('mouseleave', () => {
      this.artboardInputs.SocialResume.isTwitterHovered.value = false
    })

  }
}

const app = new App()

document.addEventListener('DOMContentLoaded', () => {
  // load all artboards when DOM is loaded
  app.loadArtboards()
})