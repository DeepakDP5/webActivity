const blacklist = document.getElementById('blacklist');
const time = document.getElementById('time');
const submit = document.getElementById('submit');
const textArea = document.getElementById('textArea');
const press = document.getElementById('press');

const btn = document.getElementById('btn');

const html1 = `<div class="alert alert-danger">
<strong>Warning</strong> The hostname already present in the list!!!
</div>`;

const html2 = `<div class="alert alert-danger">
    Enter A domain name to be blacklisted!!!
</div>`;

function present(dn){
    chrome.storage.local.get({bl:[]},res=>{
        let arr = res.bl;
        let ps = arr.find(x=> x === dn);
        if(ps){
            press.insertAdjacentHTML("afterbegin",html1);
        }else{
            addToList(dn);
            updateBlackList(dn);
        }
    });
}

document.addEventListener('DOMContentLoaded',function(){
    btn.addEventListener('click',()=>{
        chrome.storage.local.set({tabs:[]},()=>{
            console.log("values reset");
        });
        chrome.storage.local.set({bl:[]},()=>{
            console.log("values reset");
        });
    });
    
    submit.addEventListener('click',()=>{
        press.innerHTML = '';
        let x = blacklist.value;
        let ss = -1;    
        let hh = parseInt((time.value).split(':')[0]);
        let mm = parseInt((time.value).split(':')[1]);
        ss = hh*3600 + mm*60;
        if(isNaN(ss)){
            ss = 0;
        }
        if(x){
                chrome.storage.local.get({tabs:[]},(result)=>{
                    let arr = result.tabs;
                    let tab = arr.find(t=> t.url === x);
                    if(tab){
                        tab.blacklist = true;
                        tab.limit = ss;
                        chrome.storage.local.set({tabs:arr},()=>{
                            //console.log(arr);
                        });
                    }else{
                        let tb = new Tab(x,null,0);
                        tb.limit = ss;
                        tb.blacklist = true;
                        arr.push(tb);
                        chrome.storage.local.set({tabs:arr},()=>{
                            //console.log(arr);
                        });
                    }
                    addBlackList(x);
                });
                blacklist.value = '';
                time.value = '';
            }else{
                press.insertAdjacentHTML("afterbegin",html2);
            }

    });

    chrome.storage.local.get({bl:[]},result=>{
        let arr = result.bl;
        viewBlackList(arr);
    });
});

function viewBlackList(items) {
    if (items !== undefined) {
        for (var i = 0; i < items.length; i++) {
            addToList(items[i]);
        }
    }
}

function addBlackList(domainName){
   
    //console.log(present(domainName));
   present(domainName); 
}

function updateBlackList(domainName){
    chrome.storage.local.get({bl:[]},result=>{
        let arr = result.bl;
        arr.push(domainName);
        chrome.storage.local.set({bl:arr},()=>{
            //console.log("blacklistdone");
        });
    });
};


function addToList(domainName){
    let li = document.createElement('li');
    let btn = document.createElement('BUTTON');
    btn.innerText = "Remove";
    //console.log(btn);
    btn.addEventListener('click',(e)=>{
       deleteFromList(e);
    });
    li.innerText = domainName;
    textArea.appendChild(li).appendChild(btn);
};

function deleteFromList(e){
    //console.log(e);
    var dn = e.path[1].firstChild.data;
    //console.log(typeof(dn));
    var target = e.path[1];
    chrome.storage.local.get({tabs:[]},res=>{
        let arr = res.tabs;

        let node = arr.find(x => x.url === dn);
        
        if(node){
            //console.log(node);
            node.blacklist = false;
            node.limit = -1;
        }
        chrome.storage.local.set({tabs:arr});
        //console.log(arr);
    });

    chrome.storage.local.get({bl:[]}, res=>{
        let arr = res.bl;
        let index = arr.indexOf(dn);
        //console.log(index);
        arr.splice(arr.indexOf(dn),1);
        //console.log(arr);
        chrome.storage.local.set({bl:arr});
    });

    textArea.removeChild(target);
    press.innerHTML = '';
}

