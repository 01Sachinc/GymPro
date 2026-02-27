import { motion } from 'framer-motion';
import { CreditCard, Download, FileText, CheckCircle } from 'lucide-react';

const MemberPayments = () => {
    const payments = [
        { id: 'INV-1024', plan: 'Premium Pro', amount: 59.99, date: '2026-02-15', status: 'Success' },
        { id: 'INV-0985', plan: 'Basic Starter', amount: 29.99, date: '2026-01-15', status: 'Success' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Payment History</h1>
                <p className="text-slate-400 mt-1">Manage your subscriptions and download invoices.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-8 bg-gradient-to-br from-primary/10 to-transparent">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white">Active Subscription</h3>
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-500 rounded-full text-[10px] font-extrabold uppercase tracking-widest">Active</span>
                    </div>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">Current Plan</p>
                    <h2 className="text-3xl font-extrabold text-white mb-6">Premium Pro <span className="text-primary text-sm font-bold ml-2">$59.99/mo</span></h2>
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm text-slate-300">
                            <span className="opacity-60">Started</span>
                            <span className="font-bold">Feb 15, 2026</span>
                        </div>
                        <div className="flex justify-between text-sm text-slate-300">
                            <span className="opacity-60">Next Billing</span>
                            <span className="font-bold">Mar 15, 2026</span>
                        </div>
                    </div>
                    <button className="w-full glass-button mt-8 py-3 text-red-500 border-red-500/20 hover:bg-red-500/10">Cancel Subscription</button>
                </div>

                <div className="glass-card p-8">
                    <h3 className="text-lg font-bold text-white mb-6">Payment Method</h3>
                    <div className="flex items-center p-4 bg-white/5 rounded-2xl border border-white/10 mb-6">
                        <div className="w-12 h-8 bg-slate-800 rounded flex items-center justify-center mr-4">
                            <CreditCard className="w-5 h-5 text-slate-500" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-white">•••• •••• •••• 4242</p>
                            <p className="text-xs text-slate-500">Expires 12/28</p>
                        </div>
                        <button className="text-xs font-bold text-primary hover:text-white transition-colors">Edit</button>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed italic">Your default payment method is used for automatic renewals.</p>
                </div>
            </div>

            <div className="glass-card overflow-hidden">
                <div className="px-8 py-4 border-b border-white/10 bg-white/5">
                    <h3 className="text-lg font-bold text-white">Invoices</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-white/10 text-slate-500 uppercase text-[10px] font-extrabold tracking-widest">
                                <th className="px-8 py-4">Invoice ID</th>
                                <th className="px-8 py-4">Plan Name</th>
                                <th className="px-8 py-4">Amount</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-slate-300">
                            {payments.map((p, i) => (
                                <motion.tr
                                    key={p.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="hover:bg-white/5 transition-colors"
                                >
                                    <td className="px-8 py-4 font-mono">{p.id}</td>
                                    <td className="px-8 py-4 font-bold text-white">{p.plan}</td>
                                    <td className="px-8 py-4">${p.amount}</td>
                                    <td className="px-8 py-4">
                                        <div className="flex items-center text-emerald-500 font-bold">
                                            <CheckCircle className="h-3 w-3 mr-2" /> {p.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-right">
                                        <button className="p-2 glass-button text-slate-400">
                                            <Download className="h-4 w-4" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MemberPayments;
