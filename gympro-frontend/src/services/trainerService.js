import api from './api';

const addWorkoutPlan = async (workoutPlanData) => {
  const response = await api.post('/api/trainer/workout-plans', workoutPlanData);
  return response.data;
};

const getMyWorkoutPlans = async (trainerId) => {
  const response = await api.get(`/api/trainer/workout-plans/${trainerId}`);
  return response.data;
};

const markAttendance = async (attendanceData) => {
  const response = await api.post('/api/trainer/attendance', attendanceData);
  return response.data;
};

const getMemberAttendance = async (memberId) => {
  const response = await api.get(`/api/trainer/attendance/${memberId}`);
  return response.data;
};

const trainerService = {
  addWorkoutPlan,
  getMyWorkoutPlans,
  markAttendance,
  getMemberAttendance,
};

export default trainerService;
