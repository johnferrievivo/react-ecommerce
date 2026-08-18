import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const [mode, setMode] = useState('signup');
    const [error, setError] = useState(null);
    const { signUp, login } = useContext(AuthContext);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    function onSubmit(data) {
        setError(null);
        let response;
        if (mode === 'signup') {
            response = signUp(data);
        } else {
            response = login(data);
        }

        if (response.success) {
            navigate('/');
        } else {
            setError(response.error);
        }
    }

    return (
        <div className="page">
            <div className="container">
                <div className="auth-container">
                    <h1 className="page-title">
                        {mode === 'signup' ? 'Sign Up' : 'Login'}
                    </h1>
                    <form action={handleSubmit(onSubmit)} className="auth-form">
                        {error && <div className="error-message">{error}</div>}
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                className="form-input"
                                type="email"
                                id="email"
                                {...register('email', {
                                    required: 'Email is required.',
                                })}
                            />
                            {errors.email && (
                                <span className="form-error">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                className="form-input"
                                type="password"
                                id="password"
                                {...register('password', {
                                    required: 'Password is required.',
                                    minLength: {
                                        value: 6,
                                        message:
                                            'Password must be between 6 to 12 characters',
                                    },
                                    maxLength: {
                                        value: 12,
                                        message:
                                            'Password must be between 6 to 12 characters',
                                    },
                                })}
                            />
                            {errors.password && (
                                <span className="form-error">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-large"
                        >
                            {mode === 'signup' ? 'Sign Up' : 'Login'}
                        </button>
                    </form>

                    <div className="auth-switch">
                        {mode === 'signup' ? (
                            <p>
                                Already have an account?{' '}
                                <span
                                    className="auth-link"
                                    onClick={() => setMode('login')}
                                >
                                    Login
                                </span>
                            </p>
                        ) : (
                            <p>
                                Don't have an account?{' '}
                                <span
                                    className="auth-link"
                                    onClick={() => setMode('signup')}
                                >
                                    Sign Up
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
