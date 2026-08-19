import api from "./api";

const getFiles = async () => {
  const response = await api.get("/files");

  return response.data;
};

export default {
  getFiles,
};
