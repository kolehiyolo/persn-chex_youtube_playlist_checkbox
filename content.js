console.log('Loaded content.js');

// When the page loads, find the video items, then add the checkboxes to each
window.addEventListener(
  'load',
  () => {
    console.log('Page done loading');
    // ? MutationObserver is used to monitor the DOM for changes, such as new videos being loaded into the playlist.
    const observer = new MutationObserver(
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
    // ? The MutationObserver with childList: true and subtree: true ensures that your extension can dynamically react to changes in YouTube's DOM, allowing it to add checkboxes to videos regardless of when they are loaded or added to the page. This approach guarantees that the functionality of your extension remains consistent and comprehensive, providing a seamless user experience.
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
// ? A Set is used to keep track of the IDs of the selected videos. Sets are chosen here because they automatically handle uniqueness and provide efficient operations for adding, deleting, and checking items.
const selectedVideosIDs = new Set();

const selectedVideosTitles = new Set();

// // I'm guessing this tracks the checkbox changes within the page, which then effectively adds or removes each item accordingly within selectedVideos[]
// document.addEventListener(
//   'change',
//   (event) => {
//     // Just a gate checker to see if the change was related to any of the .select-video-checkbox elements added above
//     if (
//       event.target.classList.contains('select-video-checkbox')
//     ) {
//       // Getting the ID of the video related to the change
//       // ? When a checkbox is checked or unchecked, it identifies the closest video element and gets its video ID (assumed to be stored in a data attribute of the video element).
//       const videoId = 
//         event.target
//         .closest('ytd-playlist-video-renderer')
//         .getElementById('meta')
//         .getElementById('video-title').href;
      
//       // const videoId = 
//       //   event.target
//       //   .closest('ytd-playlist-video-renderer').dataset.videoId;

//       console.log(videoId);
        
//       // Updating selectedVideosIDs[] according to the change (tick or untick)
//       if (event.target.checked) {
//         selectedVideosIDs.add(videoId);
//       } else {
//         selectedVideosIDs.delete(videoId);
//       }
//     }
//   }
// );

// ! CLOSED
// // When popup.js > chrome.tabs.sendMessage() happens, this is what handles that request, basically sending selectedVideos[]
// // ? Listens for messages from the extension's other parts (like popup.js).
// chrome.runtime.onMessage.addListener(
//   (request, sender, sendResponse) => {
//     // AFAICT, this event listener checks for all kinds of requests from all kinds of places (most probably from popup.js), but in our case, just the getSelectedVideos is needed
//     if (request.action === 'selectedVideosIDs') {
//       sendResponse(
//         Array.from(selectedVideosIDs)
//       );
//     }
//   }
// );