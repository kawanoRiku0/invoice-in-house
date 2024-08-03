import { Meta, StoryObj } from '@storybook/react';
import { InvoiceCreateModal } from '.';

const meta: Meta<typeof InvoiceCreateModal> = {
  title: 'invoiceCreateModal',
  component: InvoiceCreateModal,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { opened: true, onClose: () => {}, size: 'xl' },
};
