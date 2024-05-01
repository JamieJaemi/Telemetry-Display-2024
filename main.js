var logId = 0;

function CREATEGRAPH(chartId, graphLabel, dataTable) {
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
    var fetchData = function() {
        $.ajax({
            url: 'connection.php',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                var chartData = data.Velocity[logId];
                if (chartData && chartData.time !== myChart.data.labels[logId]) {
                    myChart.data.labels.push(chartData.time);
                    myChart.data.datasets[0].data.push(chartData.sensor_value);
                    // Update the chart
                    myChart.update();
                    logId++;
                }
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });
    };

    // Initial fetch and update every 2 seconds
    fetchData();
    setInterval(fetchData, 2000);
}
