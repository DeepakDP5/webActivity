function getHostName(url){
  return url.split('/')[2];
}



setInterval(()=>{
  chrome.windows.getLastFocused({ populate: true }, function(currentWindow) {
    if (currentWindow.focused) {
      let activeTab = currentWindow.tabs.find(t => t.active === true);
      
      chrome.storage.local.get({tabs:[]},(result)=>{
        let arr = result.tabs;
        let tab = arr.find(t=> t.url === getHostName(activeTab.url));
    
        if(tab){
          tab.counter++;
          if(tab.blacklist === true || (tab.greylist === true && tab.counter >= 15)){
            var blockUrl = chrome.runtime.getURL("block.html") + '?url=' + tab.url;
            chrome.tabs.query({ currentWindow: true, active: true }, function(tab) {
            chrome.tabs.update(tab.id, { url: blockUrl });
            });
          }
          else{
            chrome.storage.local.set({tabs:arr},()=>{
            console.log("url saved");
            })
          }
          console.log(tab.url);
        }else{
          let tb = new Tab(getHostName(activeTab.url),activeTab.favIconUrl,0);
          arr.push(tb);
          chrome.storage.local.set({tabs:arr},()=>{
            console.log("url saved");
          })            
        }
      })
    }
  });
},1000);

