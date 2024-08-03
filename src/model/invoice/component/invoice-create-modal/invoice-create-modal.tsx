import { Modal, Title } from '@mantine/core';
import { ComponentProps, FC } from 'react';
import { InvoiceCardForm } from '../invoice-card/form';

type Props = ComponentProps<typeof Modal>;

export const InvoiceCreateModal: FC<Props> = ({ ...props }) => {
  return (
    <Modal title={<Title order={2}>請求書作成</Title>} {...props}>
      <InvoiceCardForm onSubmit={() => {}} />
    </Modal>
  );
};
