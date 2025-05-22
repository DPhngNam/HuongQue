'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { month: 'Jan', returningRate: 35, new: 120 },
  { month: 'Feb', returningRate: 42, new: 150 },
  { month: 'Mar', returningRate: 38, new: 140 },
  { month: 'Apr', returningRate: 50, new: 160 },
  { month: 'May', returningRate: 47, new: 170 },
  { month: 'Jun', returningRate: 55, new: 200 },
];

export default function ReturningRateChart() {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" tickFormatter={(value) => `${value}%`} />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip
            formatter={(value: any, name: string) =>
              name === 'returningRate' ? `${value}%` : value
            }
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="returningRate"
            name="Returning Rate"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="new"
            name="New Users"
            stroke="#82ca9d"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
