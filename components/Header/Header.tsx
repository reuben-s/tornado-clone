'use client';

import { WalletContext } from "../providers";
import { useState, useContext } from 'react';
import { Text, Button, Container, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import classes from './Header.module.css';

const links = [
    { link: '/about', label: 'Voting' },
    { link: '/pricing', label: 'Compliance' },
    { link: '/docs', label: 'Docs' },
];

export function Header() {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const { wallet, setWallet } = useContext(WalletContext);

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={classes.link}
            data-active={active === link.link || undefined}
            onClick={(event) => {
                event.preventDefault();
                setActive(link.link);
            }}
        >
            {link.link === '/docs' ? <img src="/docs.svg" className={classes.docsIcon} alt="Docs" /> : null}
            {link.label}
        </a>
    ));
    
    return (
        <header className={classes.header}>
            <Container size="md" className={classes.inner}>
                
                <Link href="/"><img src="/logo.png" alt="Tornado Cash" className={classes.logo} /></Link>
                <Group gap={0} visibleFrom={opened ? "": "sm"} style={{ marginRight: '100px' }}>
                    {items}
                </Group>

                <Group gap={10} visibleFrom={opened ? "": "sm"} style={{ marginRight: '-15px' }}>

                    <div className={classes.ethContainer}>
                        <img src="/eth.svg" alt="Ethereum" className={classes.ethIcon} />
                        <Button color="#242424" size="sm" className={classes.button}>Ethereum</Button>
                    </div>

                    <Button color="#242424" className={wallet.wallet.userAccount ? `${classes.metamaskButtonConnected}` : classes.metamaskButton}>
                        <img src="/metamask.svg" alt="MetaMask" className={wallet.wallet.userAccount ? `${classes.metamaskImageConnected}` : ''} />
                    </Button>
                    <Button color="#242424" disabled={true} className={classes.walletButton}><img src="/wallet.svg" alt="Wallet" className={classes.walletIcon} /></Button>

                    <Link className={classes.settingsButton} href="/account">
                        <img src="/settings.svg" alt="Ethereum" className={classes.settingsIcon} />
                        <Text fw={"bold"}>Settings</Text>
                    </Link>
                </Group>
            </Container>
            

            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="white"     style={{ zIndex: 10, position: 'absolute', right: 0, top: '40px', marginRight: "20px" }}/>
        </header>
    );
}