
var logId = 0;

function CREATEGRAPH(chartId, graphLabel, dataTable,) {
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
    // possible issues with function arguements fix later
    var getdata = function() {
        $.ajax({
            url: 'connection.php',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
            chartData = data.Velocity[logId]
            if (chartData.time !== myChart.data.labels[logId]) {
                    myChart.data.labels.push(chartData.time);
                    myChart.data.datasets[logId].data.push(chartData.sensor_value);
                     // Update the chart
                 myChart.update();
                logId++;
        }
        
        else{
        
        }
        
               
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });
    }(dataTable);
}
    // Initial fetch and update every 2 seconds
    getdata();
    
    
    setInterval(getdata, 2000);

    function downloadCSV() {
        // Make AJAX request to download.php
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'download.php', true);
        xhr.responseType = 'blob'; // Response type as blob (binary data)
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Create a temporary link to the file
                var url = window.URL.createObjectURL(xhr.response);
                var a = document.createElement('a');
                a.href = url;
                a.download = 'data.csv'; // File name
                document.body.appendChild(a);
                a.click(); // Trigger click event to download
                window.URL.revokeObjectURL(url); // Release the object URL
            }
        };
        xhr.send();
      }
