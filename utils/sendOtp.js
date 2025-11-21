export const sendOtp = async (phone, otp) => {
  const { createClient } = await import('@supabase/supabase-js');

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('❌ Supabase credentials missing from .env');
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error } = await supabase
    .from('otp_logs')
    .insert([{ phone, otp, created_at: new Date().toISOString() }]);

  if (error) {
    throw new Error(`Supabase insert failed: ${error.message}`);
  }

  console.log(`📦 Supabase OTP stored for ${phone}: ${otp}`);
};