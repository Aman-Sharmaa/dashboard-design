(function (jQuery) {
    "use strict";
    let lastDate = 0
    let TICKINTERVAL = 864e5;
    let XAXISRANGE = 7776e5;
    const chartFunction = {
        chartDummySearies: (e, t, refData) => {
            let data = refData
            const a = e + TICKINTERVAL;
            lastDate = a;
            for (let n = 0; n < data.length - 50; n++) data[n].x = a - XAXISRANGE - TICKINTERVAL, data[n].y = 0;
            data.push({
                x: a,
                y: Math.floor(Math.random() * (t.max - t.min + 1)) + t.min
            })
            return data
        },
        generateDayWiseTimeSeries(baseval, count, yrange) {
            let i = 0;
            let series = [];
            while (i < count) {
                let x = baseval;
                let y =
                    Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

                series.push([x, y]);
                baseval += 86400000;
                i++;
            }
            return series;
        }
    }
//apex
if (jQuery(".table-chart").length) {
    const charts = document.querySelectorAll('.table-chart')
    Array.from(charts,(elem) => {
        let data = []
        var options = {
            series: [{
                name: "Desktops",
                data: data.slice()
            }],
            chart: {
                height: 60,
                type: 'area',
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 1e3
                    }
                },
                sparkline: {
                    enabled: true,
                }
            },
            tooltip: {
                enabled: false,
            },
            colors: [elem.getAttribute('data-color')],
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 2
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                range: XAXISRANGE,
            },
            yaxis: {
                max: 100
            },
        };
        if (typeof ApexCharts !== typeof undefined) {
            var chart = new ApexCharts(document.getElementById(elem.getAttribute('id')), options);
            chart.render();
            setInterval(() => {
                data = chartFunction.chartDummySearies(lastDate, {
                    min: 10,
                    max: 90
                }, data)
                chart.updateSeries([{
                    'data': data
                }])
            }, 1e3)
        }
    })
}
})(jQuery)

