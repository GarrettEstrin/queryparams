// console.log('js loaded');

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "sent_url" ) {
      window.location.href = request.url;
      // console.log(request.url);
    }
  }
);

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if( request.message === "sent_custom" ) {
//       console.log(request.params);

//     }
//   }
// );
