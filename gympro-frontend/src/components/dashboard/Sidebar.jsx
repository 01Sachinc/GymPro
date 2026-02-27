import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    LayoutDashboard,
    Users,
    CreditCard,
    Settings,
    Dumbbell,
    Calendar,
    Utensils,
    TrendingUp,
    ClipboardList
} from 'lucide-react';

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();

    const getLinks = () => {
        switch (user?.role) {
            case 'ROLE_ADMIN':
                return [
                    { name: 'Dashboard', path: '/dashboard/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
                    { name: 'Members', path: '/dashboard/admin/members', icon: <Users className="w-5 h-5" /> },
                    { name: 'Trainers', path: '/dashboard/admin/trainers', icon: <Dumbbell className="w-5 h-5" /> },
                    { name: 'Plans', path: '/dashboard/admin/plans', icon: <ClipboardList className="w-5 h-5" /> },
                    { name: 'Payments', path: '/dashboard/admin/payments', icon: <CreditCard className="w-5 h-5" /> },
                ];
            case 'ROLE_TRAINER':
                return [
                    { name: 'Dashboard', path: '/dashboard/trainer', icon: <LayoutDashboard className="w-5 h-5" /> },
                    { name: 'My Members', path: '/dashboard/trainer/members', icon: <Users className="w-5 h-5" /> },
                    { name: 'Workout Plans', path: '/dashboard/trainer/workouts', icon: <Dumbbell className="w-5 h-5" /> },
                    { name: 'Attendance', path: '/dashboard/trainer/attendance', icon: <Calendar className="w-5 h-5" /> },
                ];
            case 'ROLE_MEMBER':
                return [
                    { name: 'Overview', path: '/dashboard/member', icon: <LayoutDashboard className="w-5 h-5" /> },
                    { name: 'My Plan', path: '/dashboard/member/plan', icon: <ClipboardList className="w-5 h-5" /> },
                    { name: 'Payments', path: '/dashboard/member/payments', icon: <CreditCard className="w-5 h-5" /> },
                    { name: 'Workout', path: '/dashboard/member/workout', icon: <Dumbbell className="w-5 h-5" /> },
                    { name: 'Progress', path: '/dashboard/member/progress', icon: <TrendingUp className="w-5 h-5" /> },
                ];
            default:
                return [];
        }
    };

    const links = getLinks();

    return (
        <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-background/50 backdrop-blur-xl border-r border-white/10 p-4 scrollbar-hide overflow-y-auto">
            <div className="space-y-2">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${location.pathname === link.path
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <span className={`${location.pathname === link.path ? 'text-white' : 'text-slate-500 group-hover:text-primary transition-colors'}`}>
                            {link.icon}
                        </span>
                        <span className="font-medium text-sm">{link.name}</span>
                    </Link>
                ))}
            </div>

            <div className="absolute bottom-8 left-4 right-4">
                <div className="glass-card p-4 bg-gradient-to-br from-primary/10 to-transparent">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter mb-1">Membership Plan</p>
                    <p className="text-sm font-bold text-white mb-2">Premium Pro</p>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-primary h-full w-2/3" />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2">12 days remaining</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
