import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Trash2, Mail, Phone, Calendar, User, Loader2, X } from 'lucide-react';
import adminService from '../services/adminService';
import authService from '../services/authService';

const AdminMembers = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    
    // Add Member form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: 'password123', // Default password
    });
    const [submitting, setSubmitting] = useState(false);

    const fetchMembers = async () => {
        setLoading(true);
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

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this member?")) return;
        try {
            await adminService.deleteUser(id);
            setMembers(members.filter(m => m.id !== id));
        } catch (err) {
            alert('Failed to delete member.');
            console.error(err);
        }
    };

    const handleAddMember = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await authService.signup(formData);
            setShowAddModal(false);
            setFormData({ name: '', email: '', phone: '', password: 'password123' });
            fetchMembers(); // reload
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to create member');
        } finally {
            setSubmitting(false);
        }
    };

    const filteredMembers = members.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 pb-10 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Member Directory</h1>
                    <p className="text-slate-400">View and manage all registered gym members.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="primary-button flex items-center space-x-2 w-fit"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add New Member</span>
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl">
                    {error}
                </div>
            )}

            <div className="glass-card overflow-hidden">
                <div className="p-4 border-b border-white/10 flex items-center bg-white/5 gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <input
                            type="text"
                            className="w-full pl-10 input-field"
                            placeholder="Search members by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="p-20 flex justify-center">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10 text-slate-400">
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Member Details</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredMembers.map((m, i) => (
                                    <motion.tr
                                        key={m.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-white/5 transition-all"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20">
                                                    <User className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white leading-none">{m.name}</p>
                                                    <p className="text-[10px] text-slate-500 mt-1 flex items-center">
                                                        <Calendar className="w-3.5 h-3.5 mr-1" /> Joined {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : 'N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm space-y-1">
                                                <div className="flex items-center text-slate-300">
                                                    <Mail className="w-3.5 h-3.5 mr-2 text-slate-500" /> {m.email}
                                                </div>
                                                <div className="flex items-center text-slate-300">
                                                    <Phone className="w-3.5 h-3.5 mr-2 text-slate-500" /> {m.phone || 'No phone'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(m.id)}
                                                className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                                                title="Delete Member"
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

                {!loading && filteredMembers.length === 0 && (
                    <div className="p-16 text-center text-slate-500 font-medium">
                        No members found matching your search.
                    </div>
                )}
            </div>

            {/* Add Member Modal Dialog */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030712]/80 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-md glass-card p-6 relative"
                        >
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="absolute top-4 right-4 p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h3 className="text-xl font-bold mb-6 text-white">Create New Member</h3>

                            <form onSubmit={handleAddMember} className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-400">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full input-field"
                                        placeholder="e.g. Sarah Connor"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-400">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full input-field"
                                        placeholder="sarah@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-400">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full input-field"
                                        placeholder="5556667777"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-400">Temporary Password</label>
                                    <input
                                        type="password"
                                        required
                                        className="w-full input-field"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full primary-button py-3 mt-4 flex items-center justify-center"
                                >
                                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Register Member'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminMembers;
