import express from 'express';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();

// ✅ Supabase client with service_role key
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// ✅ Utility: Generate 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// ✅ Send OTP
router.post('/send-otp', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ success: false, error: 'Phone number is required' });

    const otp = generateOtp();

    const { error } = await supabase.from('otp_logs').insert([
      { phone: phone.toString(), otp: otp.toString() }
    ]);

    if (error) throw new Error(`Supabase insert failed: ${error.message}`);

    // ✅ Force OTP visibility in all terminals
    console.log(`✅ OTP for ${phone}: ${otp}`);
    process.stdout.write(`\n🔐 OTP for ${phone}: ${otp}\n`);

    res.status(200).json({ success: true, message: 'OTP sent successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Verify OTP and issue JWT
router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) return res.status(400).json({ success: false, error: 'Phone and OTP required' });

    const { data, error } = await supabase
      .from('otp_logs')
      .select('*')
      .eq('phone', phone.toString())
      .eq('otp', otp.toString())
      .order('created_at', { ascending: false })
      .limit(1);

    if (error || !data || data.length === 0) {
      return res.status(401).json({ success: false, error: 'Invalid OTP or phone number' });
    }

    const jwtToken = jwt.sign({ phone }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ success: true, token: jwtToken });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Protected route
router.get('/protected', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.status(200).json({
      success: true,
      message: 'Access granted',
      user: { phone: decoded.phone }
    });
  } catch (err) {
    res.status(401).json({ success: false, error: 'Unauthorized: ' + err.message });
  }
});

export default router;
