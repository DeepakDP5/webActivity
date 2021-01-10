document.addEventListener('DOMContentLoaded',function(){
    // TODO 
    reset.addEventListener('click',(e)=>{
        
        alert.innerHTML = '';
        chrome.storage.local.set({tabs:[]},()=>{});
        chrome.storage.local.set({bl:[]},()=>{});
    });
    
    submit.addEventListener('click',(e)=>{
        e.preventDefault();
        alert.innerHTML = '';
        let x = blacklist.value;
       0// console.log(time.value);
        //console.log(typeof(time.value));
        let ss = stringToSec(time.value);
        if(x){
            chrome.storage.local.get({tabs:[]},(result)=>{
                let arr = result.tabs;
                let tab = arr.find(t=> t.domain === x);
                if(tab){
                    tab.blacklist = true;
                    tab.limit = ss;
                    //console.log(arr);
                    chrome.storage.local.set({tabs:arr},()=>{});
                } else {
                    addNewTab(x,null,arr,ss,true);
                }
                addBlackList(x);
            });
            blacklist.value = '';
            time.value = '';
        } else {
            alert.insertAdjacentHTML("afterbegin",`<div class="alert alert-danger">
            Enter A domain name to be blacklisted!!!
            </div>`);
        }
    });

    chrome.storage.local.get({bl:[]},result=>{
        let arr = result.bl;
        viewBlackList(arr);
    });
});



