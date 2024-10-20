import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function CoinChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid stroke="#214f4b" strokeDasharray="5 5" />
                <XAxis
                    stroke="#000"
                    tick={{ fontSize: 16, fontWeight: '500', fill: '#000', fontFamily: 'Roboto' }}
                    dataKey="timestamp"

                />
                <YAxis
                    stroke="#000"
                    tick={{ fontSize: 18, fontWeight: '500', fill: '#000', fontFamily: 'Roboto' }}
                    dataKey="price"
                />
                <Tooltip
                    cursor={{ stroke: '#214f4b', strokeWidth: 3, strokeDasharray: '5 5' }}
                    contentStyle={{ backgroundColor: '#000', color: '#fff', border: '2px solid #3DA35D' }}
                />
                <Area type="monotone" dataKey="price" stroke="#8884d8" fill="#A18402" />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default CoinChart;
