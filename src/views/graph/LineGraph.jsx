
 

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    title: {
        display: true,
        text: 'Services',
      },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept'];

export const data = {
  labels, 
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'brown',
      backgroundColor: 'brown',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'violet',
      backgroundColor: 'violet',
    },
    {
      label: 'Dataset 3',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'green',
      backgroundColor: 'green',
    },
    {
      label: 'Dataset 4',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'red',
      backgroundColor: 'red',
    },
    {
      label: 'Dataset 5',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'blue',
      backgroundColor: 'blue',
    },
  ],
};

export default function LineGraph() {
  return (
    <div>
              <select name="cars" id="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>
        <Line options={options} data={data} />

    </div>
  )
}
