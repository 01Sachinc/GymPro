import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, UserCheck, Search, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import adminService from '../services/adminService';
import trainerService from '../services/trainerService';

const TrainerAttendance = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [marking, setMarking] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [selectedMember, setSelectedMember] = useState(null);
    const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const data = await adminService.getMembers();
                setMembers(data);
            } catch (err) {
                console.error("Failed to load members:", err);
                setError("Could not load gym members.");
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    const handleMarkAttendance = async (member, isPresent) => {
        setMarking(true);
        setMessage('');
        setError('');
        try {
            await trainerService.markAttendance({
                memberId: member.id,
                date: attendanceDate,
                present: isPresent
            });
            setMessage(`Attendance marked successfully for ${member.name}.`);
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error("Failed to mark attendance:", err);
            setError("Failed to record attendance in the database.");
        } finally {
            setMarking(false);
        }
    };

    const filteredMembers = members.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 pb-10 text-white">
            <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">Record Daily Attendance</h1>
                <p className="text-slate-400 mt-1">Select a member to log their present/absent state for any calendar day.</p>
            </div>

            {message && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>{message}</span>
                </div>
            )}

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Control Panel Card */}
                <div className="glass-card p-6 h-fit space-y-6">
                    <h3 className="text-lg font-bold text-white">Session Parameters</h3>
                    
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Target Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="date"
                                className="w-full pl-10 input-field"
                                value={attendanceDate}
                                onChange={(e) => setAttendanceDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-4">
                        <p className="text-xs text-slate-400 leading-relaxed font-light">
                            Members marked present will see their logs synchronized in real time inside their Member Profile Dashboard under the "Attendance" tab.
                        </p>
                    </div>
                </div>

                {/* Members list */}
                <div className="lg:col-span-2 glass-card overflow-hidden">
                    <div className="p-4 border-b border-white/10 flex items-center bg-white/5 gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                            <input
                                type="text"
                                className="w-full pl-10 input-field"
                                placeholder="Search by athlete name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="p-20 flex justify-center">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        </div>
                    ) : (
                        <div className="divide-y divide-white/5 max-h-[500px] overflow-y-auto">
                            {filteredMembers.map((m) => (
                                <div key={m.id} className="p-4 hover:bg-white/[0.02] transition-colors flex items-center justify-between gap-4 flex-wrap">
                                    <div>
                                        <h4 className="font-bold text-white">{m.name}</h4>
                                        <p className="text-xs text-slate-500 mt-1">{m.email} • {m.phone || 'No phone'}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            disabled={marking}
                                            onClick={() => handleMarkAttendance(m, true)}
                                            className="px-3.5 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/20 text-xs font-bold transition-all"
                                        >
                                            Mark Present
                                        </button>
                                        <button
                                            disabled={marking}
                                            onClick={() => handleMarkAttendance(m, false)}
                                            className="px-3.5 py-2 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 text-xs font-bold transition-all"
                                        >
                                            Mark Absent
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {filteredMembers.length === 0 && (
                                <div className="p-12 text-center text-slate-500">
                                    No members found matching filters.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrainerAttendance;
