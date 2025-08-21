import React, { useEffect, useState } from 'react';
import MainContainer from "../components/mainContainer";
import Chart from 'chart.js/auto';
import { getStats } from '../utils/api';

const Stats = () => {
  const stats = { 
    "totals": { 
      "expenses": 1250.75, 
      "income": 3000.00, 
      "balance": 1749.25
    }, 
    "expenses_by_category": [ 
      { 
        "name": "Продукты",
        "color": "#FF6B6B", 
        "total": 450.25 
      }, 
      { 
        "name": "Транспорт", 
        "color": "#4ECDC4", 
        "total": 200.50 
      }
    ], 
    "income_by_category": [ 
      { 
        "name": "Зарплата", 
        "color": "#55A3FF", 
        "total": 3000.00 
      }
    ], 
    "monthly_breakdown": [ 
      { 
        "month": "2024-01", 
        "expenses": 1250.75, 
        "income": 3000.00           
      }, 
      { 
        "month": "2023-12", 
        "expenses": 1100.00, 
        "income": 2800.00 
      } 
    ]
  } 

  const [data, setData] = useState(stats.expenses_by_category)
  const [dateFrom, setDateFrom] = useState(new Date().toISOString().split('T')[0].slice(0, -2) + '01');
  const [dateTo, setDateTo] = useState(new Date().toISOString().split('T')[0]); 

  useEffect(() => {

    const ctx = document.getElementById('myChart').getContext('2d');

    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.map(item => item.name),
        datasets: [{
          label: '# of Votes',
          data: data.map(item => item.total),
          backgroundColor: data.map(item => item.color),
          // borderColor: [
          //   'rgba(255, 99, 132, 1)',
          //   'rgba(54, 162, 235, 1)',
          //   'rgba(255, 206, 86, 1)'
          // ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              generateLabels: (chart) => {
                const data = chart.data;
                const total = data.datasets[0].data.reduce((sum, value) => sum + value, 0);
                return data.labels.map((label, index) => {
                  const value = data.datasets[0].data[index];
                  const percentage = ((value / total) * 100).toFixed(2);
                  return {
                    text: `${label}: ${value} (${percentage}%)`,
                    fillStyle: data.datasets[0].backgroundColor[index],
                    hidden: false,
                    index: index,
                  };
                });
              }
            }
          },
          title: {
            display: true,
            text: 'Статистика расходов',
          }
        }
      }      
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <MainContainer>
      <h1>Статистика</h1>
      <p>Период</p>
      <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}/>
      <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}/>
      <button>Выбрать</button>
      <canvas id="myChart" width="400" height="400"></canvas>
    </MainContainer>
  );
}

export default Stats;