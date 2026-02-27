import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Zap, TrendingUp, Users, Award } from 'lucide-react';
import Navbar from '../components/common/Navbar';

const LandingPage = () => {
    const navigate = useNavigate();

    const features = [
        { icon: <Shield className="w-6 h-6 text-primary" />, title: "Premium Coaching", desc: "Access to world-class trainers and personalized plans." },
        { icon: <Zap className="w-6 h-6 text-primary" />, title: "Real-time Tracking", desc: "Monitor your workouts and progress with precision." },
        { icon: <TrendingUp className="w-6 h-6 text-primary" />, title: "Diet Management", desc: "Scientifically backed nutrition plans for your goals." },
        { icon: <Users className="w-6 h-6 text-primary" />, title: "Community", desc: "Join a community of like-minded fitness enthusiasts." }
    ];

    return (
        <div className="bg-background min-h-screen text-white overflow-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
                            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Fitness Journey</span>
                        </h1>
                        <p className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                            The all-in-one platform for professional gym management and personal growth. Experience premium features designed for athletes and gym owners.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button onClick={() => navigate('/register')} className="primary-button text-lg px-8 py-3">
                                Get Started for Free
                            </button>
                            <button className="glass-button text-lg px-8 py-3">
                                View Pricing
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-4 bg-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose GymPro?</h2>
                        <p className="text-slate-400">Everything you need to manage your gym or track your fitness goals.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-card p-6 hover:border-primary/50 transition-colors"
                            >
                                <div className="mb-4 p-3 bg-primary/10 rounded-xl w-fit">
                                    {f.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto glass-card p-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center bg-gradient-to-b from-white/5 to-transparent">
                    {[
                        { label: "Active Members", val: "10K+" },
                        { label: "Expert Trainers", val: "500+" },
                        { label: "Gym Locations", val: "100+" },
                        { label: "Success Stories", val: "50K+" }
                    ].map((s, i) => (
                        <div key={i}>
                            <div className="text-4xl font-extrabold text-primary mb-2 tracking-tighter">{s.val}</div>
                            <div className="text-sm uppercase tracking-widest text-slate-500 font-bold">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="py-10 border-t border-white/10 text-center text-slate-500 text-sm">
                <p>© 2026 GymPro. All rights reserved. Crafted for excellence.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
