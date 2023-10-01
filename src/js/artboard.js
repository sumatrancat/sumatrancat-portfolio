const rive = require('@rive-app/canvas')
const riveFile = new URL('../rive/sumatrancat2.riv', import.meta.url)

export default class Artboard {
  constructor(name, selector) {
    this.artboard = new rive.Rive({
      src: riveFile,
      artboard: name,
      stateMachines: 'SM',
      canvas: document.querySelector(selector),
      onLoad: () => {
        this.isLoaded()
      }
    })

    return this
  }

  isLoaded() {
    console.log('loaded')
  }

  // load() {
  //   this.artboard.resizeDrawingSurfaceToCanvas()
  //   this.artboard.play()
  //   return 1
  // }
}