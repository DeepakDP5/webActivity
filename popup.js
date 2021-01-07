const textArea = document.getElementById('textArea');
const hlpr = document.getElementById('helper');

function getHostName(url){
    return url.split('/')[2];
}

let currentDomainName;

function helper(tab){
    let counter = tab.counter;
    let limit = tab.limit;
    let checkOneMinLeft = false;
    let url = tab.url;
    let favicon = tab.favicon;
    if(limit <= 60 && limit > 0){
        checkOneMinLeft = true;
    }
    console.log(limit);

    
    setInterval(() => {
        let hr = Math.floor((counter)/3600);
            hr = prepended_number = String(hr).padStart(2, '0')
        let min = Math.floor(((counter)%3600)/60);
            min = prepended_number = String(min).padStart(2, '0');
        let sec = Math.floor((counter)%60);
            sec = prepended_number = String(sec).padStart(2, '0');
        hlpr.innerHTML = '';
        let html;
        if(!checkOneMinLeft){
            html = `<div class = "row">
        <div class = 'col-3'>
            <img src="${favicon}" style = "height:50px;width:50px" class="img-thumbnail">
        </div>
        <div class = 'col-6'>
            ${url}
        </div>
        <div class = 'col-3'>
                ${hr}:${min}:${sec}
        </div>
            </div><hr>`
        }else if(limit === 0){
            html = `<div class = "row">
        <div class = 'col-2'>
            <img src="${favicon}" style = "height:45px;width:45px" class="img-thumbnail">
        </div>
        <div class = 'col-4'>
            ${url}
        </div>
        <div class = 'col-2'>
                ${hr}:${min}:${sec}
        </div>
        <div class>
                <p>Exhausted your time</p>
        </div>
            </div><hr>`
        } else {
            html = `<div class = "row">
        <div class = 'col-2'>
            <img src="${favicon}" style = "height:45px;width:45px" class="img-thumbnail">
        </div>
        <div class = 'col-4'>
            ${url}
        </div>
        <div class = 'col-2'>
                ${hr}:${min}:${sec}
        </div>
        <div class = 'col-2'>
                ${limit}
        </div>
            </div><hr>`
        }
        
        hlpr.innerHTML = html;
        if(limit > 0 || limit === -1){
            counter++;
        }
        if(limit>0) limit--;
    }, 1000);
}

document.addEventListener('DOMContentLoaded',()=>{
    chrome.windows.getLastFocused({ populate: true }, function(currentWindow){
        if (currentWindow.focused){
            let activeTab = currentWindow.tabs.find(t => t.active === true);
            currentDomainName = getHostName(activeTab.url);
        }
    });
        
    chrome.storage.local.get({tabs:[]},(res)=>{
        let arr = res.tabs;
        console.log(arr);
        for(let i = 0; i < arr.length; i++){
            if(arr[i].begstr === "http"){
                if(arr[i].url === currentDomainName){
                    helper(arr[i]);
                }else{
                    let tab = arr[i];
                    let counter = arr[i].counter;
                    let hr = Math.floor((counter)/3600);
                        hr = prepended_number = String(hr).padStart(2, '0')
                    let min = Math.floor(((counter)%3600)/60);
                        min = prepended_number = String(min).padStart(2, '0');
                    let sec = Math.floor((counter)%60);
                        sec = prepended_number = String(sec).padStart(2, '0');
                    
                    const html = `<div class = "row">
                        <div class = 'col-3'>
                            <img src="${tab.favicon}" alt=""  style = "height:50px;width:50px" class="img-thumbnail">
                        </div>
                        <div class = 'col-6'>
                            ${tab.url}
                        </div>
                        <div class = 'col-3'>
                                ${hr}:${min}:${sec}
                        </div>
                    </div><br>`
                    
                     textArea.insertAdjacentHTML('afterbegin',html);
                }
            }
        }
    });
});
