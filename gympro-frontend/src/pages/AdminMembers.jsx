import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, MoreVertical, Shield, User, Mail, Phone, Calendar } from 'lucide-react';

const AdminMembers = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const members = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'MEMBER', phone: '9876543210', status: 'Active', joined: '2026-02-15' },
        { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'MEMBER', phone: '9876543211', status: 'Active', joined: '2026-02-18' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'TRAINER', phone: '9876543212', status: 'Active', joined: '2026-01-20' },
        { id: 4, name: 'Emma Brown', email: 'emma@example.com', role: 'MEMBER', phone: '9876543213', status: 'Expired', joined: '2026-01-10' },
    ];

    const filteredMembers = members.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Member Management</h1>
                    <p className="text-slate-400">View and manage all registered gym members.</p>
                </div>
                <button className="primary-button flex items-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Add New Member</span>
                </button>
            </div>

            <div className="glass-card overflow-hidden">
                <div className="p-4 border-b border-white/10 flex items-center space-x-4 bg-white/5">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                        <input
                            type="text"
                            className="w-full pl-11 input-field border-none bg-white/5"
                            placeholder="Search members by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="glass-button px-4 py-2 text-sm">All</button>
                        <button className="glass-button px-4 py-2 text-sm text-slate-400">Active</button>
                        <button className="glass-button px-4 py-2 text-sm text-slate-400">Expired</button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-tighter">User</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-tighter">Contact</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-tighter">Role</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-tighter">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-tighter text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredMembers.map((m, i) => (
                                <motion.tr
                                    key={m.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="hover:bg-white/5 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20">
                                                <User className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white leading-none">{m.name}</p>
                                                <p className="text-xs text-slate-500 mt-1 flex items-center">
                                                    <Calendar className="w-3 h-3 mr-1" /> Joined {m.joined}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm">
                                            <div className="flex items-center text-slate-300">
                                                <Mail className="w-3 h-3 mr-2 text-slate-500" /> {m.email}
                                            </div>
                                            <div className="flex items-center text-slate-300 mt-1">
                                                <Phone className="w-3 h-3 mr-2 text-slate-500" /> {m.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest ${m.role === 'TRAINER' ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-primary/10 text-primary border border-primary/20'
                                            }`}>
                                            {m.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${m.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                                            }`}>
                                            {m.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400">
                                            <MoreVertical className="h-5 w-5" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredMembers.length === 0 && (
                    <div className="p-12 text-center">
                        <p className="text-slate-500 font-medium">No members found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminMembers;
