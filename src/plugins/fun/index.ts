export function move(block) {
  function handler() {
    const blockRect = block.getBoundingClientRect()
    const fullOffset = (blockRect.top) / (window.innerHeight - blockRect.height)
    const offset = Math.abs(fullOffset - 0.5)

    if (offset >= 0 && offset <= 1) {
      block.style.opacity = 1 - offset
    }
  }

  document.addEventListener('scroll', handler)

  return {
    destroy() {
      document.removeEventListener('scroll', handler)
    }
  }
}