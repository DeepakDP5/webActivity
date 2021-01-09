const displayArea = document.getElementById('displayArea');
const activetab = document.getElementById('activetab');

let currentDomainName;

document.addEventListener('DOMContentLoaded',()=>{
    chrome.windows.getLastFocused({ populate: true }, function(currentWindow){
        if (currentWindow.focused){
            let activeTab = currentWindow.tabs.find(t => t.active === true);
            currentDomainName = getHostName(activeTab.url);
        }
    });
    
    chrome.storage.local.get({tabs:[]},(res)=>{
        let arr = res.tabs;
        arr = sortTabs(arr);

        for(let i = 0; i < arr.length; i++){
            if(arr[i].domain === currentDomainName){
                dispCurActiveDomain(arr[i]);
            } else {
                let tab = arr[i];
                let counter = arr[i].counter;
                let timeStr = getTimeStringBig(counter);
                let favicon = tab.favicon;
                let domain = tab.domain;
                let placeholder = tab.limit === 0 ? 'Time Exhausted' : '';
                let htmlc = html(timeStr,placeholder,favicon,domain);
                if(i === (arr.length - 1)){
                    htmlc += '<hr>';
                }
                displayArea.insertAdjacentHTML('beforeend',htmlc);
            }

        }
    });
});
