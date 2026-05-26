import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Clipboard, Mail, Loader2, Sparkles } from 'lucide-react';
import adminService from '../services/adminService';

const TrainerMembers = () => {
    const navigate = useNavigate();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const data = await adminService.getMembers();
                setMembers(data);
            } catch (err) {
                setError('Failed to fetch members.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6 text-white pb-10">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Active Athletes</h1>
                <p className="text-slate-400 mt-1">Review profiles, assign workout cards, and track attendance logs.</p>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((m, i) => (
                    <motion.div
                        key={m.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass-card p-6 border-b-2 border-transparent hover:border-indigo-500/50 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/20">
                                    {m.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">{m.name}</h3>
                                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest">Active Member</p>
                                </div>
                            </div>

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center text-xs text-slate-400">
                                    <Mail className="w-3.5 h-3.5 mr-2 text-slate-500" /> {m.email}
                                </div>
                                <div className="text-xs text-slate-500 font-light leading-relaxed">
                                    Track progress, log daily workouts, and review weights.
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/dashboard/trainer/workouts')}
                            className="glass-button w-full py-2.5 text-xs font-bold flex items-center justify-center space-x-2 border-white/10 hover:border-indigo-500/30 hover:bg-indigo-600 hover:text-white transition-all mt-4"
                        >
                            <Clipboard className="w-4 h-4" />
                            <span>Assign workout Split</span>
                        </button>
                    </motion.div>
                ))}

                {members.length === 0 && (
                    <div className="lg:col-span-3 glass-card p-12 text-center text-slate-500 space-y-4">
                        <Sparkles className="w-8 h-8 text-slate-600 animate-pulse mx-auto" />
                        <p>No active gym members found in the directory.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrainerMembers;
