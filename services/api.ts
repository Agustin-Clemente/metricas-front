import type { Metric, MetricData } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Handles the response from the fetch API.
 * @param response The response object from a fetch call.
 * @returns The JSON parsed response body.
 * @throws An error if the response is not OK.
 */
const handleResponse = async (response: Response) => {
    if (!response.ok) {
        // Try to parse error message from response body, otherwise use status text
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(errorData.message || 'An API error occurred');
    }
    
    // For DELETE requests or other responses with no content
    if (response.status === 204 || response.headers.get('content-length') === '0') {
        return null;
    }

    return response.json();
};

export const getMetrics = async (): Promise<Metric[]> => {
    const response = await fetch(API_URL);
    return await handleResponse(response);
};

export const createMetric = async (data: MetricData): Promise<Metric> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return await handleResponse(response);
};

export const updateMetric = async (id: string, data: MetricData): Promise<Metric> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return await handleResponse(response);
};

export const deleteMetric = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    await handleResponse(response);
};
