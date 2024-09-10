import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaSort, FaEdit, FaTrash, FaPlus, FaTimes, FaSave } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db, auth } from '../../firebase';
import { useAuthContext } from '../../hooks/useAuthContext';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';

const Users = () => {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'staff' });
  const [showAddUserForm, setShowAddUserForm] = useState(false);
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
      setError('Error: Failed to fetch users');
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
      toast.error('Error: Failed to update user');
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleDeleteUser = async (id, uid) => {
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

      toast.success(`User ${id} deleted successfully`);
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      toast.error('Error: Failed to delete user');
    }
  };

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password || !newUser.role) {
      toast.error('All fields are required');
      return;
    }
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
      const firebaseUser = userCredential.user;

      // Add user to Firestore
      await addDoc(collection(db, 'Admin'), {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        uid: firebaseUser.uid
      });

      toast.success(`User ${newUser.name} created successfully`);
      setNewUser({ name: '', email: '', password: '', role: 'staff' });
      setShowAddUserForm(false);
      fetchUsers();
    } catch (err) {
      console.error('Error adding user:', err);
      toast.error('Error: Failed to create user');
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredUsers = sortedUsers.filter(user =>
    (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold text-gray-800 mb-8"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        Manage Users
      </motion.h1>
      {user.role !== 'admin' && (
        <div className="mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setShowAddUserForm(true)}
          >
            <FaPlus /> Add New User
          </button>
          {showAddUserForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-4 rounded shadow-md mt-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Add New User</h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowAddUserForm(false)}
                >
                  <FaTimes />
                </button>
              </div>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 rounded border mb-2"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded border mb-2"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 rounded border mb-2"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
              <select
                className="w-full px-4 py-2 rounded border mb-2"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleAddUser}
              >
                <FaPlus /> Add User
              </button>
            </motion.div>
          )}
        </div>
      )}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
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
                Name
                <button onClick={() => handleSort('name')} className="ml-2">
                  <FaSort />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
                <button onClick={() => handleSort('email')} className="ml-2">
                  <FaSort />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
                <button onClick={() => handleSort('role')} className="ml-2">
                  <FaSort />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-6 py-4 whitespace-nowrap">
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
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
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
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUser && editingUser.id === user.id ? (
                    <>
                      <button
                        className="text-green-500 mr-2"
                        onClick={handleSaveEdit}
                      >
                        <FaSave />
                      </button>
                      <button
                        className="text-gray-500"
                        onClick={handleCancelEdit}
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="text-blue-500 mr-2"
                        onClick={() => handleEditUser(user)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => handleDeleteUser(user.id, user.uid)}
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
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

export default Users;
