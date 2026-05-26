import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Dumbbell, Save, Loader2, Sparkles, Clipboard, Utensils } from 'lucide-react';
import adminService from '../services/adminService';
import trainerService from '../services/trainerService';

const TrainerWorkouts = () => {
    const { user } = useSelector((state) => state.auth);
    const [members, setMembers] = useState([]);
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const [newPlan, setNewPlan] = useState({
        memberId: '',
        workoutDetails: '',
        dietDetails: ''
    });

    const loadData = async () => {
        if (!user?.id) return;
        setLoading(true);
        try {
            const [membersData, plansData] = await Promise.all([
                adminService.getMembers(),
                trainerService.getMyWorkoutPlans(user.id)
            ]);
            setMembers(membersData);
            setPlans(plansData);
        } catch (err) {
            console.error("Failed to load workouts data:", err);
            setError("Could not retrieve members or plans repository.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [user?.id]);

    const handleAssign = async (e) => {
        e.preventDefault();
        if (!newPlan.memberId || !newPlan.workoutDetails || !newPlan.dietDetails) return;

        setSubmitting(true);
        try {
            const payload = {
                memberId: parseInt(newPlan.memberId),
                trainerId: user.id,
                workoutDetails: newPlan.workoutDetails,
                dietDetails: newPlan.dietDetails
            };
            const created = await trainerService.addWorkoutPlan(payload);
            setPlans([created, ...plans]);
            setNewPlan({ memberId: '', workoutDetails: '', dietDetails: '' });
            alert("Routine successfully assigned!");
        } catch (err) {
            console.error("Failed to save and assign:", err);
            alert("Failed to assign routine to member.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 text-white pb-10">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Routine Repository</h1>
                <p className="text-slate-400 mt-1">Assign custom workout splits and diet plans directly to active gym members.</p>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Assign Routine Form */}
                <div className="glass-card p-6 h-fit space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Clipboard className="w-5 h-5 text-indigo-400" /> Assign Workout & Diet splits
                    </h3>

                    <form onSubmit={handleAssign} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Select Athlete</label>
                            <select
                                required
                                className="w-full input-field bg-[#0b0f19] border-white/10 text-slate-200"
                                value={newPlan.memberId}
                                onChange={(e) => setNewPlan({ ...newPlan, memberId: e.target.value })}
                            >
                                <option value="">Choose a member...</option>
                                {members.map((m) => (
                                    <option key={m.id} value={m.id}>{m.name} ({m.email})</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Workout Split Details</label>
                            <textarea
                                required
                                className="w-full h-32 input-field text-sm font-sans"
                                placeholder="Push split: Bench press 4x8, Shoulder press 3x10...&#10;Pull split: Pullups 4x10, Barbell rows 3x8..."
                                value={newPlan.workoutDetails}
                                onChange={(e) => setNewPlan({ ...newPlan, workoutDetails: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Diet & Nutrition Guidelines</label>
                            <textarea
                                required
                                className="w-full h-32 input-field text-sm font-sans"
                                placeholder="Breakfast: 4 boiled egg whites, oatmeal...&#10;Lunch: Chicken breast, brown rice, broccoli..."
                                value={newPlan.dietDetails}
                                onChange={(e) => setNewPlan({ ...newPlan, dietDetails: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full primary-button py-3.5 flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20"
                        >
                            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> <span>Save & Assign Routine</span></>}
                        </button>
                    </form>
                </div>

                {/* History list */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white">Assigned Routines History</h3>

                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                        {plans.map((p, i) => {
                            const memberName = members.find(m => m.id === p.memberId)?.name || `Member #${p.memberId}`;
                            return (
                                <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="glass-card p-5 border-l-4 border-l-indigo-500 hover:bg-white/[0.03] transition-all"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400">
                                                <Dumbbell className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white">Split for {memberName}</h4>
                                                <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest">
                                                    Assigned {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'Today'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/5 pt-4 text-xs font-light text-slate-300">
                                        <div>
                                            <p className="font-bold text-indigo-400 uppercase tracking-widest text-[9px] mb-1.5 flex items-center gap-1">
                                                <Dumbbell className="w-3 h-3" /> Workout details
                                            </p>
                                            <p className="line-clamp-3 leading-relaxed whitespace-pre-wrap">{p.workoutDetails}</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-pink-400 uppercase tracking-widest text-[9px] mb-1.5 flex items-center gap-1">
                                                <Utensils className="w-3 h-3" /> Nutrition details
                                            </p>
                                            <p className="line-clamp-3 leading-relaxed whitespace-pre-wrap">{p.dietDetails}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}

                        {plans.length === 0 && (
                            <div className="glass-card p-12 text-center text-slate-500 space-y-4">
                                <Sparkles className="w-8 h-8 text-slate-600 animate-pulse mx-auto" />
                                <p>You haven't assigned any workout splits yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainerWorkouts;
