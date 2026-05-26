import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import Navbar from '../components/common/Navbar';
import AdminDashboard from '../pages/AdminDashboard';
import TrainerDashboard from '../pages/TrainerDashboard';
import MemberDashboard from '../pages/MemberDashboard';
import AdminMembers from '../pages/AdminMembers';
import AdminPlans from '../pages/AdminPlans';
import AdminTrainers from '../pages/AdminTrainers';
import AdminPayments from '../pages/AdminPayments';
import TrainerMembers from '../pages/TrainerMembers';
import TrainerWorkouts from '../pages/TrainerWorkouts';
import TrainerAttendance from '../pages/TrainerAttendance';
import MemberPlans from '../pages/MemberPlans';
import MemberPayments from '../pages/MemberPayments';
import MemberWorkouts from '../pages/MemberWorkouts';
import MemberProgress from '../pages/MemberProgress';

const DashboardLayout = () => {
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) return null;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <Sidebar />
            <main className="pl-64 pt-16 h-screen overflow-y-auto">
                <div className="p-8 max-w-7xl mx-auto">
                    <Routes>
                        {user?.role === 'ROLE_ADMIN' && (
                            <>
                                <Route path="admin" element={<AdminDashboard />} />
                                <Route path="admin/members" element={<AdminMembers />} />
                                <Route path="admin/trainers" element={<AdminTrainers />} />
                                <Route path="admin/plans" element={<AdminPlans />} />
                                <Route path="admin/payments" element={<AdminPayments />} />
                            </>
                        )}
                        {user?.role === 'ROLE_TRAINER' && (
                            <>
                                <Route path="trainer" element={<TrainerDashboard />} />
                                <Route path="trainer/members" element={<TrainerMembers />} />
                                <Route path="trainer/workouts" element={<TrainerWorkouts />} />
                                <Route path="trainer/attendance" element={<TrainerAttendance />} />
                            </>
                        )}
                        {user?.role === 'ROLE_MEMBER' && (
                            <>
                                <Route path="member" element={<MemberDashboard />} />
                                <Route path="member/plan" element={<MemberPlans />} />
                                <Route path="member/payments" element={<MemberPayments />} />
                                <Route path="member/workout" element={<MemberWorkouts />} />
                                <Route path="member/progress" element={<MemberProgress />} />
                            </>
                        )}

                        {/* Fallback based on role */}
                        <Route path="/" element={
                            user?.role === 'ROLE_ADMIN' ? <Navigate to="admin" /> :
                                user?.role === 'ROLE_TRAINER' ? <Navigate to="trainer" /> :
                                    <Navigate to="member" />
                        } />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
