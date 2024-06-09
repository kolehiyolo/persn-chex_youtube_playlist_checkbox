// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log('YouTube Watch Later Organizer installed');
});

chrome.identity.getAuthToken({ interactive: true }, (token) => {
  console.log('Token:', token);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'moveToPlaylist' || request.action === 'removeFromWatchLater') {
    handleApiRequest(request.action, request.videoIds, sendResponse);
  }
  return true;
});

function handleApiRequest(action, videoIds, sendResponse) {
  chrome.identity.getAuthToken({ interactive: true }, (token) => {
    videoIds.forEach(videoId => {
      const url = action === 'moveToPlaylist'
        ? `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet`
        : `https://www.googleapis.com/youtube/v3/playlistItems?id=${videoId}`;
      const method = action === 'moveToPlaylist' ? 'POST' : 'DELETE';
      const headers = new Headers({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      fetch(url, {
        method: method,
        headers: headers,
        body: action === 'moveToPlaylist' ? JSON.stringify({ snippet: { playlistId: 'NEW_PLAYLIST_ID', resourceId: { kind: 'youtube#video', videoId: videoId } } }) : null
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        sendResponse({ status: 'success', data: data });
      })
      .catch(error => {
        console.error(error);
        sendResponse({ status: 'error', error: error });
      });
    });
  });
}
