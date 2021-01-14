setInterval(()=>{
    // Fetching current active tab 
    chrome.windows.getLastFocused({ populate: true }, function(currentWindow) {
        
        if (currentWindow.focused) {
            let activeTab = currentWindow.tabs.find(t => t.active === true);
            
            // Redirecting back the page removed from blacklist
            redirectBack(activeTab);

            // Managing Current active tab in storage
            chrome.storage.local.get({tabs:[]},(result)=>{
                chrome.browserAction.setBadgeText({text: ''});
                let arr = result.tabs;
                let tab = arr.find(t=> t.domain === getHostName(activeTab.url));
                if(tab){
                    showBadge(tab.limit,tab.counter);
                    showNotification(tab.limit);
                    counterAndLimitManager(tab);
                    faviconValidator(tab,activeTab);
                    blacklistAndStorageUpdate(tab,arr);
                } else {
                    let domain = getHostName(activeTab.url);
                    let favicon = activeTab.favIconUrl;
                    if(isValidUrl(activeTab.url)){
                        addNewTab(domain,favicon,arr,-1);
                    }
                }
            })

            chrome.storage.local.get({allTabs:[]}, (res)=>{
                let allArr = res.allTabs;
                let tab = allArr.find(t => t.domain === getHostName(activeTab.url));
                if(tab){
                    tab.counter++;
                    faviconValidator(tab,activeTab);
                    console.log(allArr);
                    chrome.storage.local.set({allTabs:allArr}, ()=> {});
                }
                else{
                    let domain = getHostName(activeTab.url);
                    let favicon = activeTab.favIconUrl;
                    if(isValidUrl(activeTab.url)){
                        let tb = new Tab(domain,favicon,0);
                        tb.blacklist = false;
                        tb.limit = -1;
                        faviconValidator(tb,{});
                        allArr.push(tb);
                        console.log(allArr);
                        chrome.storage.local.set({allTabs:allArr},()=>{});
                    }
                }
            });
        }
    });
},1000);