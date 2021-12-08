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
    type: String,
    required: true,
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

ticketSchema.statics.build = (ticket: TicketAttrs) => {
  return new Ticket(ticket);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('ticket', ticketSchema);

export { Ticket };
