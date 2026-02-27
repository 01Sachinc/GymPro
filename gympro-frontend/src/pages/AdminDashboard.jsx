import { motion } from 'framer-motion';
import { Users, CreditCard, Activity, TrendingUp } from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const AdminDashboard = () => {
    const stats = [
        { label: 'Total Members', val: '1,248', icon: <Users />, color: 'text-blue-500' },
        { label: 'Revenue', val: '$52,400', icon: <CreditCard />, color: 'text-emerald-500' },
        { label: 'Active Plans', val: '450', icon: <TrendingUp />, color: 'text-amber-500' },
        { label: 'Attendance', val: '85%', icon: <Activity />, color: 'text-primary' },
    ];

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Revenue Growth',
                data: [30000, 35000, 42000, 38000, 48000, 52400],
                fill: true,
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderColor: '#6366f1',
                tension: 0.4,
            },
        ],
    };

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                    <p className="text-slate-400">Welcome back, here's what's happening today.</p>
                </div>
                <button className="primary-button">Download Report</button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6"
                    >
                        <div className={`p-3 bg-white/5 rounded-xl w-fit mb-4 ${s.color}`}>
                            {s.icon}
                        </div>
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">{s.label}</div>
                        <div className="text-2xl font-extrabold text-white mt-1">{s.val}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-card p-6">
                    <h3 className="text-xl font-bold mb-6">Revenue Overview</h3>
                    <div className="h-80">
                        <Line data={chartData} options={{
                            responsive: true, maintainAspectRatio: false,
                            scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' } }, x: { grid: { display: false } } }
                        }} />
                    </div>
                </div>

                <div className="glass-card p-6">
                    <h3 className="text-xl font-bold mb-6">Recent Payments</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer text-sm">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">M</div>
                                    <div>
                                        <p className="font-semibold text-white">Member Name</p>
                                        <p className="text-xs text-slate-400">2 hours ago</p>
                                    </div>
                                </div>
                                <div className="text-emerald-500 font-bold">+$120</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
