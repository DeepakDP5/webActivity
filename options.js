const resetBL = document.getElementById('resetBL');
const resetTime = document.getElementById('resetTime');
const submitTime = document.getElementById('submitTime');

document.addEventListener('DOMContentLoaded',function(){
    reset.addEventListener('click',(e)=>{
        
        alert.innerHTML = '';
        chrome.storage.local.set({tabs:[]},()=>{});
        chrome.storage.local.set({bl:[]},()=>{
            textArea.innerHTML = '';
            blacklist.value = '';
        });
    });
    
    submitTime.addEventListener('click',(e)=>{
        let st = stringToSec(resetTime.value);
        resetTime.value = '';
        chrome.storage.local.get(['s'], ()=> {
            chrome.storage.local.set({s:st});
        });
    });
    
    submit.addEventListener('click',(e)=>{
        alert.innerHTML = '';
        let x = blacklist.value;

        let ss = stringToSec(time.value);
        if(x){
            chrome.storage.local.get({tabs:[]},(result)=>{
                let arr = result.tabs;
                let tab = arr.find(t=> t.domain === x);
                if(tab){
                    tab.blacklist = true;
                    tab.limit = ss;
                    chrome.storage.local.set({tabs:arr},()=>{});
                } else {
                    addNewTab(x,null,arr,ss,true);
                }
                addBlackList(x);
            });
            blacklist.value = '';
            time.value = '';
        } else {
            alert.insertAdjacentHTML("afterbegin", `<div class="alert alert-danger">
                                                        Enter A domain name to be blacklisted!!!
                                                    </div>`);
        }
    });

    resetBL.addEventListener('click', (e)=> {
        resetBlacklist();
    });    

    chrome.storage.local.get({bl:[]},result=>{
        let arr = result.bl;
        viewBlackList(arr);
    });
});