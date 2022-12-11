export function move(block) {
  function handler() {
    const blockRect = block.getBoundingClientRect()
    const fullOffset = (blockRect.top) / (window.innerHeight - blockRect.height)
    const offset = Math.abs(fullOffset - 0.5)

    if (offset >= 0 && offset <= 1) {
      // block.style.transform = `translateX(${-(d * spacing + d) + d + d}px)`
      block.style.opacity = 1 - (offset * 2)
    }
  }

  document.addEventListener('scroll', handler)

  return {
    destroy() {
      document.removeEventListener('scroll', handler)
    }
  }
}