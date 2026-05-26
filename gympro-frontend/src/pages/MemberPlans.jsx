import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Check, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import memberService from '../services/memberService';

const MemberPlans = () => {
    const { user } = useSelector((state) => state.auth);
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buying, setBuying] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const data = await memberService.getPlansList();
                setPlans(data);
            } catch (err) {
                console.error("Failed to load plans:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);

    const handlePayment = async (plan) => {
        if (!user?.id) return;
        setBuying(true);
        setSuccessMessage('');

        // Generate a mock Razorpay payment ID
        const mockPaymentId = `rzp_test_${Math.random().toString(36).substring(2, 11)}`;

        try {
            // Register payment and activate membership in database
            await memberService.purchaseMembership(user.id, plan.id, plan.price, mockPaymentId);
            setSuccessMessage(`Simulated payment successful! You are now subscribed to ${plan.planName}.`);
            setTimeout(() => setSuccessMessage(''), 5000);
        } catch (err) {
            console.error("Failed to purchase plan:", err);
            alert("Checkout transaction failed.");
        } finally {
            setBuying(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 text-white pb-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
                <h1 className="text-3xl font-extrabold text-white">Choose Your Plan</h1>
                <p className="text-slate-400">Unlock exercise cards, custom nutrition logs, and professional coaching.</p>
            </div>

            {successMessage && (
                <div className="p-4 max-w-2xl mx-auto bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>{successMessage}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map((plan, i) => (
                    <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`glass-card p-8 flex flex-col justify-between relative overflow-hidden border-white/5 hover:scale-[1.02] transition-all duration-300 ${
                            plan.planName.toLowerCase().includes('premium') || plan.planName.toLowerCase().includes('pro')
                                ? 'border-indigo-500 shadow-xl shadow-indigo-600/10'
                                : ''
                        }`}
                    >
                        {(plan.planName.toLowerCase().includes('premium') || plan.planName.toLowerCase().includes('pro')) && (
                            <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-extrabold uppercase py-1 px-4 rounded-bl-xl tracking-tighter">
                                Most Popular
                            </div>
                        )}

                        <div>
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-white mb-1">{plan.planName}</h3>
                                <p className="text-slate-500 text-xs font-light">{plan.description || 'Access to premium services.'}</p>
                            </div>

                            <div className="mb-8">
                                <span className="text-4xl font-extrabold text-white">${plan.price}</span>
                                <span className="text-slate-500 text-sm font-medium ml-2">/ {plan.durationDays} days</span>
                            </div>

                            <div className="space-y-4 mb-10">
                                <div className="flex items-center gap-3 text-sm text-slate-300">
                                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                                    <span>24/7 Gym split Access</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-300">
                                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                                    <span>AI workout assistance splits</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-300">
                                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                                    <span>Personal Coach assigned sessions</span>
                                </div>
                            </div>
                        </div>

                        <button
                            disabled={buying}
                            onClick={() => handlePayment(plan)}
                            className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center space-x-2 ${
                                plan.planName.toLowerCase().includes('premium') || plan.planName.toLowerCase().includes('pro')
                                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                                    : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'
                            }`}
                        >
                            {buying ? <Loader2 className="animate-spin h-5 w-5" /> : <span>Subscribe Now</span>}
                        </button>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card p-6 bg-gradient-to-r from-emerald-500/10 to-transparent flex items-center justify-between border border-emerald-500/20 max-w-4xl mx-auto">
                <div className="flex items-center space-x-4">
                    <Shield className="h-8 w-8 text-emerald-400 shrink-0" />
                    <div>
                        <h4 className="font-bold text-white">Safe & Secure Transactions</h4>
                        <p className="text-xs text-slate-400">All transactions are fully integrated and audited by Razorpay.</p>
                    </div>
                </div>
                <div className="flex gap-4 opacity-50 text-xs font-bold text-slate-300">
                    <span>VISA</span>
                    <span>UPI</span>
                    <span>STRIPE</span>
                </div>
            </div>
        </div>
    );
};

export default MemberPlans;
