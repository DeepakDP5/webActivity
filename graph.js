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
                    'rgba(148, 0, 211, 0.9)',
                    'rgba(152, 250, 95, 0.9)',
                    'rgba(135, 62, 35, 0.9)',
                    'rgba(252, 3, 90, 0.9)',
                    'rgba(215, 3, 252, 0.9)',
                    'rgba(3, 78, 252, 0.9)',
                    'rgba(3, 252, 248, 0.9)',
                    'rgba(3, 252, 32, 0.9)',
                    'rgba(252, 235, 3, 0.9)',
                    'rgba(252, 3, 3,0.9)'
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