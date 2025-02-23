const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const setupUser = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/setupCatCount`, {
            method: "POST",
            headers: { "x-api-key": API_KEY, "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        return await response.json();
    } catch (error) {
        console.error("Error setting up user:", error);
        return null;
    }
};

export const fetchCatCount = async (userId: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/getCatCount/${userId}`, {
            method: "GET",
            headers: { "x-api-key": API_KEY },
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        return await response.json();
    } catch (error) {
        console.error("Error fetching cat count:", error);
        return null;
    }
};

export const updateCatCountInDB = async (userId: string, count: number) => {
    try {
        await fetch(`${API_BASE_URL}/modifyCatCount/${userId}`, {
            method: "PUT",
            headers: { "x-api-key": API_KEY, "Content-Type": "application/json" },
            body: JSON.stringify({ catCount: count }),
        });

        console.log(`Cat Count Updated Successfully to ${count}`);
    } catch (error) {
        console.error("Error updating cat count:", error);
    }
};