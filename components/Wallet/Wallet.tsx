'use client';

import { WalletContext } from "../providers";
import React, { useContext } from 'react';
import { useSyncProviders } from "../../hooks/useSyncProviders";

import { Stack, Text, Group, Button } from '@mantine/core';
import classes from './Wallet.module.css';

export function Wallet() {
    const { wallet, setWallet } = useContext(WalletContext);
    const providers = useSyncProviders();

    // Connect to the selected provider using eth_requestAccounts.
    const handleConnect = async () => {
        for (const provider of providers) {
            if (provider.info.name === "MetaMask") {
                try {
                    const accounts = await provider.provider.request({
                        method: "eth_requestAccounts"
                    });

                    // Update the application state with the connected wallet and user account
                    setWallet({ wallet: { selectedWallet: provider, userAccount: accounts?.[0] }, stats: wallet.stats });

                    console.log("Connected to MetaMask!");
                } catch (error) {
                    console.error(error);
                }
                return true;
            }
        }
        return false;
    };

    const handleLogout = () => {
        // Reset application state related to wallet connection
        setWallet({ wallet: { selectedWallet: null, userAccount: null }, stats: wallet.stats });
    };

    return (
        <Stack className={classes.container}>
            <div className={classes.connected}>
                <Text size="sm">Connected Web3 wallet</Text>
                <Text size="lg" color="#94febf" className={classes.address}>
                    {wallet.wallet.userAccount ? wallet.wallet.userAccount : "-"}
                </Text>
            </div>
            <Group className={classes.connect}>
                {wallet.wallet.userAccount ? (
                    // Show a logout button if a user is connected
                    <>
                        <Group gap={25}>
                            <img src="metamaskgreen.svg" alt="MetaMask"></img>
                            <Text size="sm">Disconnect from your wallet</Text>
                        </Group>
                        <Button
                            color="#242424"
                            size="sm"
                            className={classes.connectButton}
                            onClick={() => handleLogout()}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    // Show the connect button if no user is connected
                    <>
                        <Group gap={25}>
                            <img src="metamaskgreen.svg" alt="MetaMask"></img>
                            <Text size="sm">Connect your Web3 wallet</Text>
                        </Group>
                        <Button
                            color="#242424"
                            size="sm"
                            className={classes.connectButton}
                            onClick={() => handleConnect()}
                        >
                            Connect Web3
                        </Button>
                    </>
                )}
            </Group>
        </Stack>
    );
}