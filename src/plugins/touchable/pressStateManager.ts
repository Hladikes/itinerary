export function handlePressStateChanges(el: HTMLElement, cb: (state: boolean) => any) {
  let _isTouchDevice: boolean = false
  let _isDeviceTypeSet: boolean = false

  const _mouseenter = () => {
    if (_isDeviceTypeSet && _isTouchDevice) return
    _isTouchDevice = false
    _isDeviceTypeSet = true
    cb(true)
  }

  const _mouseleave = () => {
    if (_isDeviceTypeSet && _isTouchDevice) return
    cb(false)
  }

  const _touchstart = () => {
    if (_isDeviceTypeSet && !_isTouchDevice) return
    _isDeviceTypeSet = true
    _isTouchDevice = true
    cb(true)
  }

  const _touchend = () => {
    if (_isDeviceTypeSet && !_isTouchDevice) return
    cb(false)
  }

  el.addEventListener('mouseenter', _mouseenter, { passive: true })
  el.addEventListener('mouseleave', _mouseleave, { passive: true })
  el.addEventListener('touchstart', _touchstart, { passive: true })
  el.addEventListener('touchend', _touchend, { passive: true })

  return () => {
    el.removeEventListener('mouseenter', _mouseenter)
    el.removeEventListener('mouseleave', _mouseenter)
    el.removeEventListener('touchstart', _touchstart)
    el.removeEventListener('touchend', _touchend)
  }
}