import mongoose from 'mongoose';

export interface TicketAttrs {
  title: string;
  price: number;
  ownerId: string;
};

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  ownerId: string;
};

export interface TicketModel extends mongoose.Model<TicketDoc> {
  build(ticket: TicketAttrs): TicketDoc;
};