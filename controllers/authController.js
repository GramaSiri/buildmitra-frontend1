import Vendor from '../models/Vendor.js';
import jwt from 'jsonwebtoken';
import { sendOtp } from '../utils/sendOtp.js';
import { syncToCRM } from '../utils/crmSync.js';

export const requestOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`📲 Generated OTP for ${phone}: ${otp}`);

    await sendOtp(phone, otp); // Supabase insert

    console.log(`✅ OTP ${otp} stored for ${phone}`);
    res.json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error('❌ Error in requestOtp:', err.message);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    console.log(`🔍 Verifying OTP ${otp} for ${phone}`);

    const { createClient } = await import('@supabase/supabase-js');
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    const jwtSecret = process.env.JWT_SECRET;

    console.log(`🔐 Supabase URL: ${supabaseUrl}`);
    console.log(`🔐 Supabase Key: ${supabaseKey ? '✅ Present' : '❌ Missing'}`);
    console.log(`🔐 JWT Secret: ${jwtSecret ? '✅ Present' : '❌ Missing'}`);

    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Supabase credentials missing');
      return res.status(500).json({ error: 'Supabase credentials missing' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase client created');

    const { data, error } = await supabase
      .from('otp_logs')
      .select('*')
      .eq('phone', phone)
      .eq('otp', otp)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('❌ Supabase query error:', error.message);
      return res.status(500).json({ error: 'Supabase query failed' });
    }

    if (!data || data.length === 0) {
      console.log('❌ No matching OTP found');
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    console.log('📂 Supabase Match:', data[0]);

    await syncToCRM({ phone });
    console.log('🔁 CRM sync complete');

    const vendor = await Vendor.findOne({ contactNumber: phone });
    console.log('🔍 Vendor lookup result:', vendor);

    const tokenPayload = {
      phone,
      vendorName: vendor?.vendorName || null,
      tradeType: vendor?.tradeType || null,
      materials: vendor?.materials || null,
      ratePerUnit: vendor?.ratePerUnit || null,
      servicePincodes: vendor?.servicePincodes || null,
      imageUrl: vendor?.imageUrl || null,
    };

    const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: '7d' });
    console.log('🔐 JWT issued');

    const onboardingRequired = !vendor;

    res.json({
      token,
      message: 'Login successful',
      vendor: tokenPayload,
      onboardingRequired,
    });
  } catch (err) {
    console.error('❌ Error in verifyOtp:', err.stack);
    res.status(500).json({ error: 'OTP verification failed' });
  }
};
