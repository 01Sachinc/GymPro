import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Flame, Heart, Target, ChevronRight, Loader2, Sparkles, Calendar, ShieldCheck, Dumbbell } from 'lucide-react';
import memberService from '../services/memberService';

const MemberDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [membership, setMembership] = useState(null);
    const [attendanceCount, setAttendanceCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [recentWorkout, setRecentWorkout] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!user?.id) return;
            try {
                const [membershipData, attendanceData, workoutData] = await Promise.allSettled([
                    memberService.getActiveMembership(user.id),
                    memberService.getMyAttendance(user.id),
                    memberService.getLatestWorkoutPlan(user.id),
                ]);

                if (membershipData.status === 'fulfilled') {
                    setMembership(membershipData.value);
                }
                if (attendanceData.status === 'fulfilled' && Array.isArray(attendanceData.value)) {
                    const presentCount = attendanceData.value.filter(a => a.present).length;
                    setAttendanceCount(presentCount);
                }
                if (workoutData.status === 'fulfilled') {
                    setRecentWorkout(workoutData.value);
                }
            } catch (err) {
                console.error("Failed to load member dashboard metrics:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [user?.id]);

    // Expiry calculation
    const getDaysRemaining = () => {
        if (!membership?.endDate) return 0;
        const end = new Date(membership.endDate);
        const today = new Date();
        const diffTime = end - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
        );
    }

    const daysLeft = getDaysRemaining();

    return (
        <div className="space-y-8 text-white pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-white">Hello, <span className="text-indigo-400">{user?.name}</span></h1>
                    <p className="text-slate-400 text-lg">Keep pushing! Track your attendance, plans, and metrics in one place.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { icon: <Activity className="text-blue-500" />, label: 'Current Weight', val: '78 kg', change: 'Updated' },
                    { icon: <Flame className="text-orange-500" />, label: 'Workout Splits', val: recentWorkout ? 'Active' : 'Pending', change: 'Details' },
                    { icon: <Calendar className="text-emerald-500" />, label: 'Gym Attendance', val: `${attendanceCount} Days`, change: 'Present' },
                    { icon: <Heart className="text-red-500" />, label: 'Heart Rate', val: '72 bpm', change: 'Normal' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 hover:border-indigo-500/30 transition-all duration-300 border-white/5"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white/5 rounded-xl">{stat.icon}</div>
                            <span className="text-[10px] font-bold text-slate-500 bg-white/5 px-2 py-1 rounded-md uppercase tracking-wider">{stat.change}</span>
                        </div>
                        <h4 className="text-slate-400 font-bold text-sm tracking-wide">{stat.label}</h4>
                        <div className="text-2xl font-extrabold text-white mt-1 uppercase tracking-tighter">{stat.val}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Active workouts overview */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-8 space-y-6">
                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Dumbbell className="w-5 h-5 text-indigo-400" /> Active Routine split
                            </h3>
                            <button
                                onClick={() => navigate('/dashboard/member/workout')}
                                className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                View Plan
                            </button>
                        </div>
                        
                        {recentWorkout ? (
                            <div className="space-y-4">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-sm font-light text-slate-300 whitespace-pre-line leading-relaxed">
                                    {recentWorkout.workoutDetails || 'No exercises listed.'}
                                </div>
                            </div>
                        ) : (
                            <div className="p-8 text-center text-slate-500 text-sm font-light">
                                Your trainer hasn't assigned a workout split yet.
                            </div>
                        )}
                    </div>

                    {/* Nutrition snack summary */}
                    <div className="glass-card p-8 space-y-6">
                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Flame className="w-5 h-5 text-pink-400" /> Nutritional Guide
                            </h3>
                            <button
                                onClick={() => navigate('/dashboard/member/workout')}
                                className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                View Diet
                            </button>
                        </div>
                        
                        {recentWorkout ? (
                            <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-sm font-light text-slate-300 whitespace-pre-line leading-relaxed">
                                {recentWorkout.dietDetails || 'No diet details listed.'}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-slate-500 text-sm font-light">
                                No customized meal splits assigned yet.
                            </div>
                        )}
                    </div>
                </div>

                {/* Membership current card */}
                <div className="space-y-8">
                    <div className="glass-card p-6 bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/10">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-indigo-400" /> Subscription Status
                        </h3>
                        
                        {membership ? (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl text-sm">
                                    <span className="text-slate-400">Status</span>
                                    <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                                        {membership.status}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl text-sm">
                                    <span className="text-slate-400">Expires In</span>
                                    <span className="text-white font-bold">{daysLeft} Days</span>
                                </div>
                                <button
                                    onClick={() => navigate('/dashboard/member/plan')}
                                    className="glass-button w-full mt-4 py-3 font-bold border-indigo-500/40 text-indigo-400 hover:text-white hover:bg-indigo-600 transition-all text-xs"
                                >
                                    Renew Subscription
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl text-sm">
                                    <span className="text-slate-400">Status</span>
                                    <span className="text-amber-400 font-bold uppercase tracking-wider text-xs bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                                        Expired
                                    </span>
                                </div>
                                <p className="text-xs font-light text-slate-400 leading-relaxed">
                                    Purchase a membership plan to unlock exercise splits, diet sheets, and metrics tracking.
                                </p>
                                <button
                                    onClick={() => navigate('/dashboard/member/plan')}
                                    className="primary-button w-full mt-2 py-3 text-xs"
                                >
                                    Choose Plan Now
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Club Info & Support */}
                    <div className="glass-card p-6 bg-gradient-to-br from-indigo-500/5 to-transparent border-white/5 space-y-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-indigo-400" /> Club Access
                        </h3>
                        <div className="space-y-3 text-sm font-light text-slate-300">
                            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                                <span className="text-slate-400">Club Hours</span>
                                <span className="text-white font-semibold">24/7 Access</span>
                            </div>
                            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                                <span className="text-slate-400">Personal Coach</span>
                                <span className="text-indigo-400 font-semibold">{recentWorkout?.trainerName || 'Coach Mike'}</span>
                            </div>
                            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                                <span className="text-slate-400">Support Desk</span>
                                <span className="text-white font-semibold">+1 (800) 555-0199</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberDashboard;
