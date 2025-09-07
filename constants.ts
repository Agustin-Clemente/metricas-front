
import type { MetricKey, MetricConfig } from './types';

export const METRIC_CONFIG: Record<MetricKey, MetricConfig> = {
    peso: {
        label: 'Peso (kg)',
        color: '#d884a6ff',
        fontColor: '#0d0d09ff'

    },
    grasaCorporal: {
        label: '% Grasa Corporal',
        color: '#dcf80dff',
        normalRange: [14, 19],
        fontColor: '#0d0d09ff'
    },
    hidratacion: {
        label: '% Hidratación',
        color: '#58ffffff',
        normalRange: [50, 65],
        fontColor: 'black'
    },
    masaMuscular: {
        label: '% Masa Muscular',
        color: '#ff8042',
        normalRange: [41, 52],
        fontColor: '#0d0d09ff'

    },
    imc: {
        label: 'IMC',
        color: '#00C49F',
        normalRange: [18.5, 25],
        fontColor: '#0d0d09ff'

    }
};
