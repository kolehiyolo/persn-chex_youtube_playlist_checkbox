console.log('Loaded popup.js');

// Adding event listener to #move-to-playlist button in popup.html
document
  .getElementById('move-to-playlist')
  .addEventListener(
    'click', 
    () => {
      // Performing a query based on tabs
      chrome.tabs.query(
        // Finds the active tabs only within the current Chrome window
        {
          active: true,
          currentWindow: true
        }, 
        (tabs) => {
          console.log(tabs[0].id);
          document.getElementById('active-tab-data')
            .innerHTML = JSON.stringify(tabs[0].title);
          // chrome.tabs.sendMessage(
          //   // Performs .sendMessage() for only the first tab within all active tabs, esp if there are many active tabs
          //   tabs[0].id, 
          //   {
          //     // getSelectedVideos is done by content.js
          //     action: 'getSelectedVideos'
          //   }, 
          //   // Once content.js processes getSelectedVideos, whatever the response is is fetched
          //   (response) => {
          //     // .sendMessage() is performed, passing the action 'moveToPlaylist' specific to this button and also the the array fetched from content.js, then triggering background.js > chrome.runtime.onMessage
          //     chrome.runtime.sendMessage(
          //       {
          //         action: 'moveToPlaylist',
          //         videoIds: response
          //       }, 
          //       (res) => {
          //         // background.js does it's thing, which culminates in this final message, with res either being "success" or "error"
          //         console.log('Move to Playlist Response:', res);
          //       }
          //     );
          //   }
          // );
        }
      );
    }
  );

// Adding event listener to #remove-from-watch-later button in popup.html
// This script's functionality is pretty much exactly the same as the above one, but specific to the #remove-from-watch-later button and circumstance
// TODO in fact, I think we can do away with having two scripts entirely and just merge them later to avoid redundancy
document
  .getElementById('remove-from-watch-later')
  .addEventListener(
    'click',
    () => {
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true
        },
        (tabs) => {
          console.log(tabs[0].id);
          document.getElementById('active-tab-data')
            .innerHTML = JSON.stringify(tabs[0].title);
          // chrome.tabs.sendMessage(
          //   tabs[0].id,
          //   {
          //     action: 'getSelectedVideos'
          //   },
          //   (response) => {
          //     chrome.runtime.sendMessage(
          //       {
          //         action: 'removeFromWatchLater',
          //         videoIds: response
          //       },
          //       (res) => {
          //         console.log('Remove from Watch Later Response:', res);
          //       }
          //     );
          //   }
          // );
        }
      );
    }
  );