import { Meta, StoryObj } from '@storybook/react';
import { PaymentModal } from './payment-modal';

const meta: Meta<typeof PaymentModal> = {
  title: 'paymentModal',
  component: PaymentModal,
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
      from: '山田太郎',
      to: '鈴木一郎',
    },
    onClose: () => {
      alert('close');
    },
    opened: true,
  },
};
