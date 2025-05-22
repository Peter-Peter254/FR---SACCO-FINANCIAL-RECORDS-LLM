const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export class ApiService {
    static async request(path, method = 'GET', body = null, authenticated = false) {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (authenticated) {
            const token = sessionStorage.getItem('token');
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }

        const res = await fetch(`${BASE_URL}${path}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        const data = await res.json();

        if (!res.ok) {
            const message = data?.detail || 'API Error';
            throw new Error(message);
        }

        return data;
    }

    static get(path, authenticated = false) {
        return this.request(path, 'GET', null, authenticated);
    }

    static post(path, body, authenticated = false) {
        return this.request(path, 'POST', body, authenticated);
    }

    static put(path, body, authenticated = false) {
        return this.request(path, 'PUT', body, authenticated);
    }

    static delete(path, authenticated = false) {
        return this.request(path, 'DELETE', null, authenticated);
    }
}
