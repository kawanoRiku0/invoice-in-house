'use client';

import { InvoiceCard } from '@/model/invoice/component/invoice-card';
import { InvoiceCreateModal } from '@/model/invoice/component/invoice-create-modal';
import { Invoice } from '@/model/invoice/type';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, Group, Modal, Stack, Tabs } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useMemo, useState } from 'react';

export default function Page() {
  const invoices = [
    {
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
    {
      id: '2',
      title: 'イオンモール食料',
      items: [
        { id: '1', name: 'チーズ', price: 100 },
        { id: '2', name: '白米', price: 100 },
      ],
      from: 'かわのりく',
      to: 'きたいけめい',
      createdAt: new Date().toLocaleString(),
      payment: {
        invoiceId: '2',
        url: 'https://example.com',
        createdAt: new Date().toLocaleString(),
      },
    },
    {
      id: '3',
      title: '日用品ダイソー',
      items: [
        { id: '1', name: 'チーズ', price: 100 },
        { id: '2', name: '白米', price: 100 },
      ],
      from: 'きたいけめい',
      to: 'かわのりく',
      createdAt: new Date().toLocaleString(),
    },
    {
      id: '4',
      title: 'イオンモール食料',
      items: [
        { id: '1', name: 'チーズ', price: 100 },
        { id: '2', name: '白米', price: 100 },
      ],
      from: 'きたいけめい',
      to: 'かわのりく',
      createdAt: new Date().toLocaleString(),
      payment: {
        invoiceId: '4',
        url: 'https://example.com',
        createdAt: new Date().toLocaleString(),
      },
    },
  ] satisfies Invoice[];

  const [activeTab, setActiveTab] = useState<'all' | 'mine' | 'others'>('all');

  const [statusPaid, setStatusPaid] = useState(true);
  const [statusUnpaid, setStatusUnpaid] = useState(true);

  const filteredInvoices = useMemo(
    () =>
      invoices
        .filter((invoice) => {
          if (activeTab === 'all') return true;
          if (activeTab === 'mine') return invoice.from === 'かわのりく';
          if (activeTab === 'others') return invoice.from !== 'かわのりく';
          return false;
        })
        .filter((invoice) => {
          return (
            (statusPaid && invoice.payment) ||
            (statusUnpaid && !invoice.payment) ||
            (statusPaid && statusUnpaid)
          );
        }),
    [activeTab, invoices, statusPaid, statusUnpaid]
  );

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <main style={{ padding: '20px 0' }}>
      <Stack>
        <Tabs
          value={activeTab}
          onChange={(value) => setActiveTab(value as 'all' | 'mine' | 'others')}
        >
          <Tabs.List>
            <Tabs.Tab value="all">全て</Tabs.Tab>
            <Tabs.Tab value="mine">自分が作成</Tabs.Tab>
            <Tabs.Tab value="others">自分以外が作成</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <Group>
          <Button
            variant={statusUnpaid ? 'filled' : 'outline'}
            radius="lg"
            onClick={() => setStatusUnpaid((prev) => !prev)}
          >
            未払い
          </Button>
          <Button
            variant={statusPaid ? 'filled' : 'outline'}
            radius="lg"
            onClick={() => setStatusPaid((prev) => !prev)}
          >
            支払い済み
          </Button>
        </Group>
        <Stack>
          {filteredInvoices.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </Stack>
      </Stack>
      {/* モーダルなど基本通常時は表示されないもの */}
      <Button
        onClick={open}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
        }}
        radius="xl"
        size="xl"
        color="blue"
      >
        <Icon icon="mdi:plus" />
      </Button>
      <InvoiceCreateModal size="xl" opened={opened} onClose={close} />
    </main>
  );
}
