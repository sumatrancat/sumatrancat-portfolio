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