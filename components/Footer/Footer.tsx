'use client'

import { Text, Container, Group, Divider } from '@mantine/core';
import classes from './Footer.module.css';

export function Footer() {
return (
    <div className={classes.footer}>
        <Container className={classes.inner}>
            <div>
                    <Text size='xs'>Donations address: <span style={{ color: '#94febf' }}>0x08ec3A4e3873505D34450b0F726136E1BF0c9DF7</span></Text>
                    <Text size='xs'>Tornado.cash version: <span style={{ color: '#94febf' }}>023c463</span></Text>
            </div>
            <Group className={classes.links}>
                    <img src='graph.png'></img>
                    <img src='medium.png' width={30}></img>
                    <img src='twitter.png'></img>
                    <img src='telegram.png'></img>
                    <img src='github.png'></img>
                    <Divider orientation='vertical' color='#6b6b6b' />
                    <img src='gb.svg' width={25}></img>
            </Group>
        </Container>
    </div>
);
}