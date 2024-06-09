// background.js
// ?
chrome.runtime.onInstalled.addListener(
  () => {
    console.log('YouTube Watch Later Organizer installed');
  }
);

// ?
chrome.identity.getAuthToken(
  { interactive: true }, (token) => {
    console.log('Token:', token);
  }
);

// ?
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (
      request.action === 'moveToPlaylist'
      || request.action === 'removeFromWatchLater'
    ) {
      handleApiRequest(request.action, request.videoIds, sendResponse);
    }
    return true;
  }
);

// ?
function handleApiRequest(action, videoIds, sendResponse) {
  // Authenticate token for YouTube API Use
  chrome.identity.getAuthToken(
    { interactive: true }, (token) => {
      // Loop through all videoIds, performing the appropriate API calls per video to update their data
      videoIds.forEach(
        videoId => {
          // Defining of variables
          const url = 
            action === 'moveToPlaylist'
              ? `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet`
              : `https://www.googleapis.com/youtube/v3/playlistItems?id=${videoId}`;
          const method = 
            action === 'moveToPlaylist' 
              ? 'POST' 
              : 'DELETE';
          const headers = new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          });

          // Request sending to the API
          fetch(url, {
            method: method,
            headers: headers,
            body: action === 'moveToPlaylist' 
              ? JSON.stringify(
                {
                  snippet: {
                    playlistId: 'NEW_PLAYLIST_ID',
                    resourceId: {
                      kind: 'youtube#video',
                      videoId: videoId
                    }
                  } 
                }
              )
              : null
          })
          .then(
            response => response.json()
          )
          .then(
            data => {
              console.log(data);
              sendResponse(
                {
                  status: 'success',
                  data: data
                }
              );
            }
          )
          .catch(
            error => {
              console.error(error);
              sendResponse(
                {
                  status: 'error',
                  error: error
                }
              );
            }
          );
        }
      );
    }
  );
}
