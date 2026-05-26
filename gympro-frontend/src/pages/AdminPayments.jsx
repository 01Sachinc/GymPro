import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Search, ArrowUpRight, DollarSign, Wallet, CheckCircle, Loader2 } from 'lucide-react';
import adminService from '../services/adminService';

const AdminPayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const data = await adminService.getAllPayments();
                setPayments(data);
            } catch (err) {
                setError('Failed to fetch payments data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();
    }, []);

    const filteredPayments = payments.filter(p =>
        p.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.paymentId?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalRevenue = payments.reduce((acc, curr) => acc + (curr.amount || 0), 0);

    return (
        <div className="space-y-6 pb-10 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Payments Ledger</h1>
                    <p className="text-slate-400 mt-1">Audit transactions, checkout logs, and platform revenue metrics.</p>
                </div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/20">
                    <div className="p-3 bg-indigo-500/20 rounded-xl w-fit text-indigo-400 mb-4">
                        <DollarSign className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Gross Revenue</p>
                    <h3 className="text-3xl font-extrabold text-white mt-1">${totalRevenue.toFixed(2)}</h3>
                </div>

                <div className="glass-card p-6">
                    <div className="p-3 bg-purple-500/20 rounded-xl w-fit text-purple-400 mb-4">
                        <CreditCard className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Processed Invoices</p>
                    <h3 className="text-3xl font-extrabold text-white mt-1">{payments.length}</h3>
                </div>

                <div className="glass-card p-6">
                    <div className="p-3 bg-emerald-500/20 rounded-xl w-fit text-emerald-400 mb-4">
                        <CheckCircle className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Success Rate</p>
                    <h3 className="text-3xl font-extrabold text-white mt-1">100%</h3>
                </div>
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
                            placeholder="Search by member, email, or transaction ID..."
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
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10 text-slate-400">
                                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Transaction ID</th>
                                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Customer</th>
                                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Amount</th>
                                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Created At</th>
                                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-slate-300">
                                {filteredPayments.map((p, i) => (
                                    <motion.tr
                                        key={p.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-white/5 transition-all"
                                    >
                                        <td className="px-6 py-4 font-mono text-xs text-indigo-400">
                                            {p.paymentId || `TXN-MOCK-${p.id}`}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-bold text-white leading-none">{p.userName || `User #${p.userId}`}</p>
                                                <p className="text-xs text-slate-500 mt-1">{p.userEmail || ''}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-white">
                                            ${p.amount?.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-400">
                                            {p.createdAt ? new Date(p.createdAt).toLocaleString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                                p.status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                            }`}>
                                                {p.status}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {!loading && filteredPayments.length === 0 && (
                    <div className="p-16 text-center text-slate-500 font-medium">
                        No transactions recorded.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPayments;
