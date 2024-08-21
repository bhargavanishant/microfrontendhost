import { useEffect, useState } from 'react';

export interface NetworkEntry {
    url: string;
    method: string;
    headers: HeadersInit | undefined;
    status: number;
    duration: number;
    body: string;
}

export interface TelemetryData {
    ip: string;
    browserVersion: string;
    operatingSystem: string;
}

export interface CustomErrorInfo {
    message: string;
    stack?: string;
    componentStack: any;
}

export interface NetworkMonitorInfo {
    networkData: NetworkEntry[];
    telemetryData: TelemetryData;
    errorInfo: CustomErrorInfo;
}

export interface NetworkMonitorProps {
    onCapture: (data: NetworkMonitorInfo) => void;
}

const getBrowserVersion = (): string => {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf('Firefox') > -1) {
        return `Firefox ${navigator.userAgent.match(/Firefox\/([0-9]+)\./)?.[1] || ''}`;
    }
    if (userAgent.indexOf('Chrome') > -1) {
        return `Chrome ${navigator.userAgent.match(/Chrome\/([0-9]+)\./)?.[1] || ''}`;
    }
    if (userAgent.indexOf('Safari') > -1) {
        return `Safari ${navigator.userAgent.match(/Version\/([0-9]+)\./)?.[1] || ''}`;
    }
    if (userAgent.indexOf('MSIE') > -1 || !!document.DOCUMENT_NODE) {
        return 'Internet Explorer';
    }
    return 'Unknown Browser';
};

const getOperatingSystem = (): string => {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf('Windows NT 10.0') > -1) return 'Windows 10';
    if (userAgent.indexOf('Windows NT 6.3') > -1) return 'Windows 8.1';
    if (userAgent.indexOf('Windows NT 6.2') > -1) return 'Windows 8';
    if (userAgent.indexOf('Windows NT 6.1') > -1) return 'Windows 7';
    if (userAgent.indexOf('Macintosh') > -1) return 'Mac OS';
    if (userAgent.indexOf('X11') > -1) return 'Linux';
    if (userAgent.indexOf('Android') > -1) return 'Android';
    if (userAgent.indexOf('like Mac OS X') > -1) return 'iOS';
    return 'Unknown OS';
};

export default function NetworkMonitor({ onCapture }: NetworkMonitorProps) {
    const [networkData, setNetworkData] = useState<NetworkEntry[]>([]);
    const [telemetryData, setTelemetryData] = useState<TelemetryData | null>(null);

    useEffect(() => {
        // Get browser version and operating system
        const browserVersion = getBrowserVersion();
        const operatingSystem = getOperatingSystem();
        const ip = ''; // Placeholder for IP address
        setTelemetryData({ ip, browserVersion, operatingSystem });

        const originalFetch = window.fetch;
        window.fetch = async (...args: [RequestInfo, RequestInit?]) => {
            const startTime = performance.now();
            const response = await originalFetch(...args);
            const clonedResponse = response.clone();

            clonedResponse.text().then((body) => {
                const duration = performance.now() - startTime;
                const method = (args[1]?.method || 'GET') as string;

                // Filter to include only REST API requests
                if (['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(method.toUpperCase())) {
                    const entry: NetworkEntry = {
                        url: args[0] as string,
                        method,
                        headers: args[1]?.headers,
                        status: response.status,
                        duration,
                        body,
                    };
                    setNetworkData((prevData) => [...prevData, entry]);
                }
            });

            return response;
        };

        return () => {
            // Cleanup if needed
        };
    }, []);

    useEffect(() => {
        if (networkData.length > 0 && telemetryData) {
            const existingErrorInfo = { 
                message: '', 
                stack: '', 
                componentStack: '' 
            };

            onCapture({ networkData, telemetryData, errorInfo: existingErrorInfo });
        }
    }, [networkData, telemetryData, null, onCapture]);

    return null; // No visible output from NetworkMonitor
}
