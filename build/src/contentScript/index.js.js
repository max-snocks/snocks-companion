chrome.runtime.onMessage.addListener((obj, _, sendResponse) => {
  const themeId = document.querySelector('[data-theme-instance-id]')?.dataset?.themeInstanceId;
  const BASE_URL = window.location.origin;
  const path = window.location.pathname;

  switch (obj.type) {
    case 'THEME':
      sendResponse(themeId);
      break;
    case 'PREVIEW':
      sendResponse({ path: BASE_URL + path, themeId });
      break;
    case 'EDIT':
      const pageTypes = ['products', 'collections', 'pages', 'blogs', 'articles'];
      const editType = pageTypes.find(type => path.includes(type)) || 'pages';
      const id = document.querySelector('#__st')?.innerText?.split('rid":')[1]?.split('}')[0];
      if (!id) {
        sendResponse({ title: 'Error', description: 'Could not find the ID of the current page.' });
        return;
      }
      sendResponse({ path: BASE_URL, type: editType, id });
      break;
    case 'CUSTOMIZER':
      sendResponse({ themeId, path });
      break;
    case 'CLEAR':
      fetch(`${BASE_URL}/cart/clear.js`, { method: 'POST' })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          sendResponse({ title: 'Cart cleared', description: 'All items have been removed from the cart.' });
        })
        .catch(error => {
          sendResponse({ title: 'Error', description: 'An error occurred while trying to clear the cart.' });
        });
      break;
    case 'MOUNT':
      const typeMap = {
        products: 'Product',
        collections: 'Collection',
        pages: 'Page',
        blogs: 'Blog',
        articles: 'Article'
      };
      const type = path.split('/')[1] || 'pages';
      const text = typeMap[type] || 'Page';
      sendResponse({ type: text, urlMatches: BASE_URL.includes('snocks.com') || BASE_URL.includes('snockssocks.myshopify.com') });
      break;
    default:
      sendResponse();
  }
  return true;
});
