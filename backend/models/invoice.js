const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  quoteId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Quote'
  },
  clientId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Client'
  },
  amountDue: {
    type: Number,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Overdue'],
    default: 'Pending'
  }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
