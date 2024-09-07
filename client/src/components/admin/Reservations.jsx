import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaSort, FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      // Mock data
      const mockReservations = [
        { id: 1, customerName: 'John Doe', date: '2023-05-20', time: '18:00', partySize: 4 },
        { id: 2, customerName: 'Jane Smith', date: '2023-05-21', time: '19:30', partySize: 2 },
        { id: 3, customerName: 'Bob Johnson', date: '2023-05-22', time: '20:00', partySize: 6 },
        { id: 4, customerName: 'Alice Brown', date: '2023-05-23', time: '17:30', partySize: 3 },
        { id: 5, customerName: 'Charlie Wilson', date: '2023-05-24', time: '19:00', partySize: 5 },
      ];
      setReservations(mockReservations);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch reservations');
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditReservation = (id) => {
    // Implement edit reservation functionality
    toast.info(`Edit reservation ${id} functionality to be implemented`);
  };

  const handleDeleteReservation = (id) => {
    // Implement delete reservation functionality
    toast.info(`Delete reservation ${id} functionality to be implemented`);
  };

  const sortedReservations = [...reservations].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredReservations = sortedReservations.filter(
    (reservation) =>
      reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        Reservations
      </motion.h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search reservations..."
          className="w-full px-4 py-2 rounded border"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <motion.div
        className="bg-white shadow-md rounded-lg overflow-hidden"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Name
                <button onClick={() => handleSort('customerName')} className="ml-2">
                  <FaSort />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
                <button onClick={() => handleSort('date')} className="ml-2">
                  <FaSort />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
                <button onClick={() => handleSort('time')} className="ml-2">
                  <FaSort />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Party Size
                <button onClick={() => handleSort('partySize')} className="ml-2">
                  <FaSort />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation) => (
              <tr key={reservation.id} className="border-b">
                <td className="px-6 py-4 whitespace-nowrap">{reservation.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reservation.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reservation.time}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reservation.partySize}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-blue-500 mr-2"
                    onClick={() => handleEditReservation(reservation.id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDeleteReservation(reservation.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default Reservations;
