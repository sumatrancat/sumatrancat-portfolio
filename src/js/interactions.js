import { wrap } from "gsap"

export function social(inputs) {
  const links = [...document.querySelectorAll('.social-links a')]
  if(links.length > 0) {
    links.forEach(link => {
      const social = link.dataset.social
      const inputHover = inputs[`is${social}Hovered`]

      link.addEventListener('mouseenter', () => {
        inputHover.value = true
      })
  
      link.addEventListener('mouseleave', () => {
        inputHover.value = false
      })
    })
  }
}

export function riveHover(input, selector) {
  const trigger = document.querySelector(selector)
  if(trigger) {
    trigger.addEventListener('mouseenter', () => {
      input.value = true
    })
    trigger.addEventListener('mouseleave', () => {
      input.value = false
    })
  }
}

export function menu() {
  const wrapper = document.querySelector('#menu-wrapper')
  const trigger = document.querySelector('.menu-trigger')
  let menuState = false
  trigger.addEventListener('click', () => {
    menuState = !menuState
    if(menuState) {
      wrapper.classList.add('menu-is-active')
    } else {
      wrapper.classList.remove('menu-is-active')
    }
  })
}