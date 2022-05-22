import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

const useFetch = (url, ...args) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        const controller = new AbortController();
        async function fetchData() {
            const token = await SecureStore.getItemAsync("token");

            try {
                const res = await fetch(url,
                    {
                        method: "GET",
                        signal: controller.signal,
                        headers: {
                            "Authorization": `Bearer, ${token}`
                        }
                    });
                if (!res.ok) {
                    throw new Error("Failed to fetch the data");
                }
                const fetchedData = await res.json();
                setData(fetchedData);
                setIsPending(false);
                setError(null);
            } catch (error) {
                setError(error);
                setIsPending(false);
            }
        }
        fetchData();
        return () => controller.abort();
    }, [url])

    return { data, isPending, error }
}

export default useFetch;
