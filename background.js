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
            chrome.storage.local.set({tabs:arr},()=>{
              console.log("url saved");
            })
            console.log(tab);
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
