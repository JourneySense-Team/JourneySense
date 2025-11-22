// src/services/AuthService.ts

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    role: "APPRENTICE" | "HUBMASTER" | "ADMIN";
}

export interface LoginRequest {
    usernameOrEmail: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    userId: string;
    username: string;
    email: string;
    role: string;
}

const API_URL = "http://localhost:8080/api/auth";

class AuthenticationService {

    // Expects 1 argument (LoginRequest object)
    async login(request: LoginRequest): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Login failed');
        }

        const data: AuthResponse = await response.json();

        if (data.token) {
            // 1. Destructure to extract the token
            const { token, ...userData } = data;

            // 2. Save token separately (standard practice)
            localStorage.setItem('token', token);

            // 3. Save user data WITHOUT the token to avoid redundancy/leakage
            localStorage.setItem('user', JSON.stringify(userData));
        }
        return data;
    }

    // Expects 1 argument (RegisterRequest object)
    async register(request: RegisterRequest) {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Registration failed');
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return await response.json();
        } else {
            return await response.text();
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        if (userStr) return JSON.parse(userStr);
        return null;
    }
}

export const AuthService = new AuthenticationService();