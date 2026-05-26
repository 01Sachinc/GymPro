import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Dumbbell, Utensils, Calendar, User, Loader2, Sparkles } from 'lucide-react';
import memberService from '../services/memberService';

const MemberWorkouts = () => {
    const { user } = useSelector((state) => state.auth);
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchWorkoutPlan = async () => {
            if (!user?.id) return;
            try {
                const data = await memberService.getLatestWorkoutPlan(user.id);
                setPlan(data);
            } catch (err) {
                // Not found is a common error if not assigned yet
                if (err.response?.status === 404) {
                    setPlan(null);
                } else {
                    setError('Could not retrieve your workout plan.');
                    console.error(err);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchWorkoutPlan();
    }, [user?.id]);

    return (
        <div className="space-y-6 pb-10 text-white">
            <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">Assigned Routine</h1>
                <p className="text-slate-400 mt-1">Review your active exercise schedules and daily caloric intake sheets.</p>
            </div>

            {loading ? (
                <div className="p-20 flex justify-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            ) : error ? (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl">
                    {error}
                </div>
            ) : plan ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Workout Splits */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-6 space-y-6"
                    >
                        <div className="flex items-center space-x-3 border-b border-white/5 pb-4">
                            <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl">
                                <Dumbbell className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Exercise Splits</h3>
                                <p className="text-xs text-slate-500 mt-0.5">Your physical training schedule</p>
                            </div>
                        </div>

                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed font-light font-sans">
                                {plan.workoutDetails || 'No workout splits provided yet.'}
                            </p>
                        </div>
                    </motion.div>

                    {/* Diet & Nutrition */}
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-6 space-y-6"
                    >
                        <div className="flex items-center space-x-3 border-b border-white/5 pb-4">
                            <div className="p-2.5 bg-pink-500/10 text-pink-400 rounded-xl">
                                <Utensils className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Nutrition split</h3>
                                <p className="text-xs text-slate-500 mt-0.5">Daily caloric splits and meal guidelines</p>
                            </div>
                        </div>

                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed font-light font-sans">
                                {plan.dietDetails || 'No diet splits provided yet.'}
                            </p>
                        </div>
                    </motion.div>

                    {/* Metadata summary */}
                    <div className="lg:col-span-2 glass-card p-4 flex items-center justify-between text-xs text-slate-500 gap-4 flex-wrap border-white/5 bg-gradient-to-r from-indigo-500/5 to-transparent">
                        <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-indigo-400" />
                            <span>Assigned by: Coach #{plan.trainerId || 'Instructor'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-pink-400" />
                            <span>Assigned Date: {plan.createdAt ? new Date(plan.createdAt).toLocaleDateString() : 'Active'}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="glass-card p-12 text-center max-w-2xl mx-auto space-y-6">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-indigo-400 border border-white/10">
                        <Sparkles className="w-8 h-8 animate-pulse" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white">No active plan assigned</h3>
                        <p className="text-slate-400 max-w-md mx-auto text-sm font-light">
                            Your trainers haven't configured a personalized workout or diet plan for your account yet. Reach out to them to customize your fitness schedule.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MemberWorkouts;
