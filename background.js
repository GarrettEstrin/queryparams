console.log('background js loaded')
var submit = document.getElementById('submit')
var customParamSubmit = document.getElementById('addCustomSubmit')
// if(!localStorage["num_of_custom"]){
//     var num_of_custom = 0
//     localStorage["num_of_custom"] = num_of_custom;
// } else {
//     var num_of_custom = localStorage["num_of_custom"]
// }

// function that is run when submit button is pressed
function appendParams(){
    chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
        var checkboxes = document.getElementsByName('checkbox');
        var number = document.getElementsByName('number')[0];
        var add_params = document.getElementsByName('add_to_params')[0].checked;
        // console.log(tabs[0].url)
        var url = tabs[0].url;
        var urlArray = url.split("?")
        var emptyUrl = urlArray[0]
        
        // console.log(url);
        // console.log(add_params);
    //    add_params ? console.log("add to params") : console.log("replace params");
        params = ["?"];
        // add params from checkboxes
        for(i=0;i<checkboxes.length;i++){
            if (checkboxes[i].checked==true){
                params.push(checkboxes[i].value)
            } 
        }
        // add params from text inputs
        if(number.value.length>0){
            params.push("number=" + number.value);
        }
        // if adding to params, change leading "?" to "&"
        if(add_params){
            params[0] = "&";
        }
        // combine params array into a string
        paramsString = params.join('&');
        // remove extra "&"
        paramsString = paramsString.slice(0, 1) + paramsString.slice(2, paramsString.length)
        // add params to url
        if(add_params){
            url = url + paramsString
        } else {
            url = emptyUrl + paramsString
        }
        // console.log(url);
        chrome.tabs.query({active: true, 'currentWindow': true}, function(tabs) {
            activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "sent_url", "url": url});
            url = "";
            params = "";
            value = "";
        });
    });

}
// Click listener for submit button
submit.addEventListener('click', appendParams)

// save custom input
function saveCus(){
    chrome.storage.sync.set({ "yourBody": "myBody" }, function(data){
        console.log(data)
});
}

// function to add a custom param
function addCustomParam(){
    var customParam = document.getElementById('customParamInput').value
    if(customParam.length>0){
        localStorage["customParam" + localStorage.length] = customParam
        getCustomParams();
        document.getElementById('customParamInput').value = "";
    }
}

// Click listener for add custom param button
customParamSubmit.addEventListener('click', addCustomParam)

// retrieve and print custom params from localStorage to popup
function getCustomParams(){
    console.log("getCustomParams")
    customParams = []
    for(i=0;i<localStorage.length;i++){
        customParams.push(localStorage["customParam" + i])
    }
    console.log(customParams)
    var customSection = document.getElementById('custom-params-section')
    var html = "";
    customParams.forEach(function(param, thisArg){
        html = `<label><input type="checkbox" name="checkbox" value="${param}">${param}</label><span class="remove" id="${thisArg}">X</span><br>` + html;
    })
    customSection.innerHTML = html;
    removeBtns = document.getElementsByClassName('remove')
    for(i=0;i<removeBtns.length;i++){
        removeBtns[i].addEventListener('click', removeParam)
    }

}

getCustomParams();

// function to remove custom param
function removeParam(){
    console.log(this.id)
    localStorage.removeItem("customParam"+this.id)
    getCustomParams();
}