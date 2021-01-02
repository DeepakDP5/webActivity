const btn = document.getElementById('btn');
const btnl = document.getElementById('btnl');
const btnul = document.getElementById('btnul');

btn.addEventListener('click',()=>{
    chrome.storage.local.set({tabs:[]},()=>{
        console.log("values reset");
    });
    chrome.storage.local.set({bl:[]},()=>{
        console.log("values reset");
    });
})
