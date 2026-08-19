import api from "./api";

const getFiles = async () => {
  const response = await api.get("/files");

  return response.data;
};

const getFileById = async (id) => {
  const response = await api.get(`/files/${id}`);

  return response.data;
};

const uploadFile = async (file, onProgress) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post("/files/upload", formData, {
    onUploadProgress: (progressEvent) => {
      if (!progressEvent.total) {
        return;
      }

      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );

      onProgress(percent);
    },
  });

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
  getFileById,
  uploadFile,
  searchFiles,
};
