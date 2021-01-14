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
                chrome.storage.local.get({allTabs:[]},(res)=>{
                    let allArr = res.allTabs;
                    let alltab = allArr.find(t => t.domain === getHostName(activeTab.url));
                    if(tab){
                        console.log(tab.counter);
                        showBadge(tab.limit,tab.counter);
                        showNotification(tab.limit);
                        counterAndLimitManager(tab);
                        faviconValidator(tab,activeTab);
                        blacklistAndStorageUpdate(tab,arr);
                        alltab.counter++;
                        faviconValidator(alltab,activeTab);
                        chrome.storage.local.set({allTabs:allArr}, ()=> {});
                    } else {
                        if(alltab){
                            alltab.counter++;
                            faviconValidator(alltab,activeTab);
                            chrome.storage.local.set({allTabs:allArr}, ()=> {});
                        } else {
                            let alldomain = getHostName(activeTab.url);
                            let allfavicon = activeTab.favIconUrl;
                            if(isValidUrl(activeTab.url)){
                                let tb = new Tab(alldomain,allfavicon,0);
                                tb.blacklist = false;
                                tb.limit = -1;
                                faviconValidator(tb,{});
                                allArr.push(tb);
                                chrome.storage.local.set({allTabs:allArr},()=>{});
                            }
                            let domain = getHostName(activeTab.url);
                            let favicon = activeTab.favIconUrl;
                            if(isValidUrl(activeTab.url)){
                                addNewTab(domain,favicon,arr,-1);
                            }
                        }
                    }
                    // chrome.storage.local.get(['s'], (res)=>{
                    //     let ss = res.s;
                    //     let time = getTimeLong(ss)
                    //     let d = new Date();
                    //     let h = d.getHours();
                    //     let m = d.getMinutes();
                    //     if(h == time[0] && m == time[1]){
                    //         removeData();
                    //     }
                    // });
                });
                
                // if(tab){
                //     showBadge(tab.limit,tab.counter);
                //     showNotification(tab.limit);
                //     counterAndLimitManager(tab);
                //     faviconValidator(tab,activeTab);
                //     blacklistAndStorageUpdate(tab,arr);
                // } else {
                //     let domain = getHostName(activeTab.url);
                //     let favicon = activeTab.favIconUrl;
                //     if(isValidUrl(activeTab.url)){
                //         addNewTab(domain,favicon,arr,-1);
                //     }
                // }
                // chrome.storage.local.get({allTabs:[]}, (res)=>{
                //     let allArr = res.allTabs;
                //     let tab1 = allArr.find(t => t.domain === getHostName(activeTab.url));
                //     if(tab1){
                //         tab1.counter++;
                //         showBadge(tab.limit,tab.counter);
                //         faviconValidator(tab1,activeTab);
                //         chrome.storage.local.set({allTabs:allArr}, ()=> {});
                //     }
                //     else{
                //         let domain = getHostName(activeTab.url);
                //         let favicon = activeTab.favIconUrl;
                //         if(isValidUrl(activeTab.url)){
                //             let tb = new Tab(domain,favicon,0);
                //             tb.blacklist = false;
                //             tb.limit = -1;
                //             faviconValidator(tb,{});
                //             allArr.push(tb);
                //             chrome.storage.local.set({allTabs:allArr},()=>{});
                //         }
                //     }
                // });
                // chrome.storage.local.get(['s'], (res)=>{
                //     let ss = res.s;
                //     let time = getTimeLong(ss)
                //     let d = new Date();
                //     let h = d.getHours();
                //     let m = d.getMinutes();
                //     if(h == time[0] && m == time[1]){
                //         removeData();
                //     }
                // });
            });
        }
    });
},1000);
