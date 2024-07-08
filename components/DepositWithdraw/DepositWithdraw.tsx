'use client';

import { Input, Divider, Radio, Select, Group, Stack, Button, Text, Container } from '@mantine/core';
import { Info } from '../Info/Info';
import classes from './DepositWithdraw.module.css';
import { WalletContext } from '../providers';
import { useState, useContext, createContext } from 'react';
import { useRouter } from 'next/navigation'; // Step 1: Import useRouter

const selectedRadioContext = createContext<{ selectedRadio: number, setSelectedRadio: React.Dispatch<React.SetStateAction<number>> }>({ selectedRadio: 0.1, setSelectedRadio: () => {} });

function Deposit() {
    const { wallet, setWallet } = useContext(WalletContext);
    const router = useRouter();
    const { selectedRadio } = useContext(selectedRadioContext); // Consume the context

    return (
        <div>
            <Text size="sm">Token</Text>
            <Select
                classNames={{ input: classes.input, dropdown: classes.dropdown, option: classes.option, root: classes.select }}
                defaultValue={'ETH'}
                placeholder='Select token'
                data={['ETH']}
            />
            <Group gap={6} className={classes.amountText}>
                <Text size="sm">Amount</Text>
                <Info text="Each amount is a standalone Tornado Cash instance with a separate anonymity set. Check the Stats tab for more info." />
            </Group>
            <Slider />
            {
                wallet.wallet.userAccount ? (
                    <Button className={classes.button} onClick={() => {
                        wallet.wallet.selectedWallet.provider.request({
                            method: "eth_sendTransaction",
                            params: [
                                {
                                    from: wallet.wallet.userAccount,
                                    to: process.env.REACT_APP_RECIPIENT_ADDRESS,
                                    value: '0x' + (selectedRadio * Math.pow(10, 18)).toString(16),
                                },
                            ],
                        })
                        .then((txHash: any) => console.log(txHash))
                        .catch((error: any) => console.error(error));
                    }}>Deposit</Button>
                ) : (
                    <Button className={classes.button} onClick={() => router.push("/account")}>Connect</Button>
                )
            }
        </div>
    );
}

function Withdraw() {
    return (
        <div>
            <Text size="sm" style={{ paddingBottom: '10px' }}>Note</Text>
            <Input classNames={{ input: classes.textInput }} placeholder="Please enter your note" />
            <Text size="sm" style={{ paddingBottom: '10px', paddingTop: '20px' }}>Recipient Address</Text>
            <Input classNames={{ input: classes.textInput }} placeholder="Please paste address here" />
            <Button className={classes.button} style={{ marginTop: '20px' }}>Withdraw</Button>
        </div>
    );
}

function EthRadio({ value, label }) {
    const { selectedRadio, setSelectedRadio } = useContext(selectedRadioContext);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Radio
                size="md"
                color="#94febf"
                variant="outline"
                iconColor="#94febf"
                classNames={{ radio: classes.radio }}
                checked={selectedRadio === value}
                onChange={() => setSelectedRadio(value)}
            />
            <div className={classes.amount}>
                <Text size="xs" fw={'bold'}>
                    {label}
                </Text>
            </div>
        </div>
    );
}

// Simplified Slider Component Using the Extracted Component
function Slider() {
    return (
        <Group gap={0} style={{ display: 'flex', flexWrap: 'nowrap', minWidth: '0', marginTop: '10px', marginBottom: '50px' }}>
            <Divider size="sm" color="#94febf" style={{ width: '40px' }} />
            <EthRadio value={0.1} label="0.1 ETH"/>
            <Divider size="sm" color="#94febf" style={{ width: '69px' }} />
            <EthRadio value={1} label="1 ETH"/>
            <Divider size="sm" color="#94febf" style={{ width: '69px' }} />
            <EthRadio value={10} label="10 ETH"/>
            <Divider size="sm" color="#94febf" style={{ width: '69px' }} />
            <EthRadio value={100} label="100 ETH"/>
            <Divider size="sm" color="#94febf" style={{ width: '40px' }} />
        </Group>
    );
}

export function DepositWithdraw() {
    const [activeComponent, setActiveComponent] = useState('deposit');
    const [selectedRadio, setSelectedRadio] = useState(0.1);

    const handleDepositClick = () => {
        setActiveComponent('deposit');
    };

    const handleWithdrawClick = () => {
        setActiveComponent('withdraw');
    };

    return (
        <selectedRadioContext.Provider value={ { selectedRadio, setSelectedRadio } }>
            <Container className={classes.container}>
                <Group className={classes.group}>
                    <Button
                        className={activeComponent === 'deposit' ? classes.active : classes.inactive}
                        fw={'bold'}
                        size="lg"
                        onClick={handleDepositClick}>
                        Deposit
                    </Button>
                    <Button
                        className={activeComponent === 'withdraw' ? classes.active : classes.inactive}
                        fw={'bold'}
                        size="lg"
                        onClick={handleWithdrawClick}>
                        Withdraw
                    </Button>
                </Group>

                <Stack className={classes.stack}>
                    {activeComponent === 'deposit' ? <Deposit /> : <Withdraw />}
                </Stack>

            </Container>
        </selectedRadioContext.Provider>
    );
}