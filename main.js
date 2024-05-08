var logId = 0;

function CREATEGRAPH(chartId, graphLabel) {
    // Create a new Chart instance

    var ctx = document.getElementById(chartId).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: graphLabel,
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Function to fetch data from the server
    function getdata(dataTable) {
        $.ajax({
            url: 'connection.php',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
            console.log(data['Throttle_Position'][5]);
                var chartData = data['Throttle_Position'][logId];
            console.log(chartData.sensor_value);
                
                    myChart.data.labels.push(logId);
                    myChart.data.datasets[0].data.push(chartData.sensor_value);
                    // Update the chart
                    myChart.update();
                    logId++;
			              
                
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    // Initial fetch and update every 2 seconds
    getdata("Battery_life");
    setInterval(function() {
        getdata("Battery_Life");
    }, 1000);

}

function downloadFileFromServer() {
    // URL of the PHP file that serves the file for download
    var phpFileUrl = 'download2.php';

    // AJAX request to download the file
    var xhr = new XMLHttpRequest();
    xhr.open('GET', phpFileUrl, true);
    xhr.responseType = 'blob';

    xhr.onload = function() {
        if (xhr.status === 200) {
            // Create a temporary anchor element
            var downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(xhr.response);
            downloadLink.download = 'test.csv'; // Specify the default filename for download
            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };

    xhr.send();
}

function downloadCSV() {
    // Make AJAX request to download.php
    $.ajax({
        url: 'download.php',
        method: 'GET',
        xhrFields: {
            responseType: 'blob' // Set the response type to blob (binary data)
        },
        success: function(data) {
            // Create a temporary URL to the blob data
            var url = window.URL.createObjectURL(data);

            // Create a temporary link element
            var a = $('<a>', {
                href: url,
                download: 'data.csv' // File name
            }).appendTo('body');

            // Trigger click event to download
            a[0].click();

            // Clean up - remove the temporary link and release the object URL
            a.remove();
            window.URL.revokeObjectURL(url);
        },
        error: function(xhr, status, error) {
            console.error('Error downloading CSV:', error);
        }
    });
}
