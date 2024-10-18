import * as icons from './icons'

export const successButton = (target, title, description) => {
  const element = target.closest('button')
  const originalHtml = element.innerHTML
  const svgHtml = title.toLowerCase().includes('error') ? icons.error : icons.checkmark

  element.querySelector('h4').innerHTML = `${svgHtml} ${title}`
  element.querySelector('span').innerHTML = description
  setTimeout(() => {
    element.innerHTML = originalHtml
  }, 2000)
}

export const copyToClipboard = (str) => {
  const el = document.createElement('textarea')
  el.value = str
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}
