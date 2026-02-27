import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Activity, Flame, Heart, Target, ChevronRight } from 'lucide-react';

const MemberDashboard = () => {
    const { user } = useSelector((state) => state.auth);

    const workouts = [
        { name: 'Chest & Triceps', date: 'Today', intensity: 'High' },
        { name: 'Back & Biceps', date: 'Yesterday', intensity: 'Medium' },
        { name: 'Leg Day', date: 'Oct 24', intensity: 'High' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-white">Hello, <span className="text-primary">{user?.name}</span></h1>
                    <p className="text-slate-400 text-lg">Keep pushing! You're closer to your goal than yesterday.</p>
                </div>
                <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                    <div className="px-6 py-2 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 cursor-pointer">Stats</div>
                    <div className="px-6 py-2 text-slate-400 font-bold hover:text-white cursor-pointer transition-all">Activity</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { icon: <Activity className="text-blue-500" />, label: 'Weight', val: '78kg', change: '-2kg' },
                    { icon: <Flame className="text-orange-500" />, label: 'Active Calories', val: '450', change: '+12%' },
                    { icon: <Heart className="text-red-500" />, label: 'Heart Rate', val: '72 bpm', change: 'Normal' },
                    { icon: <Target className="text-emerald-500" />, label: 'Goal Progress', val: '72%', change: '+5%' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 border-b-2 border-transparent hover:border-primary transition-all duration-300"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white/5 rounded-xl">{stat.icon}</div>
                            <span className="text-xs font-bold text-slate-500 bg-white/5 px-2 py-1 rounded-md">{stat.change}</span>
                        </div>
                        <h4 className="text-slate-400 font-bold text-sm tracking-wide">{stat.label}</h4>
                        <div className="text-2xl font-extrabold text-white mt-1 uppercase tracking-tighter">{stat.val}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-8">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center justify-between">
                            Morning Workout <span className="text-sm font-normal text-primary hover:underline cursor-pointer">View Plan</span>
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {[
                                { label: 'Intensity', val: 'High-Level' },
                                { label: 'Time', val: '45 Mins' },
                                { label: 'Exercises', val: '12 Sets' },
                            ].map((item, i) => (
                                <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <p className="text-xs text-slate-500 font-bold uppercase">{item.label}</p>
                                    <p className="text-lg font-bold text-white mt-1">{item.val}</p>
                                </div>
                            ))}
                        </div>
                        <button className="primary-button w-full mt-8 py-4 text-lg">Start Session</button>
                    </div>

                    <div className="glass-card p-8">
                        <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                        <div className="space-y-4">
                            {workouts.map((w, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">W</div>
                                        <div>
                                            <h4 className="font-bold text-white">{w.name}</h4>
                                            <p className="text-xs text-slate-400">{w.date}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="text-slate-600" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="glass-card p-8 bg-gradient-to-br from-primary/20 to-transparent">
                        <h3 className="text-xl font-bold text-white mb-4">Current Plan</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                                <span className="text-slate-400">Status</span>
                                <span className="text-emerald-500 font-bold">Active</span>
                            </div>
                            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                                <span className="text-slate-400">Expires In</span>
                                <span className="text-white font-bold">12 Days</span>
                            </div>
                        </div>
                        <button className="glass-button w-full mt-6 py-3 font-bold border-primary/50 text-primary hover:text-white hover:bg-primary">Renew Now</button>
                    </div>

                    <div className="glass-card p-8">
                        <h3 className="text-xl font-bold text-white mb-6">Nutrition Focus</h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Protien', progress: 80 },
                                { label: 'Carbs', progress: 60 },
                                { label: 'Fats', progress: 40 },
                            ].map((n, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs font-bold mb-2 uppercase text-slate-400 tracking-wider">
                                        <span>{n.label}</span>
                                        <span>{n.progress}g</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${n.progress}%` }}
                                            className="bg-primary h-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberDashboard;
