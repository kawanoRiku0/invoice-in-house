import { InvoiceItem } from '.';

export type Invoice = {
  id: string;
  title: string;
  items: InvoiceItem[];
  paymentUrl?: string;
  from: string;
  to: string;
};
