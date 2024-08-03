'use client';

import {
  Card,
  Flex,
  Text,
  Title,
  Accordion,
  AccordionControl,
  Table,
  CheckIcon,
  Stack,
} from '@mantine/core';
import { Invoice } from '../../type';
import { FC, useMemo } from 'react';
import { Icon } from '@iconify/react';

type Props = {
  invoice: Invoice;
};

export const InvoiceCard: FC<Props> = ({
  invoice: { title, items, paymentUrl, from, to },
}) => {
  const totalPrice = useMemo(
    () => items.reduce((acc, item) => acc + item.price, 0),
    [items]
  );
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Flex align="center">
        {paymentUrl ? (
          <Icon
            width={24}
            height={24}
            icon="mdi:check-circle-outline"
            color="green"
          />
        ) : (
          <Icon width={24} height={24} icon="mdi:circle-outline" />
        )}
        <Text component="p" size="xl" fw="normal">
          請求書名: <strong>{title}</strong>
        </Text>
      </Flex>
      <Stack>
        <Text component="p" size="lg" fw={500}>
          合計 <strong>{totalPrice.toLocaleString()}円</strong>
        </Text>
        {paymentUrl && (
          <Text component="h3">
            支払いURL: <a href={paymentUrl}>{paymentUrl}</a>
          </Text>
        )}
        <Accordion chevronPosition="left">
          <Accordion.Item value="item">
            <AccordionControl>
              <Text component="p" size="md">
                項目一覧
              </Text>
            </AccordionControl>
            <Accordion.Panel>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>商品名</Table.Th>
                    <Table.Th>価格</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {items.map((item) => (
                    <Table.Tr key={item.name}>
                      <Table.Td>{item.name}</Table.Td>
                      <Table.Td>{item.price}円</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
        <div>
          <Text component="p" size="sm" c="dimmed">
            from: {from}
          </Text>
          <Text component="p" size="sm" c="dimmed">
            to: {to}
          </Text>
        </div>
      </Stack>
    </Card>
  );
};