
export const getBotResponse = (message) => {
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

export const initialMessages = [
  { type: 'bot', text: 'Hi! How can I help you today? 😊' }
];