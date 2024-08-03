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
  TextInput,
  Input,
  InputLabel,
  Select,
  Grid,
  Button,
  NumberInput,
  Center,
} from '@mantine/core';
import { Invoice, InvoiceItem } from '../../../type';
import { FC, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Props = {
  invoice?: Invoice;
  onSubmit: SubmitHandler<InvoiceForm>;
};

type InvoiceForm = Invoice;

const generateRandomString = (charCount = 7): string => {
  const str = Math.random().toString(36).substring(2).slice(-charCount);
  return str.length < charCount
    ? str + 'a'.repeat(charCount - str.length)
    : str;
};

export const InvoiceCard: FC<Props> = ({ invoice, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<InvoiceForm>({
    defaultValues: invoice,
  });

  const { id, title, items, paymentUrl, from, to } = watch();

  const totalPrice = useMemo(
    () => items.reduce((acc, item) => acc + item.price, 0) || 0,
    [items]
  );

  const addItem = (item: InvoiceItem) => {
    setValue('items', [...items, item]);
  };

  const deleteItem = (id: string) => {
    setValue(
      'items',
      items.filter((item) => item.id !== id)
    );
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Flex gap="sm" align="center">
            <InputLabel size="xl" htmlFor="title">
              請求書名:
            </InputLabel>
            <Input
              id="title"
              {...register('title', { required: '請求書名は必須です' })}
            />
            {errors.title && <Text c="red">{errors.title.message}</Text>}
          </Flex>
        </Flex>
        <Stack>
          <Text component="p" size="lg" fw={500}>
            合計 <strong>{totalPrice.toLocaleString()}円</strong>
          </Text>
          {invoice?.paymentUrl && (
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
                      <Table.Th />
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {items.map((item) => (
                      <Table.Tr key={item.id}>
                        <Table.Td>
                          <Input
                            value={item.name}
                            onChange={(e) => {
                              setValue(
                                'items',
                                items.map((i) =>
                                  i.id === item.id
                                    ? { ...i, name: e.target.value }
                                    : i
                                )
                              );
                            }}
                            min={0}
                          />
                        </Table.Td>
                        <Table.Td>
                          <NumberInput
                            value={item.price}
                            onChange={(value) => {
                              setValue(
                                'items',
                                items.map((i) =>
                                  i.id === item.id
                                    ? { ...i, price: Number(value) }
                                    : i
                                )
                              );
                            }}
                            min={0}
                          />
                        </Table.Td>
                        <Table.Td style={{ textAlign: 'center' }}>
                          <Button variant="outline" color="gray">
                            <Icon
                              style={{ cursor: 'pointer' }}
                              icon="mdi:delete"
                              width={18}
                              height={18}
                              onClick={() => deleteItem(item.id)}
                            />
                          </Button>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                    <Table.Tr>
                      <Table.Td colSpan={3}>
                        <Button
                          color="blue"
                          variant="outline"
                          onClick={() =>
                            addItem({
                              id: generateRandomString(),
                              name: '',
                              price: 0,
                            })
                          }
                          w="100%"
                        >
                          追加
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
          <Stack>
            <Flex gap="sm" align="center">
              <InputLabel size="sm" c="dimmed" w="50px" htmlFor="from">
                from:
              </InputLabel>
              <Select
                id="from"
                {...register('from', { required: '送付元は必須です' })}
                value={from}
                onChange={(value) => {
                  setValue('from', value ?? '');
                }}
                searchable
                data={[
                  { value: '1', label: 'わいお' },
                  { value: '2', label: 'よめこ' },
                ]}
              />
              {errors.from && <Text c="red">{errors.from.message}</Text>}
            </Flex>
            <Flex gap="sm" align="center">
              <InputLabel size="sm" c="dimmed" w="50px" htmlFor="to">
                to:
              </InputLabel>
              <Select
                id="to"
                {...register('to', { required: '宛先は必須です' })}
                value={to}
                onChange={(value) => {
                  setValue('to', value ?? '');
                }}
                searchable
                data={[
                  { value: '1', label: 'わいお' },
                  { value: '2', label: 'よめこ' },
                ]}
              />
              {errors.to && <Text c="red">{errors.to.message}</Text>}
            </Flex>
          </Stack>
          <Button type="submit">送信</Button>
        </Stack>
      </form>
    </Card>
  );
};
