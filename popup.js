const textArea = document.getElementById('textArea');
const hlpr = document.getElementById('helper');

function getHostName(url){
    return url.split('/')[2];
}

function html(hr,min,sec,placeholder,favicon,url){
    return  `<div class = "row">
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
                <p>${placeholder}</p>
        </div>
            </div><hr>`;
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
        let htmlc;
        if(limit === -1 || limit === 0){
            placeholder = (limit === 0) ? 'Time Exhausted':'';
            htmlc = html(hr,min,sec,placeholder,favicon,url);
        }
        else{
            htmlc = html(hr,min,sec,limit,favicon,url);
        }
        hlpr.innerHTML = htmlc;
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

                    let favicon = tab.favicon;
                    let url = tab.url;
                    let placeholder = tab.limit === 0 ? 'Time Exhausted' : '';
                    const htmlc = html(hr,min,sec,placeholder,favicon,url);
                    
                    textArea.insertAdjacentHTML('afterbegin',htmlc);
                }
            }
        }
    });
});
