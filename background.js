console.log('background js loaded')
var submit = document.getElementById('submit')
var customParamSubmit = document.getElementById('addCustomSubmit')
// variable for localStorage clear
var LS = false;
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
        params = ["?"];
        // add params from checkboxes
        for(i=0;i<checkboxes.length;i++){
            if (checkboxes[i].checked==true){
                params.push(checkboxes[i].value)
            }
        }
        // add params from text inputs
        if(number.value.length>0){
            params.push("phone=" + number.value);
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
        if(document.getElementById('clearLocal').checked==true){
            console.log("clear local storage is checked")
            LS = true;
            console.log(LS)
        }
        // console.log(url);
        chrome.tabs.query({active: true, 'currentWindow': true}, function(tabs) {
            activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "sent_url", "url": url, "localStorage": LS});
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
    id = new Date();
    var customParam = document.getElementById('customParamInput').value
        localStorage["customParam"+id] = customParam;
        getCustomParams();
        document.getElementById('customParamInput').value = "";
}

// Click listener for add custom param button
customParamSubmit.addEventListener('click', function(){
    if(document.getElementById('customParamInput').value.length > 0){
        addCustomParam();
    } else {console.log('cannot add empty param')}
})

// retrieve and print custom params from localStorage to popup
function getCustomParams(){
    console.log("getCustomParams")
    customParams = []
    for(i=0;i<localStorage.length;i++){
        customParams.push(localStorage[Object.keys(localStorage)[i]])
    }
    console.log(customParams)
    var customSection = document.getElementById('custom-params-section')
    var html = "";
    for(i=0;i<localStorage.length;i++){
      html = `<label><input type="checkbox" name="checkbox" value="${localStorage[Object.keys(localStorage)[i]]}">${localStorage[Object.keys(localStorage)[i]]}</label><span class="remove" id="${Object.keys(localStorage)[i]}">X</span><br>` + html;
    }
    // customParams.forEach(function(param, thisArg){
    //     html = `<label><input type="checkbox" name="checkbox" value="${param}">${param}</label><span class="remove" id="${thisArg}">X</span><br>` + html;
    // })
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
    localStorage.removeItem(this.id)
    getCustomParams();
}
