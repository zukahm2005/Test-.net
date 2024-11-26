import api from "./api";

// Lấy danh sách truyện tranh
export const getAllComics = async () => {
  const response = await api.get("/comic-books/all");
  return response.data;
};

// Thêm truyện tranh
export const addComic = async (comic) => {
  const response = await api.post("/comic-books/add", comic);
  return response.data;
};

// Cập nhật truyện tranh
export const updateComic = async (id, comic) => {
  const response = await api.put(`/comic-books/update/${id}`, comic);
  return response.data;
};

// Xóa truyện tranh
export const deleteComic = async (id) => {
  const response = await api.delete(`/comic-books/delete/${id}`);
  return response.data;
};
