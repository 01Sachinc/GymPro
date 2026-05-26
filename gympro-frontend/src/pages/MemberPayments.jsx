import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { CreditCard, Download, FileText, CheckCircle, Loader2 } from 'lucide-react';
import memberService from '../services/memberService';

const MemberPayments = () => {
    const { user } = useSelector((state) => state.auth);
    const [payments, setPayments] = useState([]);
    const [membership, setMembership] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            if (!user?.id) return;
            try {
                const [paymentsData, membershipData] = await Promise.allSettled([
                    memberService.getMyPayments(user.id),
                    memberService.getActiveMembership(user.id),
                ]);

                if (paymentsData.status === 'fulfilled') {
                    setPayments(paymentsData.value);
                }
                if (membershipData.status === 'fulfilled') {
                    setMembership(membershipData.value);
                }
            } catch (err) {
                console.error("Failed to load payments details:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentDetails();
    }, [user?.id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 text-white pb-10">
            <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">Payment Ledger</h1>
                <p className="text-slate-400 mt-1">Review your transaction history and active subscription plan.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Active subscription card */}
                <div className="glass-card p-6 bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/20">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white">Active Subscription</h3>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                            membership ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                            {membership ? 'Active' : 'No Plan'}
                        </span>
                    </div>
                    {membership ? (
                        <>
                            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-1">Current Plan</p>
                            <h2 className="text-2xl font-extrabold text-white mb-6">
                                Plan #{membership.planId} 
                                <span className="text-indigo-400 text-sm font-semibold ml-2">Active</span>
                            </h2>
                            <div className="space-y-3 text-sm font-light text-slate-300">
                                <div className="flex justify-between">
                                    <span className="opacity-60">Start Date</span>
                                    <span className="font-semibold">{new Date(membership.startDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-60">End Date</span>
                                    <span className="font-semibold">{new Date(membership.endDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="py-6 text-slate-500 font-light text-sm">
                            You do not have an active membership plan. Select a package from the Plan page.
                        </div>
                    )}
                </div>

                {/* Default payment method mockup */}
                <div className="glass-card p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Saved Card</h3>
                    <div className="flex items-center p-4 bg-white/5 rounded-2xl border border-white/5 mb-6">
                        <div className="w-12 h-8 bg-slate-800 rounded flex items-center justify-center mr-4">
                            <CreditCard className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-white">•••• •••• •••• 4242</p>
                            <p className="text-xs text-slate-500">Expires 12/28</p>
                        </div>
                        <button className="text-xs font-bold text-indigo-400 hover:text-white transition-colors">Edit</button>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-light italic">
                        Your default payment method is used for manual checkouts. No auto-renewals are enabled.
                    </p>
                </div>
            </div>

            {/* Invoices table */}
            <div className="glass-card overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10 bg-white/5">
                    <h3 className="text-lg font-bold text-white">Transaction Logs</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                                <th className="px-6 py-4">Transaction ID</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-slate-300">
                            {payments.map((p, i) => (
                                <motion.tr
                                    key={p.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="hover:bg-white/5 transition-colors"
                                >
                                    <td className="px-6 py-4 font-mono text-indigo-400">{p.paymentId || `TXN-MOCK-${p.id}`}</td>
                                    <td className="px-6 py-4 font-bold text-white">${p.amount?.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-xs text-slate-400">
                                        {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'Active'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center text-emerald-400 font-bold">
                                            <CheckCircle className="h-4.5 w-4.5 mr-2 shrink-0" /> {p.status}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {payments.length === 0 && (
                    <div className="p-12 text-center text-slate-500 font-medium">
                        No transactions recorded for your account.
                    </div>
                )}
            </div>
        </div>
    );
};

export default MemberPayments;
