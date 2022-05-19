export const registerUser = async values => {

    try {
        const res = await fetch(`http:/192.168.1.14:8000/api/users`,
            {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-Type": "application/json" }
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

export const loginUser = async values => {
    const { email, password } = values;

    try {
        const res = await fetch(`http:/192.168.1.14:8000/api/users/login`,
            {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-Type": "application/json" }
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
