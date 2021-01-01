const blacklist = document.getElementById('blacklist');
const time = document.getElementById('time');
const submit = document.getElementById('submit');

/*function timeinSec(){
    let arr  = time.value.split(':');

};*/


submit.addEventListener('click',()=>{
    console.log(time.value);
    let ss = -1;    
    let hh = parseInt((time.value).split(':')[0]);
    let mm = parseInt((time.value).split(':')[1]);
    ss = hh*3600 + mm*60;
    console.log(ss);
    if(isNaN(ss)){
        ss = 0;
    }

    let x = blacklist.value;
    chrome.storage.local.get({tabs:[]},(result)=>{
        let arr = result.tabs;
        let tab = arr.find(t=> t.url === x);
        if(tab){
            tab.blacklist = true;
            tab.limit = ss;
            chrome.storage.local.set({tabs:arr},()=>{
                console.log(arr);
            });
        } else{
          let tb = new Tab(x,null,0);
          tb.limit = ss;
          tb.blacklist = true;
          arr.push(tb);
          chrome.storage.local.set({tabs:arr},()=>{
              console.log(arr);
          });
        }
    });
    blacklist.value = '';
    time.value = '';
})