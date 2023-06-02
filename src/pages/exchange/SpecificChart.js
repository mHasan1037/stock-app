import React from 'react'
import Chart from 'react-apexcharts'
import dayjs from 'dayjs';

const SpecificChart = ({stockThirtyValues, name}) => {
    let series = [
        {
          name: 'candle',
          data: [],
        },
      ];


     for(var i = 0; i < stockThirtyValues.length; i++){
        const {datetime, open, close, high, low} = stockThirtyValues[i]

        series[0].data.push(
            {
              x: new Date(datetime),
              y: [open, high, low, close],
            }
           )
     }


      const options = {
        chart: {
          height: 350,
          type: 'candlestick',
        },
        title: {
          text: `Last 30 days data of ${name}`,
          align: 'left',
        },
        annotations: {
          xaxis: [
            {
              x: 'Oct 06',
              borderColor: '#00E396',
              label: {
                borderColor: '#00E396',
                style: {
                  fontSize: '12px',
                  color: '#fff',
                  background: '#00E396',
                },
                orientation: 'horizontal',
                offsetY: 7,
                text: 'Annotation Test',
              },
            },
          ],
        },
        tooltip: {
          enabled: true,
        },
        xaxis: {
          type: 'category',
          labels: {
            formatter: (val) => {
              return dayjs(val).format('MMM DD');
            },
          },
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
      };

  return (
    <Chart 
        options={options}
        series={series}
        type="candlestick"
        width="100%"
        height="100%"
        background = 'green'
    />
  )
}

export default SpecificChart