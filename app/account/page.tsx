'use client';

import { Container, Title } from '@mantine/core';
import { useState } from 'react';

import { Header } from "../../components/Header/Header";
import { Wallet } from '../../components/Wallet/Wallet';

import classes from './Account.module.css';

export default function HomePage() {
  return (
    <div className={classes.wrapper}>
      <Container className={classes.container} size="md">
        <Title style={{ fontFamily: 'PT Mono', textAlign: 'center' }}>Wallet</Title>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Wallet />
        </div>
      </Container>
      <div className={classes.push}></div>
    </div>
  )
}
