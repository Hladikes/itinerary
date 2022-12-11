export function move(block) {
  function handler() {
    const blockRect = block.getBoundingClientRect()
    const fullOffset = (blockRect.top) / (window.innerHeight - blockRect.height)
    const offset = Math.abs(fullOffset - 0.5)
    const spacing = Math.cos(Math.PI * offset * 2)
    const d = 20

    if (offset >= 0 && offset <= 1) {
      block.style.transform = `translateX(${-(d * spacing + d) + d + d}px)`
    }
  }

  document.addEventListener('scroll', handler)

  return {
    destroy() {
      document.removeEventListener('scroll', handler)
    }
  }
}