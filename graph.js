const mychart = document.getElementById('ctx');
let arr = [];

chrome.storage.local.get({tabs:[]},(res)=>{
    arr = res.tabs;
    arr = sortTabs(arr);
    let dispArr = (arr.length >= 8)? arr.slice(0,8):arr;
    let totalSum =  arr.reduce((a,b)=> a+b.counter,0);
    let dispArrSum = dispArr.reduce((a,b)=> a+b.counter,0);

    let lbl = dispArr.map(tab => {
        return tab.domain;
    });
    let ctr = dispArr.map(tab =>{
        return (tab.counter*100/totalSum).toFixed(2);
    });
    if (dispArr.length === 8) {
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
                    'rgb(219,112,147)',
                    'rgb(205,92,92)',
                    'rgb(173,216,230)',
                    'rgb(144,238,144)',
                    'rgb(255,182,193)',
                    'rgb(210,210,250)',
                    'rgb(3, 252, 248)',
                    'rgb(3, 252, 32)',
                    'rgb(252, 235, 3)',
                    
                ],
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
            legend: {
                position: 'right'
            }
        }
    });
    
});