import {
  Button,
  Flex,
  Input,
  InputLabel,
  Modal,
  Stack,
  Table,
  Title,
} from '@mantine/core';
import { Invoice } from '../../type';
import { ComponentProps, useMemo, useState } from 'react';

type Props = ComponentProps<typeof Modal> & {
  invoice: Pick<Invoice, 'id' | 'title' | 'items' | 'from' | 'to'>;
  onSubmit: (url: string) => void;
};

export const PaymentModal = ({ invoice, onClose, opened }: Props) => {
  const totalAmount = useMemo(
    () => invoice.items.reduce((acc, item) => acc + item.price, 0),
    [invoice.items]
  );

  const [url, setUrl] = useState('');

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Title size="lg" order={3}>
          「{invoice.to}」さんへの支払い
        </Title>
      }
    >
      <Stack>
        <Table>
          <Table.Tbody>
            <Table.Tr>
              <Table.Th>請求書名</Table.Th>
              <Table.Td>{invoice.title}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>支払い額</Table.Th>
              <Table.Td>{totalAmount} 円</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
        <Flex gap="sm" align="center">
          <InputLabel htmlFor="url" size="sm">
            PayPay URL
          </InputLabel>
          <Input
            id="url"
            type="url"
            value={url}
            style={{ flexGrow: 1 }}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Flex>
        <Button>支払い登録</Button>
      </Stack>
    </Modal>
  );
};
