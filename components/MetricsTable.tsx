
import React from 'react';
import type { Metric } from '../types';

interface MetricsTableProps {
    metrics: Metric[];
    onEdit: (metric: Metric) => void;
    onDelete: (id: string) => void;
}

const MetricsTable: React.FC<MetricsTableProps> = ({ metrics, onEdit, onDelete }) => {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        return date.toLocaleDateString('es-ES', options);
    };

    if (metrics.length === 0) {
        return <p className="text-center text-gray-400 mt-4">No se encontraron registros. ¡Añade uno para empezar!</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700/50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Fecha</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Peso</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">% Grasa Corporal</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">% Hidratación</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">% Masa Muscular</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">IMC</th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Acciones</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {metrics.map((metric) => (
                        <tr key={metric._id} className="hover:bg-gray-700/50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{formatDate(metric.fecha)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{metric.peso} kg</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{metric.grasaCorporal}%</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{metric.hidratacion}%</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{metric.masaMuscular}%</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{metric.imc}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button onClick={() => onEdit(metric)} className="text-indigo-400 hover:text-indigo-300 mr-4">Editar</button>
                                <button onClick={() => onDelete(metric._id)} className="text-red-500 hover:text-red-400">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MetricsTable;
