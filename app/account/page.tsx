'use client';

import { Container, Title } from '@mantine/core';
import { useState } from 'react';

import { Header } from "../../components/Header/Header";
import { Wallet } from '../../components/Wallet/Wallet';

import './account.css';

export default function HomePage() {
  return (
    <>
      <Container className='container' size="md">
        <Title style={{ fontFamily: 'PT Mono', textAlign: 'center' }}>Wallet</Title>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Wallet />
        </div>
      </Container>
    </>
  )
}
