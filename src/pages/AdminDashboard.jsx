import React from 'react';

const issueOptions = [
  { name: 'Cracked Screen', price: 1500 },
  { name: 'Battery Replacement', price: 1200 },
  { name: 'Charging Issue', price: 800 },
  { name: 'Overheating', price: 900 },
  { name: 'Camera Not Working', price: 1000 },
  { name: 'Microphone Issue', price: 700 },
  { name: 'Speaker Issue', price: 700 },
  { name: 'Water Damage', price: 2000 },
  { name: 'Software Problem', price: 500 },
];

const AdminDashboard = ({ 
  bookings, 
  onLogout, 
  onAssignTechnician, 
  onUpdateStatus 
}) => {
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    inProgress: bookings.filter(b => b.status === 'in-progress').length,
    completed: bookings.filter(b => b.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-800 text-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">⚙️</span>
            </div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-medium">Total Bookings</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg shadow-md p-6">
            <h3 className="text-yellow-800 text-sm font-medium">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg shadow-md p-6">
            <h3 className="text-blue-800 text-sm font-medium">In Progress</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.inProgress}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg shadow-md p-6">
            <h3 className="text-green-800 text-sm font-medium">Completed</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.completed}</p>
          </div>
        </div>

        {/* All Bookings Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">All Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Device</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Issue</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Payment</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map((booking) => {
                  const issueObj = issueOptions.find(i => i.name === booking.issue);
                  const priceText = issueObj ? `₱${issueObj.price}` : '-';

                  return (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{booking.id}</td>
                      <td className="px-4 py-3 text-sm">{booking.customer}</td>
                      <td className="px-4 py-3 text-sm">{booking.phone}</td>
                      <td className="px-4 py-3 text-sm font-semibold">{booking.device}</td>
                      <td className="px-4 py-3 text-sm">{booking.issue} ({priceText})</td>
                      <td className="px-4 py-3 text-sm">{booking.date}</td>
                      <td className="px-4 py-3 text-sm">{booking.location}</td>
                      <td className="px-4 py-3 text-sm">{booking.payment}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          booking.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
