import React, { useEffect, useState } from "react";
import { getAllCustomers, registerCustomer, deleteCustomer } from "../services/customerService";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ fullName: "", phoneNumber: "" });

  // Tải danh sách khách hàng
  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await getAllCustomers();
      setCustomers(data);
    } catch (error) {
      console.error("Error loading customers:", error);
    }
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      await registerCustomer(newCustomer);
      setNewCustomer({ fullName: "", phoneNumber: "" });
      loadCustomers();
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await deleteCustomer(id);
      loadCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div>
      <h1>Manage Customers</h1>
      <form onSubmit={handleAddCustomer}>
        <input
          type="text"
          placeholder="Full Name"
          value={newCustomer.fullName}
          onChange={(e) => setNewCustomer({ ...newCustomer, fullName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={newCustomer.phoneNumber}
          onChange={(e) => setNewCustomer({ ...newCustomer, phoneNumber: e.target.value })}
          required
        />
        <button type="submit">Add Customer</button>
      </form>

      <h2>Customer List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Phone Number</th>
            <th>Registration Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customerID}>
              <td>{customer.customerID}</td>
              <td>{customer.fullName}</td>
              <td>{customer.phoneNumber}</td>
              <td>{new Date(customer.registrationDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleDeleteCustomer(customer.customerID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
