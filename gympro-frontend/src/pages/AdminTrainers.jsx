import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Trash2, Mail, Phone, Calendar, UserCheck, Loader2 } from 'lucide-react';
import adminService from '../services/adminService';

const AdminTrainers = () => {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    const fetchTrainers = async () => {
        setLoading(true);
        try {
            const data = await adminService.getTrainers();
            setTrainers(data);
        } catch (err) {
            setError('Failed to load trainers.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrainers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this trainer?")) return;
        try {
            await adminService.deleteUser(id);
            setTrainers(trainers.filter(t => t.id !== id));
        } catch (err) {
            alert('Failed to delete trainer.');
            console.error(err);
        }
    };

    const filteredTrainers = trainers.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 pb-10 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Trainer Directory</h1>
                    <p className="text-slate-400 mt-1">Manage, verify, and view active coaches on the platform.</p>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl">
                    {error}
                </div>
            )}

            <div className="glass-card overflow-hidden">
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5 gap-4 flex-wrap">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <input
                            type="text"
                            className="w-full pl-10 input-field"
                            placeholder="Search trainers by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="p-20 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Coach Details</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Details</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredTrainers.map((t, i) => (
                                    <motion.tr
                                        key={t.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-white/5 transition-all"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                                                    <span className="text-sm font-bold text-indigo-400">{t.name.charAt(0).toUpperCase()}</span>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white leading-none">{t.name}</p>
                                                    <p className="text-xs text-slate-500 mt-1 flex items-center">
                                                        <UserCheck className="w-3.5 h-3.5 mr-1 text-indigo-400" /> Professional Instructor
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm space-y-1">
                                                <div className="flex items-center text-slate-300">
                                                    <Mail className="w-3.5 h-3.5 mr-2 text-slate-500" /> {t.email}
                                                </div>
                                                <div className="flex items-center text-slate-300">
                                                    <Phone className="w-3.5 h-3.5 mr-2 text-slate-500" /> {t.phone || 'No phone'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(t.id)}
                                                className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                                                title="Delete Trainer"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {!loading && filteredTrainers.length === 0 && (
                    <div className="p-16 text-center text-slate-500 font-medium">
                        No trainers found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminTrainers;
