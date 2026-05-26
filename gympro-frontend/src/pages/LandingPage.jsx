import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Shield, Zap, TrendingUp, Users, ArrowRight, Star, HeartHandshake } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import memberService from '../services/memberService';

const LandingPage = () => {
    const navigate = useNavigate();
    const [plans, setPlans] = useState([]);
    const [loadingPlans, setLoadingPlans] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const data = await memberService.getPlansList();
                setPlans(data);
            } catch (err) {
                console.error("Failed to load plans from backend:", err);
                // Fallback local plans
                setPlans([
                    { id: 1, planName: 'Basic Starter', price: 29.99, durationDays: 30, description: 'Essential gym access, cardio, and basic equipment access.' },
                    { id: 2, planName: 'Premium Pro', price: 59.99, durationDays: 30, description: 'All gym access, personal trainer guidance, and AI customized plans.' },
                    { id: 3, planName: 'Elite Annual', price: 499.99, durationDays: 365, description: 'Luxury full-year access, VIP perks, personal locker, and nutritional plan.' },
                ]);
            } finally {
                setLoadingPlans(false);
            }
        };
        fetchPlans();
    }, []);

    const features = [
        { icon: <Shield className="w-6 h-6 text-indigo-400" />, title: "Premium Coaching", desc: "Access to world-class certified trainers and fully personalized training routines." },
        { icon: <Zap className="w-6 h-6 text-purple-400" />, title: "Real-time Tracking", desc: "Monitor your workouts, active sessions, and attendance metrics with premium dashboards." },
        { icon: <TrendingUp className="w-6 h-6 text-pink-400" />, title: "Diet & Nutrition", desc: "Scientifically backed nutrition and meal guidance integrated with your workouts." },
        { icon: <Users className="w-6 h-6 text-emerald-400" />, title: "Supportive Community", desc: "Connect, compete, and share your fitness journey with like-minded enthusiasts." }
    ];

    const testimonials = [
        { name: "Alexander Wright", role: "Athlete", quote: "GymPro completely streamlined my routine. The workout tracking and direct trainer chat made a massive difference in my competitive prep.", rating: 5 },
        { name: "Jessica Miller", role: "SaaS Founder", quote: "The clean UI and simple billing dashboard are incredible. It feels like Stripe but for my fitness goals. Highly recommended!", rating: 5 },
        { name: "Marcus Thompson", role: "Trainer", quote: "As a coach, this tool has changed how I interact with clients. Assigning plans and tracking attendance takes seconds now.", rating: 5 }
    ];

    return (
        <div className="bg-[#030712] min-h-screen text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
            <Navbar />

            {/* Glowing background meshes */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[160px]" />
                <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[140px]" />
            </div>

            {/* Hero Section */}
            <section className="relative pt-36 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">
                            <Star className="w-3.5 h-3.5 fill-indigo-400" /> Introducing GymPro Enterprise
                        </span>
                        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-white">
                            The Modern Operating System for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">Premium Gyms</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                            A beautifully designed, premium SaaS platform for gym owners, trainers, and athletes. Track progress, manage memberships, and scale operations effortlessly.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => navigate('/register')}
                                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 group"
                            >
                                Get Started Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <a
                                href="#pricing"
                                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-white/20 transition-all font-semibold text-center"
                            >
                                View Premium Pricing
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-white/[0.01]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Engineered for Performance</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Everything you need to deliver an elite fitness management experience, powered by modern tech.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.05] transition-all group"
                            >
                                <div className="mb-6 p-3 bg-indigo-500/10 rounded-xl w-fit group-hover:scale-110 transition-transform">
                                    {f.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3">{f.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed font-light">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Loved by Athletes and Owners</h2>
                        <p className="text-slate-400 max-w-xl mx-auto">See how GymPro is transforming workouts and administrative work globally.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex gap-1 mb-6 text-amber-400">
                                        {[...Array(t.rating)].map((_, idx) => (
                                            <Star key={idx} className="w-4 h-4 fill-amber-400" />
                                        ))}
                                    </div>
                                    <p className="text-slate-300 italic mb-6 font-light">"{t.quote}"</p>
                                </div>
                                <div className="border-t border-white/5 pt-4 flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-white text-sm">{t.name}</p>
                                        <p className="text-indigo-400 text-xs mt-0.5">{t.role}</p>
                                    </div>
                                    <HeartHandshake className="w-5 h-5 text-slate-600" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dynamic Pricing Section */}
            <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-white/[0.01]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Simple, Transparent Pricing</h2>
                        <p className="text-slate-400 max-w-xl mx-auto">Unlock direct access, premium coaching support, and AI diet integrations.</p>
                    </div>

                    {loadingPlans ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map((n) => (
                                <div key={n} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 h-96 animate-pulse flex flex-col justify-between">
                                    <div className="space-y-4">
                                        <div className="h-6 bg-white/10 rounded w-1/3" />
                                        <div className="h-10 bg-white/10 rounded w-1/2" />
                                        <div className="h-4 bg-white/10 rounded w-5/6" />
                                    </div>
                                    <div className="h-12 bg-white/10 rounded w-full" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {plans.map((p, i) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className={`p-8 rounded-2xl bg-white/[0.02] border flex flex-col justify-between relative overflow-hidden transition-all hover:scale-[1.02] duration-300 ${
                                        p.planName.toLowerCase().includes('premium') || p.planName.toLowerCase().includes('pro')
                                            ? 'border-indigo-500 shadow-xl shadow-indigo-600/10'
                                            : 'border-white/5'
                                    }`}
                                >
                                    {(p.planName.toLowerCase().includes('premium') || p.planName.toLowerCase().includes('pro')) && (
                                        <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-extrabold uppercase py-1 px-4 rounded-bl-xl tracking-tighter">
                                            Recommended
                                        </div>
                                    )}
                                    <div>
                                        <div className="mb-6">
                                            <h3 className="text-xl font-bold text-white mb-2">{p.planName}</h3>
                                            <p className="text-slate-400 text-xs font-light leading-relaxed">{p.description}</p>
                                        </div>
                                        <div className="mb-8">
                                            <span className="text-4xl font-extrabold text-white">${p.price}</span>
                                            <span className="text-slate-500 text-sm font-medium ml-2">/ {p.durationDays} days</span>
                                        </div>
                                        <div className="space-y-4 mb-10">
                                            <div className="flex items-center gap-3 text-sm text-slate-300">
                                                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                                <span>Full access to gym equipment</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-slate-300">
                                                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                                <span>Digital attendance log</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-slate-300">
                                                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                                <span>{p.price > 40 ? 'Personal Trainer Support' : <span className="text-slate-600 line-through">Personal Trainer Support</span>}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-slate-300">
                                                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                                <span>{p.price > 100 ? 'Exclusive VIP perks & locker' : <span className="text-slate-600 line-through">Exclusive VIP perks & locker</span>}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate('/register')}
                                        className={`w-full py-4 rounded-xl font-bold text-sm transition-all text-center ${
                                            p.planName.toLowerCase().includes('premium') || p.planName.toLowerCase().includes('pro')
                                                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                                                : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'
                                        }`}
                                    >
                                        Subscribe Now
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/5 bg-[#020610] text-center text-slate-600 text-xs">
                <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p>© 2026 GymPro Inc. Built for investors and production-grade efficiency.</p>
                    <div className="flex gap-6 text-slate-500">
                        <a href="#features" className="hover:text-slate-300 transition-colors">Features</a>
                        <a href="#pricing" className="hover:text-slate-300 transition-colors">Pricing</a>
                        <a href="/login" className="hover:text-slate-300 transition-colors">Console</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
