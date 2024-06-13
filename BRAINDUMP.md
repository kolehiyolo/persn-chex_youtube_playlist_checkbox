Checkbox rendering working

1. Yo so going back to the last commit, it was a PAUSE since I didn't have time to properly close the commit and put details in
2. So at the very least, as planned, the checkbox rendering is now working
3. It's even detecting when page mutations happen, namely when the page loads more new video items as you scroll down, and then adding checkboxes to those new videos
4. I was trying to figure out how to get the video IDs to add to selectedVideosIDs[] and even wanted to try getting selectedVideosTitles[], which now I'm thinking should be an array of objects
  4.1. selectedVideosTitles[] should have { id: id, title: title}, so we can easily manipulate which title we need based on ID
5. I was, however, interrupted by an IRL thing and had to pause the process
  5.1. I was in the midst of studying a sample video element HTML to check how I can get the ID and the title