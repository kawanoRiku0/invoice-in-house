import { InvoiceItem } from '.';
import { Payment } from './payment';

export type Invoice = {
  id: string;
  title: string;
  items: InvoiceItem[];
  from: string;
  to: string;
  createdAt: string;
  payment?: Payment;
};
