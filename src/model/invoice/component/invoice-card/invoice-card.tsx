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
  Group,
  Box,
  Button,
  Menu,
} from '@mantine/core';
import { Invoice } from '../../type';
import { FC, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import { InvoiceCardForm } from './form';
import { useDisclosure } from '@mantine/hooks';

type Props = {
  invoice: Invoice;
};

export const InvoiceCard: FC<Props> = ({ invoice }) => {
  const { title, items, payment, from, to, createdAt } = invoice;

  const [isEditing, setIsEditing] = useState(false);

  const [isMenuOpen, { open: openMenu, close: closeMenu }] = useDisclosure();

  const totalPrice = useMemo(
    () => items.reduce((acc, item) => acc + item.price, 0),
    [items]
  );
  return (
    <>
      {isEditing ? (
        <InvoiceCardForm
          invoice={invoice}
          onSubmit={() => setIsEditing(false)}
        />
      ) : (
        <Card shadow="sm" padding="lg" radius="sm" withBorder>
          <Group align="center" justify="space-between">
            <Group align="center">
              <Icon
                width={24}
                height={24}
                icon={
                  payment ? 'mdi:check-circle-outline' : 'mdi:circle-outline'
                }
                color={payment ? 'green' : 'gray'}
              />

              <Text component="p" size="lg" fw="normal">
                <strong>{title}</strong>
              </Text>
            </Group>
            {!payment && (
              <Menu opened={isMenuOpen} onOpen={openMenu} onClose={closeMenu}>
                <Menu.Target>
                  <Icon
                    icon="mdi:dots-vertical"
                    role="button"
                    tabIndex={0}
                    width={18}
                    height={18}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openMenu();
                      }
                    }}
                  />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={() => setIsEditing(true)}>
                    <Button size="xs" variant="transparent">
                      編集
                    </Button>
                  </Menu.Item>
                  <Menu.Item onClick={() => setIsEditing(true)}>
                    <Button size="xs" variant="transparent">
                      削除
                    </Button>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
          <Stack>
            <Text component="p" size="md" fw={500}>
              合計 <strong>{totalPrice.toLocaleString()}円</strong>
            </Text>
            {payment && (
              <Text component="h3">
                支払いURL: <a href={payment.url}>{payment.url}</a>
              </Text>
            )}
            <Accordion chevronPosition="left">
              <Accordion.Item value="item">
                <AccordionControl>
                  <Text component="p" size="sm">
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
              <Text component="p" size="sm" c="dimmed">
                createdAt: {createdAt}
              </Text>
            </div>
          </Stack>
        </Card>
      )}
    </>
  );
};
