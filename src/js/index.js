// requirements
import gsap from 'gsap'
import * as setup from './setup'
import * as interactions from './interactions'
import * as animations from './animations'
import mouse from './mouse'
const rive = require('@rive-app/canvas')
const riveFile = new URL('../rive/sumatrancat.riv', import.meta.url)

console.log(rive)

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
    interactions.menu()
  }

  loadArtboards() {
    this.numberOfLoadedArtboards = 0
    this.artboardNames = ['Sumatrancat', 'Desk', 'Music', 'SocialResume']
    this.artboardSelectors = ['sc', 'desk', 'music', 'social-resume']
    this.userInputs = {
      'Sumatrancat': ['isLoaded', 'translateX', 'translateY', 'isUpMore', 'isMoving', 'isBounce', 
        'mouthType', 'isMouthUwuFlipped', 'handType'],
      'Desk': ['isLoaded', 'isReady', 'isMonitorHovered'],
      'Music': ['isLoaded', 'isReady', 'isAudioActive', 'isGuitarHovered'],
      'SocialResume': ['isLoaded', 'isTwitterHovered', 'isYoutubeHovered', 'isGithubHovered', 'isResumeHovered']
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
      this.events()
    }
  }

  play() {
    animations.loader()
    animations.homeTitle()

    // repeat through user inputs and assign them to the artboard inputs object
    Object.keys(this.userInputs).forEach(objectName => {
      this.artboardInputs[objectName] = this.artboards[objectName].stateMachineInputs('SM')
      this.userInputs[objectName].forEach(input => {
        this.artboardInputs[objectName][input] = this.artboardInputs[objectName].find(i => i.name === input)
      })
    })

    interactions.social(this.artboardInputs.SocialResume)
    // interactions.riveBHover(this.artboardInputs.Music.isGuitarHovered, '#guitar-trigger')
    interactions.riveBHover([
      this.artboardInputs.SocialResume.isResumeHovered,
      this.artboardInputs.Sumatrancat.isBounce
    ], '#resume-trigger')
    interactions.riveBHover([
      this.artboardInputs.Desk.isMonitorHovered,
      this.artboardInputs.Sumatrancat.isBounce
    ], '#work-trigger')

    console.log(this.artboardInputs.Sumatrancat)

    interactions.riveNHover(this.artboardInputs.Sumatrancat.mouthType, 1, 0, '#resume-trigger')
    interactions.riveNHover(this.artboardInputs.Sumatrancat.handType, 2, 0, '#resume-trigger')
    interactions.riveNHover(this.artboardInputs.Sumatrancat.mouthType, 3, 0, '#work-trigger')
    interactions.riveNHover(this.artboardInputs.Sumatrancat.handType, 1, 0, '#work-trigger')

    interactions.header(this.artboards, this.artboardInputs)

    this.mouse = new mouse(this.artboardInputs.Sumatrancat)

    gsap.delayedCall(.2, () => {
      this.artboardInputs.Music.isLoaded.value = true
    })

    gsap.delayedCall(.3, () => {
      this.artboardInputs.Sumatrancat.isLoaded.value = true
      this.artboardInputs.SocialResume.isLoaded.value = true
      this.artboardInputs.Desk.isLoaded.value = true
    })
  }

  events() {
    this.artboards.Sumatrancat.on(rive.EventType.RiveEvent, e => {
      const data = e.data
      if(data.name == 'bounceComplete') {
        this.artboardInputs.Sumatrancat.isBounce.value = false
      }
    })

    this.artboards.Desk.on(rive.EventType.RiveEvent, e => {
      const data = e.data
      if(data.name == 'introComplete') {
        this.artboardInputs.Desk.isReady.value = true
      }
    })

    this.artboards.Music.on(rive.EventType.RiveEvent, e => {
      const data = e.data
      switch(data.name) {
        case 'introComplete':
          this.artboardInputs.Music.isReady.value = true
          break
        case 'guitarEnter':
          this.artboardInputs.Sumatrancat.isBounce.value = true
          this.artboardInputs.Sumatrancat.mouthType.value = 1
          break
        case 'guitarLeave':
          this.artboardInputs.Sumatrancat.mouthType.value = 0
          break
      }
    })
  }
}

const app = new App()

document.addEventListener('DOMContentLoaded', () => {
  // load all artboards when DOM is loaded
  app.loadArtboards()
})