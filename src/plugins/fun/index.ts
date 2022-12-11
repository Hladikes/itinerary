function calculateOffset(el: HTMLElement) {
  const blockRect = el.getBoundingClientRect()
  const fullOffset = (blockRect.top) / (window.innerHeight - blockRect.height)
  const offset = Math.abs(fullOffset - 0.5)

  return offset
}

export function move(block) {
  function handler() {
    const offset = calculateOffset(block)

    if (offset >= 0 && offset <= 1) {
      block.style.opacity = 1 - (offset * 2.5)
    }
  }

  document.addEventListener('scroll', handler)

  return {
    destroy() {
      document.removeEventListener('scroll', handler)
    }
  }
}

export function scale(block) {
  function handler() {
    const offset = Math.abs(document.body.getBoundingClientRect().top) / 300
    const scale = 1 - offset
    block.style.transform = `scale(${scale < 0 ? 0 : scale})`
  }

  document.addEventListener('scroll', handler)

  return {
    destroy() {
      document.removeEventListener('scroll', handler)
    }
  }
}