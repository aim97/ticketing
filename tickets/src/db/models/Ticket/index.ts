import mongoose from 'mongoose';
import { TicketAttrs, TicketDoc, TicketModel } from './ticket.types';

const ticketSchema = new mongoose.Schema<TicketDoc>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

ticketSchema.statics.build = (ticket: TicketAttrs) => {
  return new Ticket(ticket);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('ticket', ticketSchema);

export { Ticket };
