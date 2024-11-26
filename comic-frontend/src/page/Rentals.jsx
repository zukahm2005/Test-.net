import React, { useState, useEffect } from "react";
import { getAllComics } from "../services/comicService";
import { rentBooks } from "../services/rentalService";

const RentBooks = () => {
  const [comics, setComics] = useState([]);
  const [rentalDetails, setRentalDetails] = useState([]);
  const [customerID, setCustomerID] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    loadComics();
  }, []);

  const loadComics = async () => {
    try {
      const data = await getAllComics();
      setComics(data);
    } catch (error) {
      console.error("Error loading comics:", error);
    }
  };

  const handleSelectBook = (comic) => {
    const exists = rentalDetails.find((detail) => detail.comicBookID === comic.comicBookID);
    if (exists) {
      setRentalDetails(rentalDetails.filter((detail) => detail.comicBookID !== comic.comicBookID));
    } else {
      setRentalDetails([
        ...rentalDetails,
        { comicBookID: comic.comicBookID, quantity: 1 }, // Mặc định số lượng là 1
      ]);
    }
  };

  const handleQuantityChange = (comicBookID, quantity) => {
    setRentalDetails(
      rentalDetails.map((detail) =>
        detail.comicBookID === comicBookID ? { ...detail, quantity: parseInt(quantity) } : detail
      )
    );
  };

  const handleRent = async () => {
    if (!customerID || rentalDetails.length === 0 || !returnDate) {
      alert("Please fill in all required fields: Customer ID, Return Date, and selected books.");
      return;
    }

    const rentalData = {
      customerID: parseInt(customerID), // Chuyển đổi về số
      returnDate: new Date(returnDate).toISOString(), // Định dạng ngày trả về ISO-8601
      status: "Pending",
      rentalDetails: rentalDetails.map((book) => ({
        comicBookID: book.comicBookID,
        quantity: parseInt(book.quantity), // Đảm bảo quantity là số
      })),
    };

    console.log("Sending rental data:", rentalData);

    try {
      await rentBooks(rentalData);
      alert("Books rented successfully!");
      setCustomerID("");
      setReturnDate("");
      setRentalDetails([]);
    } catch (error) {
      console.error("Error renting books:", error.response?.data || error.message);
      alert("Failed to rent books. Check console for details.");
    }
  };

  return (
    <div>
      <h1>Rent Books</h1>
      <div>
        <label>Customer ID:</label>
        <input
          type="text"
          value={customerID}
          onChange={(e) => setCustomerID(e.target.value)}
        />
      </div>
      <div>
        <label>Return Date:</label>
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
      </div>
      <h2>Available Books</h2>
      <ul>
        {comics.map((comic) => (
          <li key={comic.comicBookID}>
            <input
              type="checkbox"
              onChange={() => handleSelectBook(comic)}
              checked={rentalDetails.some((detail) => detail.comicBookID === comic.comicBookID)}
            />
            {comic.title} - {comic.pricePerDay} per day
            {/* Input để thay đổi số lượng sách */}
            {rentalDetails.some((detail) => detail.comicBookID === comic.comicBookID) && (
              <input
                type="number"
                min="1"
                value={
                  rentalDetails.find((detail) => detail.comicBookID === comic.comicBookID)?.quantity
                }
                onChange={(e) =>
                  handleQuantityChange(comic.comicBookID, e.target.value)
                }
                style={{ marginLeft: "10px" }}
              />
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleRent}>Rent Selected Books</button>
    </div>
  );
};

export default RentBooks;
