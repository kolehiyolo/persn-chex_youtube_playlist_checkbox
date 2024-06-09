// ? In summary, the chrome.identity.getAuthToken() function is a key component of the OAuth flow in a Chrome extension. It retrieves an OAuth token for your extension, allowing it to access user data on external services like YouTube. Depending on the interactive option, the function might require user interaction, such as granting permission through a popup.

// ? Triggered when the extension is installed or updated
chrome.runtime.onInstalled.addListener(
  () => {
    console.log('YouTube Watch Later Organizer installed');
    // ! Logs where???
  }
);

// ? Retrieve an OAuth 2.0 token for the current user
// ! Elaborate???
chrome.identity.getAuthToken(
  { 
    interactive: true
  }, 
  (token) => {
    console.log('Token:', token);
  }
);

// ? Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (
      request.action === 'moveToPlaylist'
      || request.action === 'removeFromWatchLater'
    ) {
      handleApiRequest(request.action, request.videoIds, sendResponse);
    }
    return true; // ? Keeps the message channel open for async sendResponse
  }
);

// ? Handle the API request based on the action
function handleApiRequest(action, videoIds, sendResponse) {
  // Authenticate token for YouTube API Use
  chrome.identity.getAuthToken(
    { 
      interactive: true
    }, 
    (token) => {
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
