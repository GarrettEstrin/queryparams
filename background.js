console.log('background js loaded')
var submit = document.getElementById('submit')
var checkboxes = document.getElementsByName('checkbox');

// chrome.browserAction.onClicked.addListener(function(tab) {
//   // Send a message to the active tab
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     activeTab = tabs[0];
//     chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
//   });
// });

function appendParams(){
    chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
        // console.log(tabs[0].url)
        var url = tabs[0].url;
        console.log(url);
        params = "?";
        for(i=0;i<checkboxes.length;i++){
            if (checkboxes[i].checked==true){
                if(i>0){
                    value = "&" + checkboxes[i].value;
                    params = params + value;
                } else {
                    params = params + checkboxes[i].value;
                }
            
            }
        }
        url = url + params;
        chrome.tabs.query({active: true, 'currentWindow': true}, function(tabs) {
            activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "sent_url", "url": url});
            url = "";
        });
    });

}

submit.addEventListener('click', appendParams)