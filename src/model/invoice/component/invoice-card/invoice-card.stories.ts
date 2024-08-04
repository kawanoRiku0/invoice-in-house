import { Meta, StoryObj } from '@storybook/react';
import { InvoiceCard } from './invoice-card';

const meta: Meta<typeof InvoiceCard> = {
  title: 'invoice/invoiceCard',
  component: InvoiceCard,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    invoice: {
      id: '1',
      title: '日用品ダイソー',
      items: [
        { id: '1', name: 'チーズ', price: 100 },
        { id: '2', name: '白米', price: 100 },
      ],
      from: 'かわのりく',
      to: 'きたいけめい',
      createdAt: new Date().toLocaleString(),
    },
  },
};
