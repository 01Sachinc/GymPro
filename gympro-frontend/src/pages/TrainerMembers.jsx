import { motion } from 'framer-motion';
import { User, MessageSquare, Clipboard } from 'lucide-react';

const TrainerMembers = () => {
    const members = [
        { id: 1, name: 'Alice Cooper', goal: 'Muscle Gain', progress: 65, lastSeen: 'Today' },
        { id: 2, name: 'Bob Marley', goal: 'Weight Loss', progress: 40, lastSeen: 'Yesterday' },
        { id: 3, name: 'Charlie Put', goal: 'Endurance', progress: 85, lastSeen: '2 days ago' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">My Assigned Members</h1>
                <p className="text-slate-400">Manage and track your clients' progress.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((m, i) => (
                    <motion.div
                        key={m.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 border-b-2 border-transparent hover:border-accent transition-all duration-300"
                    >
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                                {m.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{m.name}</h3>
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">{m.goal}</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-xs font-bold text-slate-400">
                                <span>Progress</span>
                                <span>{m.progress}%</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div className="bg-accent h-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" style={{ width: `${m.progress}%` }} />
                            </div>
                        </div>

                        <p className="text-xs text-slate-500 mb-6 flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
                            Last activity: {m.lastSeen}
                        </p>

                        <div className="flex gap-2">
                            <button className="glass-button flex-1 py-2 text-xs font-bold flex items-center justify-center space-x-2">
                                <Clipboard className="w-4 h-4" />
                                <span>Assign Plan</span>
                            </button>
                            <button className="glass-button p-2 text-slate-400">
                                <MessageSquare className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TrainerMembers;
