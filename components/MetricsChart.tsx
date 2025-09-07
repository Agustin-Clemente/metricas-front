
import React from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ReferenceArea } from 'recharts';
import type { Metric, MetricKey } from '../types';
import { METRIC_CONFIG } from '../constants';

interface MetricsChartProps {
    data: Metric[];
    visibleMetrics: Record<MetricKey, boolean>;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric', timeZone: 'UTC' });
};

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-700 p-4 border border-gray-600 rounded-lg shadow-xl">
                <p className="font-bold text-white">{`Fecha: ${formatDate(label)}`}</p>
                {payload.map((p: any) => (
                    <p key={p.name} style={{ color: p.color }}>
                        {`${p.name}: ${p.value.toFixed(2)}`}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const MetricsChart: React.FC<MetricsChartProps> = ({ data, visibleMetrics }) => {
    const chartData = data.map(metric => ({
        ...metric,
        // recharts needs the x-axis key to be consistent
        date: metric.fecha,
    }));

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                    <XAxis dataKey="date" tickFormatter={formatDate} stroke="#A0AEC0" />
                    <YAxis stroke="#A0AEC0" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
  verticalAlign="bottom"
  height={36}
  wrapperStyle={{
    marginBottom: 10,

    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }}
/>

                    
                    {(Object.keys(METRIC_CONFIG) as MetricKey[]).map(key => {
                        const config = METRIC_CONFIG[key];
                        if (visibleMetrics[key] && config.normalRange) {
                            return (
                                <ReferenceArea
                                    key={`ref-${key}`}
                                    y1={config.normalRange[0]}
                                    y2={config.normalRange[1]}
                                    stroke="none"
                                    fill={config.color}
                                    fillOpacity={0.1}
                                    ifOverflow="visible"
                                />
                            );
                        }
                        return null;
                    })}

                    {(Object.keys(METRIC_CONFIG) as MetricKey[]).map(key => {
                        if (visibleMetrics[key]) {
                            return (
                                <Line
                                    key={key}
                                    type="monotone"
                                    dataKey={key}
                                    name={METRIC_CONFIG[key].label}
                                    stroke={METRIC_CONFIG[key].color}
                                    strokeWidth={2}
                                    dot={{ r: 4, fill: METRIC_CONFIG[key].color }}
                                    activeDot={{ r: 8 }}
                                />
                            );
                        }
                        return null;
                    })}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MetricsChart;
