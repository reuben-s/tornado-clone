import { WalletContext } from '../providers';
import { useContext, useEffect } from 'react';
import { Container, Stack, Text, Group, Grid, Skeleton } from '@mantine/core';
import { Info } from '../Info/Info';
import classes from './Stats.module.css';

function convertUnixTimeToNormal(unixTimestamp: number) {
    // Get the current date and time
    const now = new Date();
    const date = new Date(unixTimestamp * 1000);

    // Calculate the difference in milliseconds
    const difference = now.getTime() - date.getTime();

    // Convert the difference to a human-readable format
    const minutes = Math.floor(difference / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let formattedDate = "";

    if (days > 0) {
        formattedDate = `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        formattedDate = `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        formattedDate = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        formattedDate = "Just now";
    }

    return formattedDate;
}

export function Stats() {
    const { wallet, setWallet } = useContext(WalletContext);

    useEffect(() => {
        // Define the function to fetch data
        const fetchData = async () => {
            try {
                const response = await fetch('https://subgraphs.tornadoeth.cash/subgraphs/name/tornadocash/mainnet-tornado-subgraph', {
                    method: 'POST', // or 'GET', depending on your endpoint
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "operationName": "getStatistic",
                        "variables": {
                            "currency": "eth",
                            "first": 10,
                            "orderBy": "index",
                            "orderDirection": "desc",
                            "amount": "0.1"
                        },
                        "query": "query getStatistic($currency: String!, $amount: String!, $first: Int, $orderBy: BigInt, $orderDirection: String) {\n  deposits(\n    first: $first\n    orderBy: $orderBy\n    orderDirection: $orderDirection\n    where: {currency: $currency, amount: $amount}\n  ) {\n    index\n    timestamp\n    blockNumber\n    __typename\n  }\n}\n"
                    }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Assuming 'data' contains the stats you need
                // Update the wallet context with the new stats
                setWallet({ wallet: { selectedWallet: wallet.wallet.selectedWallet, userAccount: wallet.wallet.userAccount }, stats: data });
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        // Call the fetch function
        fetchData();
    }, [setWallet, wallet.wallet.selectedWallet, wallet.wallet.userAccount]); // Dependency array, ensures useEffect runs only once after the component mounts

    // Inside your Stats component
    return (
        <Container className={classes.container}>
            <Text fw={'bold'} size="lg" className={classes.statsText}>Statistics</Text>
            <Stack className={classes.stack}>
                <Group gap={6}>
                    <Text size='sm'>Anonymity set</Text>
                    <Info text="Number of deposits from which your withdrawal will potentially originate" />
                </Group>
                <Text size='sm' style={{ marginTop: '-10px' }}><span style={{ fontWeight: 'bold' }}>31594 </span> equal user deposits</Text>

                <Text size='sm'>Latest deposits</Text>
                {
                    wallet.stats ?
                        <Container style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding:'0px' }}>
                            <div style={{ width: '47%' }}>
                                {
                                    wallet.stats.data.deposits.slice(0, 5).map((deposit: any, index: number) => {
                                        const backgroundColor = index % 2 === 0 ? "#171717" : "#000000"; // Alternate background color
                                        return (
                                            <Text key={index} style={{ backgroundColor, padding: "5px" }} size={"xs"}>
                                                {deposit.index}. <span style={{ color: "#94febf" }}>{convertUnixTimeToNormal(deposit.timestamp)}</span>
                                            </Text>
                                        )
                                    })
                                }
                            </div>
                            <div style={{ width: '47%' }}>
                                {
                                    wallet.stats.data.deposits.slice(-5).map((deposit: any, index: number) => {
                                        const backgroundColor = index % 2 === 0 ? "#171717" : "#000000"; // Alternate background color
                                        return (
                                            <Text key={index} style={{ backgroundColor, padding: "5px" }} size={"xs"}>
                                                {deposit.index}. <span style={{ color: "#94febf" }}>{convertUnixTimeToNormal(deposit.timestamp)}</span>
                                            </Text>
                                        )
                                    })
                                }
                            </div>
                        </Container>
                        : <Text size='sm'>Loading...</Text>
                }

                { /* wallet.stats ? <Text>{JSON.stringify(wallet.stats)}</Text> : <Text size='sm'>Loading...</Text> */}
            </Stack>
        </Container>
    );
}