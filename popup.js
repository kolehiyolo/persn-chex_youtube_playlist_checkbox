// popup.js
document.getElementById('move-to-playlist').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getSelectedVideos' }, (response) => {
      chrome.runtime.sendMessage({ action: 'moveToPlaylist', videoIds: response }, (res) => {
        console.log('Move to Playlist Response:', res);
      });
    });
  });
});

document.getElementById('remove-from-watch-later').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getSelectedVideos' }, (response) => {
      chrome.runtime.sendMessage({ action: 'removeFromWatchLater', videoIds: response }, (res) => {
        console.log('Remove from Watch Later Response:', res);
      });
    });
  });
});
