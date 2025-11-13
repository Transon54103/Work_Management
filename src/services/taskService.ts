import api from "../utils/api";

const taskService = {
  getTasks: () => api.get("/TaskWork"),
  updateTask: (data: any) => api.put(`/TaskWork`, data),
};

export default taskService;
