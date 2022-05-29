import * as SecureStore from 'expo-secure-store';

export const getSearchOffers = async searchQuery => {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 10000);
    try {
        const res = await fetch(`http:/192.168.1.17:8000/api/offers/search/${searchQuery}`,
            {
                method: "GET",
                signal: controller.signal,
            });
        if (!res.ok) {
            throw new Error("Failed to fetch the data");
        }
        return await res.json();
    } catch (error) {
        return error;
    }
}

export const postOffer = async values => {
    const token = await SecureStore.getItemAsync("token");

    try {
        const res = await fetch(`http:/192.168.1.17:8000/api/offers`,
            {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer, ${token}`
                }
            });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
    }
}

export const updateOffer = async (values, id) => {
    const token = await SecureStore.getItemAsync("token");

    try {
        const res = await fetch(`http:/192.168.1.17:8000/api/offers/${id}`,
            {
                method: "PUT",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer, ${token}`
                }
            });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
    }
}

export const deleteOffer = async (id) => {
    const token = await SecureStore.getItemAsync("token");

    try {
        const res = await fetch(`http:/192.168.1.17:8000/api/offers/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer, ${token}`
                }
            });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
    }
}
