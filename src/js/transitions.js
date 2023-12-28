import gsap from 'gsap'
import { CustomEase } from 'gsap/all'

gsap.registerPlugin(CustomEase)

export function work(artboards, inputs) {
  let isMouseMoving = false
  const $ = gsap.utils.selector('#home')
  const rive = document.getElementById('rive')
  const menuWrapper = document.getElementById('menu-wrapper')

  const tl = gsap.timeline({
    onStart: () => {
      gsap.set([$('.canvas-wrapper:not(#character)'), $('#home-title')], {
        pointerEvents: 'none'
      })

      // we need a slight delay so the mouthType change won't overlap
      gsap.delayedCall(.001, () => {
        inputs.Sumatrancat.mouthType.value = 2
        inputs.Sumatrancat.handType.value = 3
      })

      inputs.Sumatrancat.isMoving.value = false
      menuWrapper.classList.remove('menu-is-active')

    },
    onComplete: () => {
      window.addEventListener('mousemove', () => {
        isMouseMoving = true
        if(isMouseMoving) {
          inputs.Sumatrancat.isMoving.value = true
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
      onComplete: function(e) {
        // stop all animations except SC to improve performance during zoom animation
        Object.keys(artboards).forEach(objectName => {
          if(objectName !== 'Sumatrancat') {
            artboards[objectName].stop()
          }
        })
      }
    })
    .to(inputs.Sumatrancat.translateX, {
      onStart: () => {
        inputs.Sumatrancat.isUpMore.value = true
      },
      value: 25,
      duration: .3
    }, .15)
    .to(inputs.Sumatrancat.translateY, {
      value: 25,
      duration: .3
    }, '<')
    .to(rive, {
      scale: 1.5,
      y: '60%',
      z: 0,
      duration: 1,
      ease: 'expo.inOut',
      // onUpdate: () => {
      onComplete: () => {
        artboards.Sumatrancat.resizeDrawingSurfaceToCanvas()
      }
    }, '-=.15')
}