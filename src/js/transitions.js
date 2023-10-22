import gsap from 'gsap'
import { CustomEase } from 'gsap/all'

gsap.registerPlugin(CustomEase)

export function work(artboard, inputs) {
  let isMouseMoving = false
  const $ = gsap.utils.selector('#home')
  const rive = document.getElementById('rive')
  const tl = gsap.timeline({
    onStart: () => {
      inputs.isMoving.value = false
    },
    onComplete: () => {
      // inputs.isMoving.value = true
      console.log(isMouseMoving)
      window.addEventListener('mousemove', () => {
        isMouseMoving = true
        if(isMouseMoving) {
          inputs.isMoving.value = true
          return false
        }
      })
    }
  })

  tl
    .set(rive, {
      transformOrigin: 'bottom'
    })
    .to([$('.canvas-wrapper:not(#character)'), $('#home-title')], {
      opacity: 0,
      duration: .5,
      ease: 'power2.out',
      pointerEvents: 'none'
    })
    .to(inputs.translateX, {
      value: 25
    }, .15)
    .to(inputs.translateY, {
      value: 35
    }, '<')
    .to(rive, {
      scale: 1.5,
      y: '65%',
      duration: 1,
      // ease: CustomEase.create('custom', '.85, 0, .15, 1'),
      ease: 'expo.inOut',
      onUpdate: () => {
        artboard.resizeDrawingSurfaceToCanvas()
      }
    }, .15)
}