import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(
        localStorage.getItem('currentUser')
            ? { email: localStorage.getItem('currentUser') }
            : null,
    );

    function signUp(newUser) {
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.find((user) => newUser.email === user.email)) {
            return { success: false, error: 'Email already exists.' };
        }

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', newUser.email);

        setUser(newUser);

        return { success: true };
    }

    function login(user) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.find(
            (u) => user.email == u.email && user.password === u.password,
        );

        if (!userExists) {
            return { success: false, error: "User doesn't exists." };
        }

        localStorage.setItem('currentUser', user.email);
        setUser(user);

        return { success: true };
    }

    function logout() {
        localStorage.removeItem('currentUser');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ signUp, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}
