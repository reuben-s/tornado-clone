'use client'

import { Container, Group } from '@mantine/core';

import { Notification } from '../components/Notification/Notification';
import { DepositWithdraw } from '../components/DepositWithdraw/DepositWithdraw';
import { Stats } from '../components/Stats/Stats';

export default function HomePage() {
  return (
    <>
      <Notification message="Please, do not use Binance wallet addresses for withdrawals. Internal transactions (including Tornado.cash withdrawals) are not supported on Binance Exchange. Accounts associated with Tornado.cash are suspended."/>
      <Notification message="After the OFAC sanctions most RPC endpoints have censored deposits, make sure your wallet is manually configured to a working endpoint. See options on Tornado RPC and how to configure MetaMask" />
      <Container size="md">
        <Group gap={0} style={{ marginTop: '20px', marginLeft: '-47px', marginRight: '-47px' }}>
          <DepositWithdraw />
          <Stats />
        </Group>
      </Container>
    </>
  )
}
