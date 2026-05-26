import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Users, Clipboard, CheckCircle, Clock, Loader2, Dumbbell } from 'lucide-react';
import adminService from '../services/adminService';
import trainerService from '../services/trainerService';

const TrainerDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    const [clientsCount, setClientsCount] = useState(0);
    const [plansCount, setPlansCount] = useState(0);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchTrainerData = async () => {
            if (!user?.id) return;
            try {
                const [membersData, plansData] = await Promise.all([
                    adminService.getMembers(),
                    trainerService.getMyWorkoutPlans(user.id),
                ]);
                setClientsCount(membersData.length);
                setPlansCount(plansData.length);
                setClients(membersData.slice(0, 4)); // Show top 4 members
            } catch (err) {
                console.error("Failed to load trainer dashboard metrics:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTrainerData();
    }, [user?.id]);

    const tasks = [
        { name: 'Review Workout Plan', member: 'John Smith', time: '10:00 AM', status: 'Pending' },
        { name: 'Personal Session', member: 'Sarah Connor', time: '12:30 PM', status: 'Confirmed' },
        { name: 'Update Diet Plan', member: 'Member John', time: '03:00 PM', status: 'Pending' },
    ];

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
                <h1 className="text-3xl font-extrabold text-white">Trainer Portal</h1>
                <p className="text-slate-400 mt-1">Manage your members and daily schedule.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/10">
                    <Users className="w-10 h-10 text-indigo-400 mb-4" />
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Active Clients</p>
                    <h2 className="text-4xl font-extrabold text-white mt-1">{clientsCount}</h2>
                </div>
                <div className="glass-card p-6 bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/10">
                    <Clipboard className="w-10 h-10 text-purple-400 mb-4" />
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Plans Assigned</p>
                    <h2 className="text-4xl font-extrabold text-white mt-1">{plansCount}</h2>
                </div>
                <div className="glass-card p-6 bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/10">
                    <CheckCircle className="w-10 h-10 text-emerald-400 mb-4" />
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Pending Reviews</p>
                    <h2 className="text-4xl font-extrabold text-white mt-1">3</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Schedule */}
                <div className="glass-card p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Today's Schedule</h3>
                    <div className="space-y-4">
                        {tasks.map((task, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all cursor-pointer">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-white/5 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform">
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

                {/* Clients list snippet */}
                <div className="glass-card p-6">
                    <h3 className="text-xl font-bold text-white mb-6">My Members</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-white/10 text-slate-400">
                                    <th className="pb-4 font-semibold uppercase tracking-wider text-xs">Member</th>
                                    <th className="pb-4 font-semibold uppercase tracking-wider text-xs">Email</th>
                                    <th className="pb-4 font-semibold uppercase tracking-wider text-xs">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {clients.map((c) => (
                                    <tr key={c.id} className="hover:bg-white/5 transition-colors">
                                        <td className="py-4 font-semibold text-white">{c.name}</td>
                                        <td className="py-4 text-slate-400 text-xs">{c.email}</td>
                                        <td className="py-4">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400">
                                                Active
                                            </span>
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
