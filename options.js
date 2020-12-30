const blacklist = document.getElementById('blacklist');
const greylist = document.getElementById('greylist');
const submitb = document.getElementById('submitb');
const submitg = document.getElementById('submitg');

submitb.addEventListener('click',()=>{
    let x = blacklist.value;
    chrome.storage.local.get({tabs:[]},(result)=>{
        let arr = result.tabs;
        let tab = arr.find(t=> t.url === x);
        if(tab){
            tab.blacklist = true;
            chrome.storage.local.set({tabs:arr},()=>{
                console.log(arr);
            });
        } else{
          let tb = new Tab(x,null,0);
          tb.blacklist = true;
          arr.push(tb);
          chrome.storage.local.set({tabs:arr},()=>{
              console.log(arr);
          });
        }
    });
    blacklist.value = '';
})

submitg.addEventListener('click',()=>{
  let x = greylist.value;
  chrome.storage.local.get({tabs:[]},(result)=>{
      let arr = result.tabs;
      let tab = arr.find(t=> t.url === x);
      if(tab){
          tab.greylist = true;
          chrome.storage.local.set({tabs:arr},()=>{
              console.log(arr);
          });
      } else{
        let tb = new Tab(x,null,0);
        tb.greylist = true;
        arr.push(tb);
        chrome.storage.local.set({tabs:arr},()=>{
            console.log(arr);
        });
      }
  });
  greylist.value = '';
})