
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Metric, MetricData, MetricKey } from './types';
import { METRIC_CONFIG } from './constants';
import { getMetrics, createMetric, updateMetric, deleteMetric } from './services/api';
import Header from './components/Header';
import MetricsChart from './components/MetricsChart';
import MetricsTable from './components/MetricsTable';
import MetricForm from './components/MetricForm';

const App: React.FC = () => {
    const [metrics, setMetrics] = useState<Metric[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editingMetric, setEditingMetric] = useState<Metric | null>(null);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

    const [visibleMetrics, setVisibleMetrics] = useState<Record<MetricKey, boolean>>({
        peso: true,
        grasaCorporal: true,
        hidratacion: true,
        masaMuscular: true,
        imc: true,
    });

    const [filter, setFilter] = useState<{ year: string, month: string }>({ year: 'all', month: 'all' });

    const fetchMetrics = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getMetrics();
            const sortedData = data.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
            setMetrics(sortedData);
            setError(null);
        } catch (err) {
            setError('Error al cargar las métricas.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMetrics();
    }, [fetchMetrics]);

    const handleFormSubmit = async (data: MetricData) => {
        try {
            if (editingMetric) {
                const updated = await updateMetric(editingMetric._id, data);
                setMetrics(metrics.map(m => m._id === updated._id ? updated : m).sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()));
            } else {
                const created = await createMetric(data);
                setMetrics([...metrics, created].sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()));
            }
            setIsFormOpen(false);
            setEditingMetric(null);
        } catch (err) {
            setError('Error al guardar la métrica.');
            console.error(err);
        }
    };

    const handleEdit = (metric: Metric) => {
        setEditingMetric(metric);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este registro?')) {
            try {
                await deleteMetric(id);
                setMetrics(metrics.filter(m => m._id !== id));
            } catch (err) {
                setError('Error al eliminar la métrica.');
                console.error(err);
            }
        }
    };

    const handleAddNew = () => {
        setEditingMetric(null);
        setIsFormOpen(true);
    };

    const toggleMetricVisibility = (key: MetricKey) => {
        setVisibleMetrics(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const filterOptions = useMemo(() => {
        const years = new Set<string>();
        const months = new Set<string>();
        metrics.forEach(m => {
            const date = new Date(m.fecha);
            years.add(date.getFullYear().toString());
            months.add((date.getMonth() + 1).toString().padStart(2, '0'));
        });
        return {
            years: Array.from(years).sort((a, b) => parseInt(b) - parseInt(a)),
            months: Array.from(months).sort()
        };
    }, [metrics]);

    const filteredMetrics = useMemo(() => {
        if (filter.year === 'all' && filter.month === 'all') {
            return metrics;
        }
        return metrics.filter(m => {
            const date = new Date(m.fecha);
            const yearMatch = filter.year === 'all' || date.getFullYear().toString() === filter.year;
            const monthMatch = filter.month === 'all' || (date.getMonth() + 1).toString().padStart(2, '0') === filter.month;
            return yearMatch && monthMatch;
        });
    }, [metrics, filter]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-6 lg:p-8">
            <Header />
            <main className="container mx-auto mt-8">
                {loading && <p className="text-center">Cargando datos...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                {!loading && !error && (
                    <>
                        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mb-8">
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">Gráfico de Evolución</h2>
                            <div className="flex flex-wrap gap-4 mb-6 items-center">
                                {/* Filters */}
                                <div>
                                    <label htmlFor="year-filter" className="text-sm mr-2">Año:</label>
                                    <select id="year-filter" value={filter.year} onChange={e => setFilter(f => ({ ...f, year: e.target.value }))} className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white">
                                        <option value="all">Todos</option>
                                        {filterOptions.years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="month-filter" className="text-sm mr-2">Mes:</label>
                                    <select id="month-filter" value={filter.month} onChange={e => setFilter(f => ({ ...f, month: e.target.value }))} className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white">
                                        <option value="all">Todos</option>
                                        {filterOptions.months.map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                                {(Object.keys(METRIC_CONFIG) as MetricKey[]).map(key => (
                                    <button
                                        key={key}
                                        onClick={() => toggleMetricVisibility(key)}
                                        className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${visibleMetrics[key] ? 'shadow-md' : 'bg-gray-700 text-gray-400'}`}
                                        style={{
                                            backgroundColor: visibleMetrics[key] ? METRIC_CONFIG[key].color : undefined,
                                            color: visibleMetrics[key] ? METRIC_CONFIG[key].fontColor : undefined,
                                        }}

                                    >
                                        {METRIC_CONFIG[key].label}
                                    </button>
                                ))}
                            </div>
                            <div className="mb-6">
                                <MetricsChart data={filteredMetrics} visibleMetrics={visibleMetrics} />
                            </div>
                        </div>

                        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl sm:text-2xl font-bold text-cyan-400">Registros</h2>
                                <button onClick={handleAddNew} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                    Añadir Nuevo
                                </button>
                            </div>
                            <MetricsTable metrics={filteredMetrics} onEdit={handleEdit} onDelete={handleDelete} />
                        </div>
                    </>
                )}

                {isFormOpen && (
                    <MetricForm
                        isOpen={isFormOpen}
                        onClose={() => setIsFormOpen(false)}
                        onSubmit={handleFormSubmit}
                        initialData={editingMetric}
                    />
                )}
            </main>
        </div>
    );
};

export default App;
