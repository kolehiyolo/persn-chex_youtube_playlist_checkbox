Confirmed understanding with GPT-kun

1. I learned a TON of new stuff about chrome extension dev, especially how OAuth is handled, and short of having to actually understand the YouTube API, I believe I'm fully capable of doing this project now, that is, fixing any hallucinations GPT-kun might've made and actually making the whole thing work
2. I learned about MutationObserver, Sets, .closest()
  2.1. MutationObserver, I believe, is basically a special listener that checks for any changes in the DOM, and then executes the callback function within
    2.1.1. The .observe() method must be called and defined to determine which parts exactly of the DOM are to be tracked, in this case, it's tracking all of the document, including its child and all succeeding descendants
  2.2. Sets, as I learned from Python and Typescript, are basically arrays with unique values, meaning no repeating values can happen
    2.2.1. I just didn't know you can use them in JavaScript raw
  2.3. .closest(), I learned, is just finding the closest parent with a specified identifier to the element
3. The OAuth calls within background.js is what bugged me the most in that I'm not sure how they would've affected the UX, like I didn't know at what point will it show in the user's flow, and what kind of inputs/actions are expected from the user
  3.1. GPT-kun clarified this by basically confirming my understanding
  3.2. When the extension is installed, along with asking for chrome-specific permissions, it will also already initiate the OAuth request, and since interactive: true exists as a configuration, an OAuth popup with Google will show for the user and they have to authenticate that
  3.3. Another guess GPT-kun confirmed to be correct is that when handleApiRequest() is called upon, such as when either of the buttons within popup.html are clicked, another OAuth call is done
  3.4. HOWEVER, I was concerned that this is a little too much if every single time the user clicks, the whole authentication process has to be done over and over again
  3.5. HOWEVER AGAIN, GPT-kun confirms that as long as the user already authenticated, within the same session, they don't have to authenticate again
