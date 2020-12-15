export const debounce = (fn, ms) => {
  let timeout = null
  return function (e) {
    e.persist()
    const context = this
    console.log('context', context)
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.call(context, e)
      // fn(e)
    }, ms)
  }
}

export const throttle = (fn, ms) => {
  let timeout = null
  return (...args) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        fn(...args)
      }, ms)
    }
  }
}
