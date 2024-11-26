import api from "./api";

// Thuê sách
export const rentBooks = async (rentalData) => {
  const response = await api.post("/rentals/rental/books", rentalData);
  return response.data;
};

// Lấy báo cáo thuê sách
export const getRentalReport = async (startDate, endDate) => {
  const response = await api.get("/rentals/report", {
    params: { startDate, endDate },
  });
  return response.data;
};
