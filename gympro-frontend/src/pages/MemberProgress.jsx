import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Plus, Dumbbell, Sparkles, Scale, Percent } from 'lucide-react';
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

const MemberProgress = () => {
    const [logs, setLogs] = useState([
        { date: 'May 01', weight: 82.5, fatPercent: 22.0 },
        { date: 'May 08', weight: 81.8, fatPercent: 21.6 },
        { date: 'May 15', weight: 80.9, fatPercent: 21.1 },
        { date: 'May 22', weight: 80.2, fatPercent: 20.7 },
    ]);

    const [newWeight, setNewWeight] = useState('');
    const [newFat, setNewFat] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddLog = (e) => {
        e.preventDefault();
        if (!newWeight) return;

        setIsSubmitting(true);
        const today = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
        
        setTimeout(() => {
            setLogs([
                ...logs,
                {
                    date: today,
                    weight: parseFloat(newWeight),
                    fatPercent: newFat ? parseFloat(newFat) : logs[logs.length - 1].fatPercent
                }
            ]);
            setNewWeight('');
            setNewFat('');
            setIsSubmitting(false);
        }, 800);
    };

    const weightChartData = {
        labels: logs.map(l => l.date),
        datasets: [
            {
                label: 'Body Weight (kg)',
                data: logs.map(l => l.weight),
                fill: true,
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderColor: '#6366f1',
                tension: 0.4,
                pointBackgroundColor: '#6366f1',
            },
        ],
    };

    const fatChartData = {
        labels: logs.map(l => l.date),
        datasets: [
            {
                label: 'Body Fat (%)',
                data: logs.map(l => l.fatPercent),
                fill: true,
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
                borderColor: '#a855f7',
                tension: 0.4,
                pointBackgroundColor: '#a855f7',
            },
        ],
    };

    const latestLog = logs[logs.length - 1];
    const initialLog = logs[0];
    const weightLost = (initialLog.weight - latestLog.weight).toFixed(1);

    return (
        <div className="space-y-6 pb-10 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Fitness Analytics</h1>
                    <p className="text-slate-400 mt-1">Track body weight splits, fat percentage ratios, and goals.</p>
                </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Current Weight</p>
                        <h3 className="text-3xl font-extrabold text-white mt-1">{latestLog.weight} kg</h3>
                    </div>
                    <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                        <Scale className="w-6 h-6" />
                    </div>
                </div>

                <div className="glass-card p-6 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Body Fat Ratio</p>
                        <h3 className="text-3xl font-extrabold text-white mt-1">{latestLog.fatPercent}%</h3>
                    </div>
                    <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
                        <Percent className="w-6 h-6" />
                    </div>
                </div>

                <div className="glass-card p-6 flex items-center justify-between bg-gradient-to-br from-emerald-500/5 to-transparent border-emerald-500/10">
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Net Weight Loss</p>
                        <h3 className="text-3xl font-extrabold text-emerald-400 mt-1">-{weightLost} kg</h3>
                    </div>
                    <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form and History */}
                <div className="space-y-6">
                    <div className="glass-card p-6 space-y-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Plus className="w-5 h-5 text-indigo-400" /> Log Today's Metrics
                        </h3>
                        <form onSubmit={handleAddLog} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-400">Weight (kg)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    required
                                    className="w-full input-field"
                                    placeholder="e.g. 78.5"
                                    value={newWeight}
                                    onChange={(e) => setNewWeight(e.target.value)}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-400">Body Fat % (optional)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    className="w-full input-field"
                                    placeholder="e.g. 19.5"
                                    value={newFat}
                                    onChange={(e) => setNewFat(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full primary-button py-2.5 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? 'Saving...' : 'Add Metrics Entry'}
                            </button>
                        </form>
                    </div>

                    <div className="glass-card p-6">
                        <h4 className="font-bold text-white mb-4">Historical Entries</h4>
                        <div className="space-y-3">
                            {logs.slice().reverse().map((l, index) => (
                                <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5 text-sm">
                                    <span className="font-medium text-slate-400">{l.date}</span>
                                    <div className="flex gap-4">
                                        <span className="font-semibold text-slate-200">{l.weight} kg</span>
                                        <span className="text-purple-400 font-semibold">{l.fatPercent}% Fat</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Graphs */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-6">
                        <h4 className="font-bold text-white mb-4">Weight Trend Analysis</h4>
                        <div className="h-64">
                            <Line
                                data={weightChartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                        y: { grid: { color: 'rgba(255,255,255,0.05)' } },
                                        x: { grid: { display: false } }
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="glass-card p-6">
                        <h4 className="font-bold text-white mb-4">Fat Ratio Reduction</h4>
                        <div className="h-64">
                            <Line
                                data={fatChartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                        y: { grid: { color: 'rgba(255,255,255,0.05)' } },
                                        x: { grid: { display: false } }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberProgress;
