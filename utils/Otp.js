const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wxbeyjrcfrzhwzjfjcct.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4YmV5anJjZnJ6aHd6amZqY2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NDQ2MzksImV4cCI6MjA3OTEyMDYzOX0.r5ykghiL-s-8Y3G1hOWOxg9GIpSFpa5YU6bgKSl59M0';

const supabase = createClient(supabaseUrl, supabaseKey);

const sendOtp = async (phone) => {
  const { data, error } = await supabase.auth.signInWithOtp({ phone });
  if (error) throw error;
  return data;
};

module.exports = sendOtp;