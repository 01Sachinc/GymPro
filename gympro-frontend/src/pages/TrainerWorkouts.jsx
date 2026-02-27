import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Dumbbell, Trash2, Save } from 'lucide-react';

const TrainerWorkouts = () => {
    const [plans, setPlans] = useState([
        { id: 1, title: 'Powerlifting Base', member: 'Alice Cooper', level: 'Advanced' },
        { id: 2, title: 'Cutting Routine', member: 'Bob Marley', level: 'Intermediate' },
    ]);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Workout Repository</h1>
                    <p className="text-slate-400">Create templates and assign curated routines.</p>
                </div>
                <button className="primary-button flex items-center space-x-2 bg-accent hover:bg-purple-600 shadow-accent/20">
                    <Plus className="w-5 h-5" />
                    <span>New Routine</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-8">
                    <h3 className="text-xl font-bold text-white mb-6">Quick Assign</h3>
                    <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <select className="select-field input-field bg-white/5 border-white/5 text-slate-400">
                                <option>Select Member</option>
                                <option>Alice Cooper</option>
                                <option>Bob Marley</option>
                            </select>
                            <select className="select-field input-field bg-white/5 border-white/5 text-slate-400">
                                <option>Select Level</option>
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                        </div>
                        <textarea
                            className="input-field w-full h-32 text-sm"
                            placeholder="Enter workout details (Exercises, Sets, Reps)..."
                        />
                        <button className="primary-button w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/10">
                            <Save className="w-5 h-5" />
                            <span>Save & Assign</span>
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white mb-2">Recent Routines</h3>
                    {plans.map((p, i) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-6 flex items-center justify-between group hover:bg-white/10 transition-all border-l-4 border-l-accent"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-accent/10 rounded-xl text-accent">
                                    <Dumbbell className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{p.title}</h4>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">{p.member} • {p.level}</p>
                                </div>
                            </div>
                            <button className="p-2 text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrainerWorkouts;
