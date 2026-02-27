import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { login } from '../redux/slices/authSlice';
import authService from '../services/authService';
import { Mail, Lock, Loader2, Dumbbell } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await authService.login(email, password);
            dispatch(login(data));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full glass-card p-8 lg:p-10"
            >
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center space-x-2 mb-4">
                        <Dumbbell className="h-10 w-10 text-primary" />
                        <span className="text-2xl font-bold text-white tracking-tight">Gym<span className="text-primary">Pro</span></span>
                    </Link>
                    <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
                    <p className="text-slate-400 mt-2">Enter your credentials to access your portal</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                            <input
                                type="email"
                                required
                                className="w-full pl-11 input-field"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                            <input
                                type="password"
                                required
                                className="w-full pl-11 input-field"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full primary-button py-3 flex items-center justify-center disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sign In Now'}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <p className="text-slate-400 text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary font-semibold hover:underline decoration-2 underline-offset-4">
                            Create an Account
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
