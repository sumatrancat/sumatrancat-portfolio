import * as transitions from "./transitions"

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

// number hover
export function riveNHover(input, newNumber, oldNumber, selector) {
  const trigger = document.querySelector(selector)
  if(trigger) {
    trigger.addEventListener('mouseenter', () => {
      console.log('hover')
      input.value = newNumber
    })
    trigger.addEventListener('mouseleave', () => {
      console.log('no hover')
      input.value = oldNumber
    })
  }
}

// boolean hover
export function riveBHover(input, selector) {
  const trigger = document.querySelector(selector)
  if(trigger) {
    trigger.addEventListener('mouseenter', () => {
      if(Array.isArray(input)) {
        input.forEach(item => {
          item.value = true
        })
      } else {
        input.value = true
      }
    })
    trigger.addEventListener('mouseleave', () => {
      if(Array.isArray(input)) {
        input.forEach(item => {
          item.value = false
        })
      } else {
      input.value = false
      }
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

export function header(artboards, inputs) {
  const workTriggers = [...document.querySelectorAll('[data-to="Work"]')]
  if(workTriggers.length > 0) {
    workTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        transitions.work(artboards, inputs)
      })
    })
  }
}