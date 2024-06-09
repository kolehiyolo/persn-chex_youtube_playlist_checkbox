// When the page loads, find the video items, then add the checkboxes to each
window.addEventListener(
  'load',
  () => {
    const observer = new MutationObsever(
      () => {
        // Fetching all video items and putting them in an array videoItems[]
        const videoItems = 
          document.querySelectorAll(
            'ytd-playlist-video-renderer:not(.checkbox-injected)'
          );

        // Loop through videoItems[], and add the checkbox for each, then add the class .checkbox-injected to the videoItem
        videoItems.forEach(
          (item) => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'select-video-checkbox';
            item.insertAdjacentElement('afterbegin', checkbox);
            item.classList.add('checkbox-injected');
          }
        );
      }
    );

    // ? not sure at all what this means lolszx
    observer.observe(
      document, 
      {
        childList: true,
        subtree: true
      }
    );
  }
);

// AFAICT, this is the array that actually contains the list of video IDs, to be updated and called upon as user interactions happen
const selectedVideos = new Set();

// I'm guessing this tracks the checkbox changes within the page, which then effectively adds or removes each item accordingly within selectedVideos[]
document.addEventListener(
  'change',
  (event) => {
    // Just a gate checker to see if the change was related to any of the .select-video-checkbox elements added above
    if (
      event.target.classList.contains('select-video-checkbox')
    ) {
      // Getting the ID of the video related to the change
      const videoId = 
        event.target
        .closest('ytd-playlist-video-renderer').dataset.videoId;
        
      // Updating selectedVideos[] according to the change (tick or untick)
      if (event.target.checked) {
        selectedVideos.add(videoId);
      } else {
        selectedVideos.delete(videoId);
      }
    }
  }
);

// When popup.js > chrome.tabs.sendMessage() happens, this is what handles that request, basically sending selectedVideos[]
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    // AFAICT, this event listener checks for all kinds of requests from all kinds of places (most probably from popup.js), but in our case, just the getSelectedVideos is needed
    if (request.action === 'getSelectedVideos') {
      sendResponse(
        Array.from(selectedVideos)
      );
    }
  }
);