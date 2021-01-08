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

function getHostName(url){
    return url.split('/')[2];
}

function getTimeStringSmall(count){
    if (count >= 60 && count < 3600){
        let min = Math.floor(count/60);
        return min+'m';
    }
    else if (count >= 3600){
        let hr = Math.floor(count/3600);
        return hr+'h';
    }
    return count+'s';
}

function showBadge(limit,counter){
    if(limit < 0 || limit > 60){
        chrome.browserAction.setBadgeBackgroundColor({ color: [255, 255, 0, 0] });
        chrome.browserAction.setBadgeText({text: getTimeStringSmall(counter)});
    }
    if(limit > 0 && limit <= 60) {
        chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
        chrome.browserAction.setBadgeText({text: limit + 's'});
    }
};

function showNotification(limit){
    if(limit === 300){
        chrome.notifications.create('limit',notification5m);
    }
    if(limit === 60){
        chrome.notifications.create('limit',notification1m);
    }
};


function blacklistRedirection(arr,tab){
    chrome.browserAction.setBadgeText({text: ''});
    let blockUrl = chrome.runtime.getURL("block.html") + '?domain=' + tab.domain;
    chrome.tabs.query({ currentWindow: true, active: true }, function(tab) {
        chrome.tabs.update(tab.id, { url: blockUrl });
        chrome.storage.local.set({tabs:arr},()=>{});
    });
};


function counterAndLimitManager(tab){
    if(tab.limit > 0){
        tab.limit--;
    }
    tab.counter++;
}

function faviconValidator(tab,activeTab){
    if(!tab.favicon){
        tab.favicon = activeTab.favIconUrl;
    }     
    if(activeTab.favIconUrl === undefined){
        tab.favicon = "chrome://favicon";
    }   
};

function blacklistAndStorageUpdate(tab,arr){
    if(tab.blacklist === true && tab.limit !== -1 && tab.limit === 0){
        blacklistRedirection(arr,tab);
    } else {
        chrome.storage.local.set({tabs:arr},()=>{});
    }
};

function isValidUrl(url){
    let begStr = url.substr(0,4);
    return begStr === 'http';
}

function addNewTab(domain,favicon,arr,limit,blacklist=false){
    let tb = new Tab(domain,favicon,0);
    tb.blacklist = blacklist;
    tb.limit = limit;
    arr.push(tb);
    chrome.storage.local.set({tabs:arr},()=>{});
};