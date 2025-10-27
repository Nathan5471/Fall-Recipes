import axios from "axios";

const baseURL = window.location.origin;
const api = axios.create({
  baseURL: `${baseURL}/api/recipes`,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(
      error.response ? error.response.data : { message: "Network Error" }
    );
  }
);

export const createRecipe = async (recipeData: FormData) => {
  const response = await api.post("/create", recipeData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const approveRecipe = async (id: string) => {
  const response = await api.post(`/approve/${id}`);
  return response.data;
};

export const rejectRecipe = async (id: string, reason: string) => {
  const response = await api.post(`/reject/${id}`, { reason });
  return response.data;
};

export const requestReapproval = async (id: string, message: string) => {
  const response = await api.post(`/request-reapproval/${id}`, { message });
  return response.data;
};

export const getAllRecipes = async () => {
  const response = await api.get("/all");
  return response.data;
};

export const getPendingApprovalRecipes = async () => {
  const response = await api.get("/all/pending-approval");
  return response.data;
};

export const getRejectedRecipesByUser = async () => {
  const response = await api.get("/all/rejected");
  return response.data;
};

export const getRecipesByUserId = async (userId: string) => {
  const response = await api.get(`/user/${userId}`);
  return response.data;
};

export const getStats = async () => {
  const response = await api.get("/stats");
  return response.data;
};

export const getRecipeById = async (id: string) => {
  const response = await api.get(`/${id}`);
  return response.data;
};
