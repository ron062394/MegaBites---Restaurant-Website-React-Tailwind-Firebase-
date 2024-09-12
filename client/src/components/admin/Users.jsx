import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaSort, FaEdit, FaTrash, FaPlus, FaTimes, FaSave } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db, auth } from '../../firebase';
import { useAuthContext } from '../../hooks/useAuthContext';
import { collection, getDocs, setDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';

const Users = () => {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'staff' });
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, 'Admin');
      const snapshot = await getDocs(usersRef);
      const fetchedUsers = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name || 'N/A',
        email: doc.data().email || 'N/A',
        role: doc.data().role || 'N/A',
        uid: doc.data().uid || null,
      }));
      console.log(fetchedUsers);
      setUsers(fetchedUsers);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users');
      setLoading(false);
      toast.error('Failed to fetch users. Please try again.');
    }
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
  };

  const handleSaveEdit = async () => {
    try {
      const userRef = doc(db, 'Admin', editingUser.id);
      await updateDoc(userRef, {
        name: editingUser.name,
        role: editingUser.role
      });
      toast.success(`User ${editingUser.name} updated successfully`);
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error('Error updating user:', err);
      toast.error('Failed to update user. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleDeleteUser = async (id, uid) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        // Delete user from Firestore
        await deleteDoc(doc(db, 'Admin', id));

        // Delete user from Firebase Authentication
        if (uid) {
          const userToDelete = auth.currentUser;
          if (userToDelete && userToDelete.uid === uid) {
            await deleteUser(userToDelete);
          }
        }

        toast.success(`User has been deleted`);
        fetchUsers();
      } catch (err) {
        console.error('Error deleting user:', err);
        toast.error('Failed to delete user. Please try again.');
      }
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password || !newUser.role) {
      toast.error('All fields are required');
      return;
    }
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
      const firebaseUser = userCredential.user;

      // Add user to Firestore with the same document ID as the auth UID
      await setDoc(doc(db, 'Admin', firebaseUser.uid), {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        uid: firebaseUser.uid
      });

      toast.success(`New user added successfully!`);
      setNewUser({ name: '', email: '', password: '', role: 'staff' });
      setIsUserModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error('Error adding user: ', error);
      toast.error('Failed to add user. Please try again.');
    }
  };

  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig.key !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const filteredUsers = sortedUsers.filter(user =>
    (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <div className="text-center text-2xl text-gray-800">Loading...</div>;
  if (error) return <div className="text-center text-2xl text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      <motion.h1
        className="text-4xl font-bold mb-6 text-gray-800 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        User Management
      </motion.h1>
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center mb-6"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <motion.button
          className="bg-gray-700 text-white px-6 py-3 rounded-full mb-4 md:mb-0 flex items-center justify-center hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 shadow-lg"
          onClick={() => setIsUserModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlus className="mr-2" /> Add New User
        </motion.button>
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="pl-10 pr-4 py-3 rounded-full shadow appearance-none border w-full text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-300"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </motion.div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-800">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 cursor-pointer" onClick={() => requestSort('name')}>
                Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th className="p-3 cursor-pointer" onClick={() => requestSort('email')}>
                Email {sortConfig.key === 'email' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th className="p-3 cursor-pointer" onClick={() => requestSort('role')}>
                Role {sortConfig.key === 'role' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="p-3">
                    {editingUser && editingUser.id === user.id ? (
                      <input
                        type="text"
                        value={editingUser.name}
                        onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                        className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    {editingUser && editingUser.id === user.id ? (
                      <select
                        value={editingUser.role}
                        onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                        className="w-full px-2 py-1 border rounded"
                      >
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td className="p-3">
                    {editingUser && editingUser.id === user.id ? (
                      <>
                        <motion.button
                          className="bg-gray-700 text-white px-4 py-2 rounded-full mr-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 shadow-lg"
                          onClick={handleSaveEdit}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaSave className="mr-2 inline" /> Save
                        </motion.button>
                        <motion.button
                          className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300 shadow-lg"
                          onClick={handleCancelEdit}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaTimes className="mr-2 inline" /> Cancel
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <motion.button
                          className="bg-gray-700 text-white px-4 py-2 rounded-full mr-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 shadow-lg"
                          onClick={() => handleEditUser(user)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaEdit className="mr-2 inline" /> Edit
                        </motion.button>
                        <motion.button
                          className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300 shadow-lg"
                          onClick={() => handleDeleteUser(user.id, user.uid)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaTrash className="mr-2 inline" /> Delete
                        </motion.button>
                      </>
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <AnimatePresence>
        {isUserModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Add New User</h2>
              <form onSubmit={handleAddUser}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                  <select
                    id="role"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Add User
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsUserModalOpen(false)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer />
    </div>
  );
};

export default Users;
