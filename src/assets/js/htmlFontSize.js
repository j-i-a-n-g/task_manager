const MAX_FONT_SIZE = 42

document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
  // 定义根元素（HTML）fontSize 的大小 （rem)
  html.style.fontSize = fontSize + 'px'
})
