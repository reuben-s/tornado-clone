'use client';

import { Group, Button, Text, Container } from '@mantine/core';
import { useState } from "react"
import classes from './Notification.module.css';

export function Notification({ message }: { message: string }) {
    // Step 1: Initialize state to keep track of visibility
    const [isVisible, setIsVisible] = useState(true);

    // Step 3: Function to handle click event on the "X" button
    const handleClose = () => {
        setIsVisible(false); // Update state to hide notification
    };

    // Step 4: Conditional rendering based on `isVisible` state
    if (!isVisible) return null;

    return (
        <Container size="md" className={classes.notificationContainer}>
            <div className={classes.eyeContainer}>
            </div>
            <Group gap={0} style={{ display: 'flex', flexWrap: 'nowrap', minWidth: '0' }}>
                <img src="/eye.svg" className={classes.eyeIcon} />
                <Text size="sm" className={classes.notificationContent}>{message}</Text>
                <Button onClick={handleClose} variant="subtle" color="dark" className={classes.closeButton}>&times;</Button>
            </Group>
        </Container>
    );
}