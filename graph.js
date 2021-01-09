const mychart = document.getElementById('ctx');
let arr = [];

chrome.storage.local.get({tabs:[]},(res)=>{
    arr = res.tabs;
    arr = sortTabs(arr);
    let dispArr = (arr.length >= 10)? arr.slice(0,10):arr;
    let totalSum =  arr.reduce((a,b)=> a+b.counter,0);
    let dispArrSum = dispArr.reduce((a,b)=> a+b.counter,0);
    

    let lbl = dispArr.map(tab => {
        return tab.domain;
    });
    let ctr = dispArr.map(tab =>{
        return (tab.counter*100/totalSum).toFixed(2);
    });
    if (dispArr.length === 10) {
        lbl.push("Others");
        let otherTimePercent =  (((totalSum-dispArrSum)*100)/totalSum).toFixed(2);
        ctr.push(otherTimePercent);
    }
    

    let myChart = new Chart(mychart, {
        type: 'doughnut',
        data: {
            labels: lbl,
            datasets: [{
                label: 'time spent',
                data: ctr,
                backgroundColor: [
                    'rgba(35, 64, 75, 0.9)',
                    'rgba(38, 70, 83, 0.9)',
                    'rgba(40, 114, 113, 0.9)',
                    'rgba(42, 157, 143, 0.9)',
                    'rgba(138, 177, 125, 0.9)',
                    'rgba(233, 196, 106, 0.9)',
                    'rgba(239, 179, 102, 0.9)',
                    'rgba(244, 162, 97, 0.9)',
                    'rgba(249, 111, 81, 0.9)',
                    'rgba(252,85,70,0.9)'
                ].reverse(),
                borderColor: [
                    // 'rgba(255, 99, 132, 1)',
                    // 'rgba(54, 162, 235, 1)',
                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 5
            }]
        },
        options: {
            scales: {
                circumference: 1/10
            }
        }
    });
    
});
