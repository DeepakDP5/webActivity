const textArea = document.getElementById('textArea');
const hlpr = document.getElementById('helper');

function getHostName(url){
    return url.split('/')[2];
}

let currentDomainName;

function helper(tab){
    let counter = tab.counter;
    setInterval(() => {
        let hr = Math.floor((counter)/3600);
            hr = prepended_number = String(hr).padStart(2, '0')
        let min = Math.floor(((counter)%3600)/60);
            min = prepended_number = String(min).padStart(2, '0');
        let sec = Math.floor((counter)%60);
            sec = prepended_number = String(sec).padStart(2, '0');
        hlpr.innerHTML = '';
        const html = `<div class = "row">
        <div class = 'col-3'>
            <img src="${tab.favicon}" style = "height:50px;width:50px" class="img-thumbnail">
        </div>
        <div class = 'col-6'>
            ${tab.url}
        </div>
        <div class = 'col-3'>
                ${hr}:${min}:${sec}
        </div>
    </div><hr>`
        hlpr.innerHTML = html;
        counter++;
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
<<<<<<< HEAD
            if(arr[i].favicon){
=======
            if(arr[i].begstr === "http"){
>>>>>>> d3bce637e268594bd4d5e38f8b4df83f85055e4e
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
