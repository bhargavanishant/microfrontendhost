import React, { useEffect, useState } from 'react';

interface NetworkEntry {
    url: string;
    method: string;
    headers: HeadersInit | undefined;
    status: number;
    duration: number;
    body: string;
}

interface NetworkMonitorProps {
    onCapture: (data: NetworkEntry[]) => void;
}

export default function NewerNetworkMonitor({ onCapture }: NetworkMonitorProps) {
    const [networkData, setNetworkData] = useState<NetworkEntry[]>([]);

    useEffect(() => {
        const originalFetch = window.fetch;

        // Function to check if the request is a REST API request
        const isApiRequest = (url: string, method?: string) => {
            // TODO: Incase of advance features
            //const apiUrlPatterns = ['']; // Adjust these patterns as needed
            const apiMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

            // return apiUrlPatterns.some(pattern => url.includes(pattern)) &&
            //        (method ? apiMethods.includes(method) : apiMethods.includes('GET'));
            return method ? apiMethods.includes(method) : apiMethods.includes('GET');
        };

        window.fetch = async (...args) => {
            const url = args[0] as string;
            const method = args[1]?.method || 'GET';

            if (isApiRequest(url, method)) {
                const startTime = performance.now();
                const response = await originalFetch(...args);
                const clonedResponse = response.clone();

                clonedResponse.text().then((body) => {
                    const duration = performance.now() - startTime;
                    const entry: NetworkEntry = {
                        url,
                        method,
                        headers: args[1]?.headers,
                        status: response.status,
                        duration,
                        body,
                    };
                    setNetworkData((prevData) => [...prevData, entry]);
                });

                return response;
            } else {
                // Continue with the original fetch for non-API requests
                return originalFetch(...args);
            }
        };

        return () => {
            // No need to clean up fetch override since it's global for the app's lifetime
        };
    }, []);

    useEffect(() => {
        if (networkData.length > 0) {
            onCapture(networkData);
        }
    }, [networkData, onCapture]);

    return (
        <></>
        // <div>
        //     <h3>Network Monitoring Active</h3>
        //     <button onClick={() => console.log(networkData)}>Log Network Data</button>
        // </div>
    );
}
