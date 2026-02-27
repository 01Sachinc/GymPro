import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Check, Loader2 } from 'lucide-react';
import axios from 'axios';

const MemberPlans = () => {
    const [loading, setLoading] = useState(false);

    const plans = [
        { id: 1, name: 'Basic Starter', price: 29.99, duration: 30, desc: 'Essential gym access' },
        { id: 2, name: 'Premium Pro', price: 59.99, duration: 30, desc: 'All access + trainer' },
        { id: 3, name: 'Elite Annual', price: 499.99, duration: 365, desc: 'Luxury experience' },
    ];

    const handlePayment = async (plan) => {
        setLoading(true);
        // In a real app, you'd call the backend to create a Razorpay order
        // const order = await axios.post('/api/payments/create-order', { planId: plan.id });

        const options = {
            key: "YOUR_RAZORPAY_KEY", // Should be in .env
            amount: plan.price * 100,
            currency: "USD",
            name: "GymPro",
            description: `Purchase ${plan.name}`,
            handler: function (response) {
                alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
                // Verify payment on backend
            },
            prefill: {
                name: "Member Name",
                email: "member@example.com",
            },
            theme: { color: "#6366f1" },
        };

        // Since we don't have the script loaded in this environment, we'll mock the success
        setTimeout(() => {
            alert(`Simulating Razorpay Success for ${plan.name}`);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-3xl font-extrabold text-white">Choose Your Plan</h1>
                <p className="text-slate-400 mt-2">Unlock premium features and professional coaching today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map((plan, i) => (
                    <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`glass-card p-8 flex flex-col relative overflow-hidden ${plan.id === 2 ? 'border-primary ring-1 ring-primary/50' : ''}`}
                    >
                        {plan.id === 2 && (
                            <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-extrabold uppercase py-1 px-4 rounded-bl-xl tracking-tighter shadow-lg shadow-primary/20">
                                Most Popular
                            </div>
                        )}

                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                            <p className="text-slate-500 text-sm">{plan.desc}</p>
                        </div>

                        <div className="mb-8">
                            <span className="text-4xl font-extrabold text-white">${plan.price}</span>
                            <span className="text-slate-500 font-medium ml-2">/ {plan.duration} days</span>
                        </div>

                        <div className="space-y-4 mb-10 flex-1">
                            {['Full Gym Access', 'AI Workout Plans', 'Personal Trainer', 'Nutrition Guide'].map((f, idx) => (
                                <div key={idx} className="flex items-center space-x-3 text-sm font-medium text-slate-300">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    <span>{idx > 1 && plan.id === 1 ? <span className="text-slate-600 line-through">{f}</span> : f}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            disabled={loading}
                            onClick={() => handlePayment(plan)}
                            className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 ${plan.id === 2 ? 'primary-button' : 'glass-button hover:bg-white/10'
                                }`}
                        >
                            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <span>Start Membership</span>}
                        </button>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card p-6 bg-gradient-to-r from-emerald-500/10 to-transparent flex items-center justify-between border border-emerald-500/20">
                <div className="flex items-center space-x-4">
                    <Shield className="h-8 w-8 text-emerald-500" />
                    <div>
                        <h4 className="font-bold text-white">Safe & Secure Payments</h4>
                        <p className="text-xs text-slate-400">All transactions are encrypted and secured by Razorpay.</p>
                    </div>
                </div>
                <div className="flex space-x-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer">
                    <span className="px-3 py-1 bg-white/10 rounded text-xs font-bold text-white">VISA</span>
                    <span className="px-3 py-1 bg-white/10 rounded text-xs font-bold text-white">UPI</span>
                </div>
            </div>
        </div>
    );
};

export default MemberPlans;
