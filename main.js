// console.log('js loaded');

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "sent_url" ) {
      if(request.localStorage == true){
        console.log('clear local storage')
        console.log(request.message)
        localStorage.clear();
      }
      console.log(request)
      window.location.href = request.url;
      // console.log(request.url);
    }
    if(request.message === 'testTel'){
      testLinks();
    }
  }
);


function testLinks(){
  var links = $('a[href^="tel"]');
  links.on('click', function(){
    alert("This link will dial: " + this.href);
  })
}




