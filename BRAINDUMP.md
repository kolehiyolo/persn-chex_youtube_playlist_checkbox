Arrays working now

1. selectedVideosIDs[] and selectedVideosTitles[] now working splendidly
2. They're being logged and even being printed on popup.html
3. For selectedVideosTitles[], though, I had to revamp it to be a map instead of a set so that adding and deleting items are a breeze
4. The .onMessage() method for content.js also is working splendidly now, as it is now capable of waiting for any popup.js requests for the data and responding as intended 