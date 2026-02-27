import { motion } from 'framer-motion';
import { Users, Clipboard, CheckCircle, Clock } from 'lucide-react';

const TrainerDashboard = () => {
    const tasks = [
        { name: 'Review Workout Plan', member: 'John Smith', time: '10:00 AM', status: 'Pending' },
        { name: 'Personal Session', member: 'Sarah Davis', time: '12:30 PM', status: 'Confirmed' },
        { name: 'Update Diet Plan', member: 'Mike Ross', time: '03:00 PM', status: 'Pending' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-white">Trainer Portal</h1>
                <p className="text-slate-400 mt-1">Manage your members and daily schedule.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 bg-gradient-to-br from-primary/10 to-transparent">
                    <Users className="w-10 h-10 text-primary mb-4" />
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Active Clients</p>
                    <h2 className="text-4xl font-extrabold text-white">24</h2>
                </div>
                <div className="glass-card p-6 bg-gradient-to-br from-accent/10 to-transparent">
                    <Clipboard className="w-10 h-10 text-accent mb-4" />
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Plans Assigned</p>
                    <h2 className="text-4xl font-extrabold text-white">112</h2>
                </div>
                <div className="glass-card p-6 bg-gradient-to-br from-emerald-500/10 to-transparent">
                    <CheckCircle className="w-10 h-10 text-emerald-500 mb-4" />
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Pending Reviews</p>
                    <h2 className="text-4xl font-extrabold text-white">5</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-8">
                    <h3 className="text-xl font-bold text-white mb-6">Today's Schedule</h3>
                    <div className="space-y-4">
                        {tasks.map((task, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all cursor-pointer">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-white/5 rounded-xl text-primary group-hover:scale-110 transition-transform">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">{task.name}</h4>
                                        <p className="text-sm text-slate-400">{task.member} • {task.time}</p>
                                    </div>
                                </div>
                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${task.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                                    }`}>
                                    {task.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-8">
                    <h3 className="text-xl font-bold text-white mb-6">My Members</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="pb-4 text-xs font-bold text-slate-500 uppercase">Member</th>
                                    <th className="pb-4 text-xs font-bold text-slate-500 uppercase">Goal</th>
                                    <th className="pb-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {[1, 2, 3, 4].map((_, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors">
                                        <td className="py-4 font-medium">Member {i + 1}</td>
                                        <td className="py-4 text-slate-400 text-sm">Weight Loss</td>
                                        <td className="py-4">
                                            <div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden">
                                                <div className="bg-primary h-full w-[70%]" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainerDashboard;
