function getHostName(url){
  return url.split('/')[2];
}

let notification5m = {
  type: "basic",
  iconUrl: "icon48.png",
  title: "Site is BlacListed",
  message: "5 min left !!!",
};

let notification1m = {
  type: "basic",
  iconUrl: "icon48.png",
  title: "Site is BlackListed",
  message: "1 min left !!!",
};


setInterval(()=>{
  chrome.windows.getLastFocused({ populate: true }, function(currentWindow) {
    if (currentWindow.focused) {
      let activeTab = currentWindow.tabs.find(t => t.active === true);
      
      chrome.storage.local.get({tabs:[]},(result)=>{
        let arr = result.tabs;
        let tab = arr.find(t=> t.url === getHostName(activeTab.url));
        
        if(tab){
          if(tab.limit < 0 || tab.limit > 60){
            chrome.browserAction.setBadgeBackgroundColor({ color: [255, 255, 0, 0] });
            chrome.browserAction.setBadgeText({text: `${tab.counter}`});
          }
          if(tab.limit > 0 && tab.limit <= 60) {
            chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
            chrome.browserAction.setBadgeText({text: tab.limit + 's'});
          }
          if(tab.limit === 300){
            chrome.notifications.create('limit',notification5m);
          }
          if(tab.limit === 60){
            chrome.notifications.create('limit',notification1m);
          }
          if(tab.limit > 0){
            tab.limit--;
          }
          tab.counter++;
          if(!tab.favicon){
            tab.favicon = activeTab.favIconUrl;
          }
          if(tab.blacklist === true && tab.limit !== -1 && tab.limit === 0){
            chrome.browserAction.setBadgeText({text: ''});
            var blockUrl = chrome.runtime.getURL("block.html") + '?url=' + tab.url;
            chrome.tabs.query({ currentWindow: true, active: true }, function(tab) {
            chrome.tabs.update(tab.id, { url: blockUrl });
            chrome.storage.local.set({tabs:arr},()=>{
              console.log(arr);
            });
            });
          }
          else{
            chrome.storage.local.set({tabs:arr},()=>{
              console.log(arr);
            })
          }
        }else{
          let begStr = activeTab.url.substr(0,4);
          let favicon = activeTab.favIconUrl;
          let tb = new Tab(getHostName(activeTab.url),favicon,0);
          tb.begstr = begStr;
          arr.push(tb);
          chrome.storage.local.set({tabs:arr},()=>{
            console.log(arr);
          })            
        }
      })
    }
  });
},1000);

