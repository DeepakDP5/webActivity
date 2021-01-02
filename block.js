let url = new URL(document.URL);
let blockSiteUrl = url.searchParams.get("url");
const x = document.getElementById('idd');
x.innerText = blockSiteUrl;