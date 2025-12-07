import React, { useState } from 'react';

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

const CustomerDashboard = ({
  formData,
  newBooking,
  bookings,
  onLogout,
  onNewBookingChange,
  onSubmitBooking,
  onCancelBooking
}) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! How can I help you today? 😊' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessages = [...messages, { type: 'user', text: inputMessage }];
    setMessages(newMessages);
    const userMessage = inputMessage;
    setInputMessage('');

    setTimeout(() => {
      const reply = getBotResponse(userMessage);
      setMessages(prev => [...prev, { type: 'bot', text: reply }]);
    }, 500);
  };

  const getBotResponse = (message) => {
    const m = message.toLowerCase();

    if (m.includes('price') || m.includes('cost') || m.includes('how much')) {
      return 'Our repair prices:\n• Cracked Screen - ₱1,500\n• Battery - ₱1,200\n• Charging Issue - ₱800\n• Overheating - ₱900\n• Camera - ₱1,000\n• Microphone/Speaker - ₱700\n• Water Damage - ₱2,000\n• Software - ₱500';
    }
    if (m.includes('long') || m.includes('time') || m.includes('how fast')) {
      return 'Most repairs take 1-2 hours. Complex issues like water damage may take up to 24 hours. We will keep you updated!';
    }
    if (m.includes('warranty') || m.includes('guarantee')) {
      return 'All repairs include a 90-day warranty on parts and labor. If you experience any issues, just bring it back!';
    }
    if (m.includes('where') || m.includes('location') || m.includes('branch')) {
      return 'We have branches in:\n• Sabayle Iligan City\n• Santiago Iligan City\n• Canaway Iligan City\n• Tambo Iligan City\n• Tibanga Iligan City\n• Tubod Iligan City';
    }
    if (m.includes('cancel') || m.includes('reschedule') || m.includes('change')) {
      return 'To cancel your booking, simply click the "Cancel" button next to your pending booking in the table above. You can also contact us at 0912-345-6789 for assistance.';
    }
    if (m.includes('payment') || m.includes('pay')) {
      return 'We accept Cash, Credit Card, GCash, and PayMaya. You can select your preferred payment method when booking.';
    }
    if (m.includes('hello') || m.includes('hi') || m.includes('hey')) {
      return 'Hello! 👋 How can I assist you with your phone repair today?';
    }
    if (m.includes('thank')) {
      return 'You are welcome! Feel free to ask if you need anything else. 😊';
    }
    if (m.includes('book') || m.includes('appointment')) {
      return 'You can book a repair using the form above. Just fill in your device model, issue, preferred date, and location!';
    }
    if (m.includes('hour') || m.includes('open')) {
      return 'We are open Monday to Saturday, 9:00 AM - 6:00 PM. Closed on Sundays and holidays.';
    }

    return 'I can help you with:\n• Repair prices\n• Repair time estimates\n• Warranty information\n• Branch locations\n• Booking & cancellations\n• Payment methods\n• Operating hours\n\nWhat would you like to know?';
  };

  const handleCancel = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      onCancelBooking(bookingId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">📱</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Customer Dashboard</h1>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Booking Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Book a Repair</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Device */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Device Model</label>
              <input
                type="text"
                value={newBooking.device}
                onChange={(e) => onNewBookingChange({ ...newBooking, device: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="iPhone 12"
              />
            </div>
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="text"
                value={newBooking.phone || formData.phone}
                onChange={(e) => onNewBookingChange({ ...newBooking, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0912-345-6789"
              />
            </div>
            {/* Issue */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Issue Description</label>
              <select
                value={newBooking.issue}
                onChange={(e) => onNewBookingChange({ ...newBooking, issue: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select an issue</option>
                {issueOptions.map((issue) => (
                  <option key={issue.name} value={issue.name}>
                    {issue.name} - ₱{issue.price}
                  </option>
                ))}
              </select>
            </div>
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
              <input
                type="date"
                value={newBooking.date}
                onChange={(e) => onNewBookingChange({ ...newBooking, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={newBooking.location}
                onChange={(e) => onNewBookingChange({ ...newBooking, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Sabayle">Sabayle Iligan City</option>
                <option value="Santiago">Santiago Iligan City</option>
                <option value="Canaway">Canaway Iligan City</option>
                <option value="Tambot">Tambo Iligan City</option>
                <option value="Tibanga">Tibanga Iligan City</option>
                <option value="Tubod">Tubod Iligan City</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {/* Payment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
              <select
                value={newBooking.payment}
                onChange={(e) => onNewBookingChange({ ...newBooking, payment: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="GCash">GCash</option>
                <option value="PayMaya">PayMaya</option>
              </select>
            </div>
            {/* Submit */}
            <button
              onClick={onSubmitBooking}
              className="md:col-span-3 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Submit Booking
            </button>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">My Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Device</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Issue</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Payment</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map((booking) => {
                  const issueObj = issueOptions.find(i => i.name === booking.issue);
                  const priceText = issueObj ? `₱${issueObj.price}` : '-';
                  return (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{booking.id}</td>
                      <td className="px-4 py-3 text-sm">{booking.device}</td>
                      <td className="px-4 py-3 text-sm">{booking.phone}</td>
                      <td className="px-4 py-3 text-sm">{booking.issue} ({priceText})</td>
                      <td className="px-4 py-3 text-sm">{booking.date}</td>
                      <td className="px-4 py-3 text-sm">{booking.location}</td>
                      <td className="px-4 py-3 text-sm">{booking.payment}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          booking.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-green-100 text-green-800'
                        }`}>{booking.status}</span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => handleCancel(booking.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition"
                          >
                            Cancel
                          </button>
                        )}
                        {booking.status === 'cancelled' && (
                          <span className="text-gray-500 text-xs">Cancelled</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Chatbot */}
      <div className="fixed bottom-4 right-4 w-80 z-50">
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            {chatOpen ? 'Close Chat' : 'AI Chat'}
          </button>
        </div>
        {chatOpen && (
          <div className="bg-white rounded-lg shadow-lg flex flex-col h-96 overflow-hidden">
            <div className="p-4 flex-1 overflow-y-auto space-y-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg text-sm ${
                    msg.type === 'bot' ? 'bg-gray-100 text-gray-800 self-start' : 'bg-blue-600 text-white self-end'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="p-2 border-t border-gray-200 flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700 transition"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;