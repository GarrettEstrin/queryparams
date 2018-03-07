// console.log('js loaded');

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "sent_url" ) {
      if(request.localStorage == true){
        localStorage.clear();
      }
      window.location.href = request.url;
      // console.log(request.url);
    }
    if(request.message === 'testTel'){
      testLinks();
    }
    if(request.message === "cssTest"){
      console.log(request);
      window.location.href = request.url;
    }
  }
);


function testLinks(){
  var links = $('a[href^="tel"]');
  links.on('click', function(){
    alert("This link will dial: " + this.href);
  })
}




