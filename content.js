// content.js
window.addEventListener('load', () => {
  const observer = new MutationObsever(() => {
    const videoItems = document.querySelectorAll('ytd-playlist-video-renderer:not(.checkbox-injected)');

    videoItems.forEach((item) => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'select-video-checkbox';
      item.insertAdjacentElement('afterbegin', checkbox);
      item.classList.add('checkbox-injected');
    });
  });

  observer.observe(document, { childList: true, subtree: true });
});

const selectedVideos = new Set();

document.addEventListener('change', (event) => {
  if (event.target.classList.contains('select-video-checkbox')) {
    const videoId = event.target.closest('ytd-playlist-video-renderer').dataset.videoId;
    if (event.target.checked) {
      selectedVideos.add(videoId);
    } else {
      selectedVideos.delete(videoId);
    }
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSelectedVideos') {
    sendResponse(Array.from(selectedVideos));
  }
});
