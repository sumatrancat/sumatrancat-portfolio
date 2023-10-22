import gsap from 'gsap'
import { CustomEase } from 'gsap/all'

gsap.registerPlugin(CustomEase)

export function work(artboard, inputs) {
  const $ = gsap.utils.selector('#rive')
  const rive = document.getElementById('rive')
  const tl = gsap.timeline({})

  inputs.isMoving.value = false

  tl
    .set(rive, {
      transformOrigin: 'bottom'
    })
    .to($('.canvas-wrapper:not(#character)'), {
      opacity: 0,
      duration: .5,
      ease: 'power2.out',
      pointerEvents: 'none'
    })
    .to(inputs.translateX, {
      value: 25
    }, .15)
    .to(inputs.translateY, {
      value: 50
    }, '<')
    .to(rive, {
      onStart: () => {
        inputs.isZoom.value = true
      },
      y: 0,
      duration: 1,
      ease: 'expo.out',
      // ease: CustomEase.create('custom', '.85, 0, .15, 1'),
      onUpdate: () => {
        // keep graphics sharp
        artboard.resizeDrawingSurfaceToCanvas()
      }
    }, .35)
}