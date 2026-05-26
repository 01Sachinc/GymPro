import api from './api';

const getActiveMembership = async (memberId) => {
  const response = await api.get(`/api/member/membership/${memberId}`);
  return response.data;
};

const getMyPayments = async (memberId) => {
  const response = await api.get(`/api/member/payments/${memberId}`);
  return response.data;
};

const getLatestWorkoutPlan = async (memberId) => {
  const response = await api.get(`/api/member/workout-plan/${memberId}`);
  return response.data;
};

const getMyAttendance = async (memberId) => {
  const response = await api.get(`/api/member/attendance/${memberId}`);
  return response.data;
};

const getPlansList = async () => {
  const response = await api.get('/api/plans');
  return response.data;
};

const purchaseMembership = async (userId, planId, amount, paymentId) => {
  const response = await api.post('/api/member/purchase', {
    userId,
    planId,
    amount,
    paymentId,
  });
  return response.data;
};

const memberService = {
  getActiveMembership,
  getMyPayments,
  getLatestWorkoutPlan,
  getMyAttendance,
  getPlansList,
  purchaseMembership,
};

export default memberService;
