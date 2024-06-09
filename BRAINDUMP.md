Studied GPT code (Part 1)

1. manifest.json
  1.1. So basically this file is the meta data dump for how chrome will display the extension data to the user AND also what files have to be accessed by chrome to do stuff with
  1.2. Basically like Node.js' package.json
  1.3. What's interesting for me definitely are the permissions, background, content_scripts, and action properties, which I'd have to play with more to fully wrap my head around
2. popup.html
  2.1. Basically, when the extension is active and is on the extensions tab, once the user interacts with the extension icon (I believe usually by clicking), the "action" property in manifest.json is called upon, and the "default_popup" sub-property is called on
  2.2. In this case, "popup.html" is the HTML that describes what that pop-up looks like
  2.3. It already has internal CSS in the head, and basically just has basic HTML: a title, two buttons for actions, and the call for the script that handles the actions on the pop-up
  2.4. This entire configuration of the pop-up might have to change as the needs and features evolve during my building
3. background.js
  3.1. So this is the first dense part I need to dissect real close, and while I sorta get what the macro details are, the micro stuff is still a bit lost on me
  3.2. For example, just based on context alone, I get that chrome.runtime.onInstalled.addListener() basically executes when the extension is installed, but that's just a guess
    3.2.1. Another example is chrome.identity.getAuthToken() is referred to twice in the code, once out in the open (which probably means it executes once as soon as installation happens), and then once inside of the handleApiRequest() function, and again based on context, I'm guessing that's the call that handles requesting the OAuth2 stuff for the API
    3.2.2. chrome.runtime.onMessage.addListener(), I believe, basically waits for the user's command to either "moveToPlaylist" or "removeFromWatchLater", and then calls handleApiRequest() with the type of action, the array videoIds that supposedly contains the IDs of the videos checked in the page, and then a third parameter "sendResponse" which I think is just a callback function that's expected by the root function after all is said and done
      3.2.2.1. In this case, the user's command comes in the form of the buttons in popup.html being pressed, activating something within popup.js (which I'm gonna review soon), which then trips the listener
    3.2.3. Finally, handleApiRequest() is the one to actually do the heavy-lifting of dissecting the array of video IDs and then preparing the requests that are gonna be sent via the API to YouTube, with the goal of updating data on the DB
      3.2.3.1. chrome.identity.getAuthToken() is called again, then a loop going through videoIds is performed, where for each videoId, a set of actions are performed
      3.2.3.2. For each videoId, the request is being prepared, and then sent
      3.2.3.3. All event handling is then done, culminating in either a success or error message
      3.2.3.4. This chunk is where I'm getting kinda lost, primarily because I'm not familiar with the YouTube API just yet, so I don't know what kinda prep you have to do for the API calls, such as token, the header and body formats, and of course, the endpoint options and who much power we have over our data
  3.3. I've sorta included some very generalized comments on the parts that I sorta understand and will just revisit it after
  3.4. Oh and I also refactored the code a bit to "fix" the nesting according to my weird anal tendencies