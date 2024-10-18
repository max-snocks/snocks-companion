import { copyToClipboard, successButton } from './utils'

export const openAdmin = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'THEME' }, (response) => {
      window.open(`https://admin.shopify.com/store/snockssocks/themes/${parseInt(response)}`)
    })
  })
}

export const openCreateDiscount = () => {
  window.open(`https://admin.shopify.com/store/snockssocks/discounts/new`)
}

export const copyPreviewLink = (event) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'PREVIEW' }, (response) => {
      const previewLink = `${response.path}?preview_theme_id=${parseInt(response.themeId)}`
      copyToClipboard(previewLink)
      successButton(event.target, 'Preview Link copied!', 'You can now paste the link anywhere.')
    })
  })
}

export const editInAdmin = event => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0]?.id, { type: 'EDIT' }, (response) => {
      if (response?.id) {
        window.open(
          `https://admin.shopify.com/store/snockssocks/${response?.type || 'pages'}/${response?.id}`,
          '_blank',
        )
      } else {
        successButton(event.target, response.title, response.description)
      }
    })
  })
}

export const editInCustomizer = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0]?.id, { type: 'CUSTOMIZER' }, (response) => {
      const customizerLink = `https://admin.shopify.com/store/snockssocks/themes/${parseInt(response.themeId)}/editor`
      const viewUrl =
        response.path === '/' ? '#/' : '/?previewPath=' + encodeURIComponent(response.path)

      return window.open(customizerLink + viewUrl, '_blank')
    })
  })
}

export const clearCart = (event) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0]?.id, { type: 'CLEAR' }, (response) => {
      if (!response) return
      successButton(event.target, response.title, response.description)
    })
  })
}
