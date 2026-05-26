import api from './api';

const getAllUsers = async () => {
  const response = await api.get('/api/admin/users');
  return response.data;
};

const getMembers = async () => {
  const response = await api.get('/api/admin/members');
  return response.data;
};

const getTrainers = async () => {
  const response = await api.get('/api/admin/trainers');
  return response.data;
};

const deleteUser = async (id) => {
  const response = await api.delete(`/api/admin/users/${id}`);
  return response.data;
};

const createPlan = async (planData) => {
  const response = await api.post('/api/admin/plans', planData);
  return response.data;
};

const updatePlan = async (id, planData) => {
  const response = await api.put(`/api/admin/plans/${id}`, planData);
  return response.data;
};

const deletePlan = async (id) => {
  const response = await api.delete(`/api/admin/plans/${id}`);
  return response.data;
};

const getAllMemberships = async () => {
  const response = await api.get('/api/admin/memberships');
  return response.data;
};

const getAllPayments = async () => {
  const response = await api.get('/api/admin/payments');
  return response.data;
};

const adminService = {
  getAllUsers,
  getMembers,
  getTrainers,
  deleteUser,
  createPlan,
  updatePlan,
  deletePlan,
  getAllMemberships,
  getAllPayments,
};

export default adminService;
