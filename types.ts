
export interface Metric {
  _id: string;
  fecha: string; // ISO date string: "YYYY-MM-DD"
  peso: number;
  grasaCorporal: number;
  hidratacion: number;
  masaMuscular: number;
  imc: number;
}

export type MetricData = Omit<Metric, '_id'>;

export type MetricKey = 'peso' | 'grasaCorporal' | 'hidratacion' | 'masaMuscular' | 'imc';

export interface MetricConfig {
    label: string;
    color: string;
    normalRange?: [number, number];
    fontColor?: string;
}
