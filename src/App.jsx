import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { supabase } from './lib/supabaseClient';

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [userRole, setUserRole] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    confirmPassword: '',
    password: '',
    name: '',
    phone: '',
    role: 'customer'
  });

  const [newBooking, setNewBooking] = useState({
    device: '',
    issue: '',
    date: ''
  });

  // ✅ All bookings removed (starts EMPTY)
  const [bookings, setBookings] = useState([]);

  // 🔹 Cancel a booking (mark as cancelled in Supabase)
  const handleDeleteBooking = async (id) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', id);

      if (error) throw error;

      setBookings(bookings.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
    } catch (err) {
      console.error('Cancel booking error:', err);
      alert('Error cancelling booking: ' + (err.message || 'Unknown error'));
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', formData.email)
        .eq('password', formData.password)
        .eq('role', formData.role);

      if (error) throw error;

      if (!data || data.length === 0) {
        alert('Invalid email, password, or role!');
        return;
      }

      const user = data[0];
      localStorage.setItem('currentUser', JSON.stringify(user));
      setUserRole(user.role);
      setFormData({ ...formData, id: user.id });
      setCurrentPage('dashboard');
    } catch (err) {
      console.error('Login error:', err);
      alert('Error logging in: ' + (err.message || 'Unknown error'));
    }
  };

  const handleSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      alert('All fields are required!');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            role: formData.role || 'customer'
          }
        ])
        .select();

      if (error) throw error;

      alert('Account created successfully! Please login.');
      setCurrentPage('login');
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: '',
        role: 'customer'
      });
    } catch (err) {
      console.error('Signup error:', err);
      alert('Error creating account: ' + (err.message || 'Unknown error'));
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentPage('login');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: '',
      role: 'customer'
    });
  };

  const handleSubmitBooking = async () => {
    if (!newBooking.device || !newBooking.issue || !newBooking.date) {
      alert('All fields are required!');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            user_id: formData.id,
            device: newBooking.device,
            phone: newBooking.phone || formData.phone,
            issue: newBooking.issue,
            date: newBooking.date,
            location: newBooking.location || '',
            payment: newBooking.payment || 'pending',
            status: 'pending'
          }
        ])
        .select();

      if (error) throw error;

      setBookings(prev => [data[0], ...prev]);
      setNewBooking({ device: '', issue: '', date: '' });
      alert('Booking submitted successfully!');
    } catch (err) {
      console.error('Booking error:', err);
      alert('Error submitting booking: ' + (err.message || 'Unknown error'));
    }
  };


  const handleUpdateStatus = (id, newStatus) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const handleAssignTechnician = (id, techName) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, technician: techName, status: 'in-progress' } : b));
  };

  // 🔹 Render Pages
  if (currentPage === 'login') {
    return (
      <LoginPage
        formData={formData}
        onInputChange={handleInputChange}
        onLogin={handleLogin}
        onSwitchToSignup={() => setCurrentPage('signup')}
      />
    );
  }

  if (currentPage === 'signup') {
    return (
      <SignupPage
        formData={formData}
        onInputChange={handleInputChange}
        onSignup={handleSignup}
        onSwitchToLogin={() => setCurrentPage('login')}
      />
    );
  }

  if (currentPage === 'dashboard' && userRole === 'customer') {
    return (
      <CustomerDashboard
        formData={formData}
        newBooking={newBooking}
        bookings={bookings}
        onLogout={handleLogout}
        onNewBookingChange={setNewBooking}
        onSubmitBooking={handleSubmitBooking}
        onCancelBooking={handleDeleteBooking}
      />
    );
  }

  if (currentPage === 'dashboard' && userRole === 'admin') {
    return (
      <AdminDashboard
        bookings={bookings}
        onLogout={handleLogout}
        onAssignTechnician={handleAssignTechnician}
        onUpdateStatus={handleUpdateStatus}
        onDeleteBooking={handleDeleteBooking}
      />
    );
  }

  return null;
}
