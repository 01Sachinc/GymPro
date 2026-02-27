import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { Dumbbell, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <Dumbbell className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold tracking-tight text-white">Gym<span className="text-primary">Pro</span></span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-slate-300 hover:text-white transition-colors">Home</Link>
                        <Link to="/plans" className="text-slate-300 hover:text-white transition-colors">Plans</Link>
                        {isLoggedIn ? (
                            <>
                                <Link to="/dashboard" className="text-slate-300 hover:text-white transition-colors">Dashboard</Link>
                                <div className="flex items-center space-x-4 pl-4 border-l border-white/10">
                                    <div className="flex items-center space-x-2">
                                        <UserIcon className="h-5 w-5 text-slate-400" />
                                        <span className="text-sm font-medium text-slate-200">{user.name}</span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="p-2 glass-button text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        <LogOut className="h-5 w-5" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-slate-300 hover:text-white font-medium">Login</Link>
                                <Link to="/register" className="primary-button">Join Now</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
