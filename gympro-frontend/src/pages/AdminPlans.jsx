import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Check, X, DollarSign, Clock } from 'lucide-react';

const AdminPlans = () => {
    const [plans, setPlans] = useState([
        { id: 1, name: 'Basic Starter', price: 29.99, duration: 30, description: 'Essential gym access with base equipment.' },
        { id: 2, name: 'Premium Pro', price: 59.99, duration: 30, description: 'All access + personal trainer session + pool.' },
        { id: 3, name: 'Elite Annual', price: 499.99, duration: 365, description: 'Full year luxury experience with all perks.' },
    ]);

    const [isAdding, setIsAdding] = useState(false);
    const [newPlan, setNewPlan] = useState({ name: '', price: '', duration: '', description: '' });

    const handleAddPlan = () => {
        setPlans([...plans, { ...newPlan, id: Date.now(), price: parseFloat(newPlan.price), duration: parseInt(newPlan.duration) }]);
        setIsAdding(false);
        setNewPlan({ name: '', price: '', duration: '', description: '' });
    };

    const deletePlan = (id) => {
        setPlans(plans.filter(p => p.id !== id));
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Membership Plans</h1>
                    <p className="text-slate-400">Configure and manage gym subscription packages.</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="primary-button flex items-center space-x-2"
                >
                    <Plus className="w-5 h-5" />
                    <span>New Plan</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {isAdding && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="glass-card p-6 border-primary bg-primary/5"
                        >
                            <h3 className="text-lg font-bold mb-4 text-white">Create New Plan</h3>
                            <div className="space-y-4">
                                <input
                                    className="w-full input-field"
                                    placeholder="Plan Name"
                                    value={newPlan.name}
                                    onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <input
                                            className="w-full pl-9 input-field"
                                            placeholder="Price"
                                            value={newPlan.price}
                                            onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                                        />
                                    </div>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <input
                                            className="w-full pl-9 input-field"
                                            placeholder="Days"
                                            value={newPlan.duration}
                                            onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })}
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
                                    <button onClick={handleAddPlan} className="primary-button flex-1 py-2">Save</button>
                                    <button onClick={() => setIsAdding(false)} className="glass-button flex-1 py-2 text-red-500">Cancel</button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {plans.map((plan) => (
                    <motion.div key={plan.id} layout className="glass-card p-8 flex flex-col group relative">
                        <div className="absolute top-4 right-4 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={() => deletePlan(plan.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-red-500"><Trash2 className="w-4 h-4" /></button>
                        </div>

                        <div className="mb-4 p-3 bg-primary/10 rounded-2xl w-fit">
                            <Shield className="w-8 h-8 text-primary" />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                        <div className="flex items-baseline space-x-1 mb-4">
                            <span className="text-3xl font-extrabold text-white">${plan.price}</span>
                            <span className="text-slate-500 text-sm font-medium">/ {plan.duration} days</span>
                        </div>

                        <p className="text-slate-400 text-sm mb-8 flex-1 leading-relaxed">
                            {plan.description}
                        </p>

                        <div className="space-y-3 mb-8">
                            {['24/7 Gym Access', 'AI Workout Plans', 'Health Consultation'].map((feat, idx) => (
                                <div key={idx} className="flex items-center space-x-2 text-xs font-bold text-slate-300">
                                    <Check className="w-4 h-4 text-emerald-500" />
                                    <span>{feat}</span>
                                </div>
                            ))}
                        </div>

                        <button className="glass-button w-full py-3 font-bold group-hover:bg-primary group-hover:text-white transition-all">Configure</button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AdminPlans;
