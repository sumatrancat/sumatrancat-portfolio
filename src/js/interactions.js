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

export function resume(input) {
  const trigger = document.querySelector('#resume-trigger')
  if(trigger) {
    trigger.addEventListener('mouseenter', () => {
      input.value = true
    })
    trigger.addEventListener('mouseleave', () => {
      input.value = false
    })
  }
}