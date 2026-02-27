import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import authService from '../services/authService';
import { User, Mail, Lock, Phone, Loader2, Dumbbell } from 'lucide-react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await authService.register(formData.name, formData.email, formData.password, formData.phone);
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-full h-full -z-10 bg-[radial-gradient(circle_at_100%_100%,rgba(168,85,247,0.1),transparent_50%)]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full glass-card p-8 lg:p-10"
            >
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center space-x-2 mb-4">
                        <Dumbbell className="h-8 w-8 text-primary" />
                        <span className="text-2xl font-bold text-white tracking-tight">Gym<span className="text-primary">Pro</span></span>
                    </Link>
                    <h2 className="text-3xl font-bold text-white">Join the Elite</h2>
                    <p className="text-slate-400 mt-2">Start your transformation today</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg text-center">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-primary/20 border border-primary/30 text-primary text-sm rounded-lg text-center">
                        Registration successful! Redirecting to login...
                    </div>
                )}

                <form onSubmit={handleRegister} className="grid grid-cols-1 gap-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                            <input
                                type="text"
                                required
                                className="w-full pl-11 input-field"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                            <input
                                type="email"
                                required
                                className="w-full pl-11 input-field"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Phone</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                <input
                                    type="text"
                                    className="w-full pl-10 input-field"
                                    placeholder="9876543210"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                <input
                                    type="password"
                                    required
                                    className="w-full pl-10 input-field"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || success}
                        className="w-full primary-button py-3 mt-4 flex items-center justify-center disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Create Account'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-slate-500 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary font-bold hover:text-white transition-colors">
                            Log In
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default RegisterPage;
