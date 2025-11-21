import mongoose from 'mongoose';

const crmLeadSchema = new mongoose.Schema({
  referenceId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  module: {
    type: String,
    enum: ['Drawing', 'BOQ', 'Quiz', 'Property', 'Affiliate', 'Other'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Created', 'Viewed', 'Shared'],
    default: 'Created'
  }
});

const CRMLead = mongoose.model('CRMLead', crmLeadSchema);
export default CRMLead;
