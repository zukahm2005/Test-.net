import api from "./api";

// Lấy danh sách tất cả khách hàng
export const getAllCustomers = async () => {
  const response = await api.get("/customers");
  return response.data;
};

// Đăng ký khách hàng mới
export const registerCustomer = async (customer) => {
  const response = await api.post("/customers/register", customer);
  return response.data;
};

// Xóa khách hàng theo ID
export const deleteCustomer = async (id) => {
  const response = await api.delete(`/customers/delete/${id}`);
  return response.data;
};
