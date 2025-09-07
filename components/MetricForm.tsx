
import React, { useState, useEffect } from 'react';
import type { Metric, MetricData } from '../types';

interface MetricFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: MetricData) => void;
    initialData: Metric | null;
}

const MetricForm: React.FC<MetricFormProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const getInitialState = () => {
        return {
            fecha: initialData ? initialData.fecha : new Date().toISOString().split('T')[0],
            peso: initialData ? initialData.peso : '' as any,
            grasaCorporal: initialData ? initialData.grasaCorporal : '' as any,
            hidratacion: initialData ? initialData.hidratacion : '' as any,
            masaMuscular: initialData ? initialData.masaMuscular : '' as any,
            imc: initialData ? initialData.imc : '' as any,
        };
    };

    const [formData, setFormData] = useState<MetricData>(getInitialState());

    useEffect(() => {
        setFormData(getInitialState());
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value === '' ? '' : Number(value)
        }));
    };
    
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, fecha: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-6 text-cyan-400">{initialData ? 'Editar Métrica' : 'Añadir Nueva Métrica'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="fecha" className="block text-sm font-medium text-gray-300">Fecha</label>
                        <input
                            type="date"
                            id="fecha"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleDateChange}
                            required
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="peso" className="block text-sm font-medium text-gray-300">Peso (kg)</label>
                            <input type="number" step="0.1" name="peso" id="peso" value={formData.peso} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                        </div>
                        <div>
                            <label htmlFor="grasaCorporal" className="block text-sm font-medium text-gray-300">% Grasa Corporal</label>
                            <input type="number" step="0.1" name="grasaCorporal" id="grasaCorporal" value={formData.grasaCorporal} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                        </div>
                        <div>
                           <label htmlFor="hidratacion" className="block text-sm font-medium text-gray-300">% Hidratación</label>
                            <input type="number" step="0.1" name="hidratacion" id="hidratacion" value={formData.hidratacion} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                        </div>
                        <div>
                            <label htmlFor="masaMuscular" className="block text-sm font-medium text-gray-300">% Masa Muscular</label>
                            <input type="number" step="0.1" name="masaMuscular" id="masaMuscular" value={formData.masaMuscular} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                        </div>
                         <div>
                            <label htmlFor="imc" className="block text-sm font-medium text-gray-300">IMC</label>
                            <input type="number" step="0.1" name="imc" id="imc" value={formData.imc} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                        </div>
                    </div>
                    <div className="flex justify-end pt-4 space-x-4">
                        <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                            Cancelar
                        </button>
                        <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MetricForm;
