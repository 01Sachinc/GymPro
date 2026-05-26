import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Check, DollarSign, Clock, Shield, Loader2 } from 'lucide-react';
import adminService from '../services/adminService';
import memberService from '../services/memberService';

const AdminPlans = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [newPlan, setNewPlan] = useState({ planName: '', price: '', durationDays: '', description: '' });
    const [submitting, setSubmitting] = useState(false);

    const fetchPlans = async () => {
        setLoading(true);
        try {
            const data = await memberService.getPlansList();
            setPlans(data);
        } catch (err) {
            console.error("Failed to load plans:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleAddPlan = async (e) => {
        e.preventDefault();
        if (!newPlan.planName || !newPlan.price || !newPlan.durationDays) return;

        setSubmitting(true);
        try {
            const planData = {
                planName: newPlan.planName,
                price: parseFloat(newPlan.price),
                durationDays: parseInt(newPlan.durationDays),
                description: newPlan.description,
            };
            const created = await adminService.createPlan(planData);
            setPlans([...plans, created]);
            setIsAdding(false);
            setNewPlan({ planName: '', price: '', durationDays: '', description: '' });
        } catch (err) {
            console.error("Failed to create plan:", err);
            alert("Error creating plan.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeletePlan = async (id) => {
        if (!window.confirm("Are you sure you want to delete this subscription plan?")) return;
        try {
            await adminService.deletePlan(id);
            setPlans(plans.filter(p => p.id !== id));
        } catch (err) {
            console.error("Failed to delete plan:", err);
            alert("Failed to delete plan. It might be linked to active memberships.");
        }
    };

    return (
        <div className="space-y-8 pb-10 text-white">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Membership Plans</h1>
                    <p className="text-slate-400">Configure and manage gym subscription packages.</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="primary-button flex items-center space-x-2 w-fit"
                >
                    <Plus className="w-5 h-5" />
                    <span>New Plan</span>
                </button>
            </div>

            {loading ? (
                <div className="p-20 flex justify-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {isAdding && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="glass-card p-6 border-primary bg-primary/5"
                            >
                                <h3 className="text-lg font-bold mb-4 text-white">Create New Plan</h3>
                                <form onSubmit={handleAddPlan} className="space-y-4">
                                    <input
                                        required
                                        className="w-full input-field"
                                        placeholder="Plan Name (e.g. Bronze Split)"
                                        value={newPlan.planName}
                                        onChange={(e) => setNewPlan({ ...newPlan, planName: e.target.value })}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                            <input
                                                required
                                                type="number"
                                                step="0.01"
                                                className="w-full pl-9 input-field"
                                                placeholder="Price"
                                                value={newPlan.price}
                                                onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                                            />
                                        </div>
                                        <div className="relative">
                                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                            <input
                                                required
                                                type="number"
                                                className="w-full pl-9 input-field"
                                                placeholder="Days"
                                                value={newPlan.durationDays}
                                                onChange={(e) => setNewPlan({ ...newPlan, durationDays: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <textarea
                                        className="w-full input-field h-20 resize-none"
                                        placeholder="Plan Description"
                                        value={newPlan.description}
                                        onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="primary-button flex-1 py-2 flex items-center justify-center"
                                        >
                                            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsAdding(false)}
                                            className="glass-button flex-1 py-2 text-red-500"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {plans.map((plan) => (
                        <motion.div key={plan.id} layout className="glass-card p-8 flex flex-col group relative border-white/5">
                            <div className="absolute top-4 right-4 flex opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleDeletePlan(plan.id)}
                                    className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 hover:text-red-500"
                                    title="Delete Plan"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="mb-4 p-3 bg-indigo-500/10 rounded-2xl w-fit">
                                <Shield className="w-8 h-8 text-indigo-400" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2">{plan.planName}</h3>
                            <div className="flex items-baseline space-x-1 mb-4">
                                <span className="text-3xl font-extrabold text-white">${plan.price}</span>
                                <span className="text-slate-500 text-sm font-medium">/ {plan.durationDays} days</span>
                            </div>

                            <p className="text-slate-400 text-sm mb-8 flex-1 leading-relaxed">
                                {plan.description || 'No description provided.'}
                            </p>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center space-x-2 text-xs font-bold text-slate-300">
                                    <Check className="w-4 h-4 text-emerald-500" />
                                    <span>24/7 Gym Equipment Access</span>
                                </div>
                                <div className="flex items-center space-x-2 text-xs font-bold text-slate-300">
                                    <Check className="w-4 h-4 text-emerald-500" />
                                    <span>Personal Progress Tracking</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminPlans;
