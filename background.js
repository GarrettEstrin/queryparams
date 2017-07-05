console.log('background js loaded')

// chrome.browserAction.onClicked.addListener(function(tab) {
//   // Send a message to the active tab
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     activeTab = tabs[0];
//     chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
//   });
// });

function appendParams(){
    chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
        var submit = document.getElementById('submit')
        var checkboxes = document.getElementsByName('checkbox');
        var add_params = document.getElementsByName('add_to_params')[0].checked;
        // console.log(tabs[0].url)
        var url = tabs[0].url;
        // console.log(url);
        // console.log(add_params);
    //    add_params ? console.log("add to params") : console.log("replace params");
        params = "?";
        for(i=0;i<checkboxes.length;i++){
            if (checkboxes[i].checked==true){
                if(i>0){
                    value = "&" + checkboxes[i].value;
                    params = params + value;
                    console.log(params + " " + i)
                } else {
                    params = params + checkboxes[i].value;
                    console.log(params + " " + i)
                }
            
            }
        }
        if(add_params){
            params = params.replace('?', '&');
        } else {
            url = url.split('?')
            url = url[0];
        }
        url = url + params;
        console.log(url);
        chrome.tabs.query({active: true, 'currentWindow': true}, function(tabs) {
            activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "sent_url", "url": url});
            url = "";
            params = "";
            value = "";
        });
    });

}

submit.addEventListener('click', appendParams)