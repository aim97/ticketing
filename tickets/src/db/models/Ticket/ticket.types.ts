import mongoose from 'mongoose';

export interface TicketAttrs {
  title: string;
  price: number;
  ownerId: mongoose.Schema.Types.ObjectId;
};

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  ownerId: mongoose.Schema.Types.ObjectId;
};

export interface TicketModel extends mongoose.Model<TicketDoc> {
  build(ticket: TicketAttrs): TicketDoc;
};