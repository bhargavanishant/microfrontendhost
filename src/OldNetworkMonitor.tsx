import React, { useEffect, useState } from 'react';

interface NetworkEntry {
    url: string;
    method: string;
    headers: HeadersInit | undefined;
    status: number;
    duration: number;
    body: string;
}

interface ResourceTimingEntry {
    name: string;
    entryType: string;
    startTime: number;
    duration: number;
    initiatorType: string;
    nextHopProtocol: string;
}

interface NetworkMonitorProps {
    onCapture: (data: (NetworkEntry | ResourceTimingEntry)[]) => void;
}

export default function OldNetworkMonitor({ onCapture }: NetworkMonitorProps) {
    const [networkData, setNetworkData] = useState<(NetworkEntry | ResourceTimingEntry)[]>([]);

    useEffect(() => {
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            const startTime = performance.now();
            const response = await originalFetch(...args);
            const clonedResponse = response.clone();

            clonedResponse.text().then((body) => {
                const duration = performance.now() - startTime;
                const entry: NetworkEntry = {
                    url: args[0] as string,
                    method: (args[1]?.method || 'GET'),
                    headers: args[1]?.headers,
                    status: response.status,
                    duration,
                    body,
                };
                setNetworkData((prevData) => [...prevData, entry]);
            });

            return response;
        };

        const logResourceTimings = () => {
            const entries = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
            const entryData: ResourceTimingEntry[] = entries.map((entry) => ({
                name: entry.name,
                entryType: entry.entryType,
                startTime: entry.startTime,
                duration: entry.duration,
                initiatorType: entry.initiatorType,
                nextHopProtocol: entry.nextHopProtocol,
            }));
            setNetworkData((prevData) => [...prevData, ...entryData]);
        };

        window.addEventListener('load', logResourceTimings);

        return () => {
            window.removeEventListener('load', logResourceTimings);
        };
    }, []);

    useEffect(() => {
        if (networkData.length > 0) {
            onCapture(networkData);
        }
    }, [networkData, onCapture]);

    return (
        <>
        </>
        // <div>
        //     <h3>Network Monitoring Active</h3>
        //     <button onClick={() => console.log(networkData)}>Download Network Data</button>
        // </div>
    );
}
