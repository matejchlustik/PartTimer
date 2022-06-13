export const registerUser = async values => {

    try {
        const res = await fetch(`https://api-part-timer.herokuapp.com/api/users`,
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

    try {
        const res = await fetch(`https://api-part-timer.herokuapp.com/api/users/login`,
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
