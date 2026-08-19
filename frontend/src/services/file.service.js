import api from "./api";

const getFiles = async () => {
  const response = await api.get("/files");

  return response.data;
};

const uploadFile = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post("/files/upload", formData);

  return response.data;
};

const searchFiles = async (query) => {
  const response = await api.get("/files/search", {
    params: {
      query,
    },
  });

  return response.data;
};

export default {
  getFiles,
  uploadFile,
  searchFiles,
};
