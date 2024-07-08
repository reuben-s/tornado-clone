'use client';

import { HoverCard, Text } from '@mantine/core';
import classes from './Info.module.css';

export function Info({ text }: { text: string }) {
    return (
        <HoverCard width={200} withArrow>
            <HoverCard.Target>                
                <div className={classes.info}>
                    <img className={classes.infoIcon} src="/info.svg"></img>
                </div>
            </HoverCard.Target>
            <HoverCard.Dropdown className={classes.dropdown}>
                <Text size="xs">{text}</Text>
            </HoverCard.Dropdown>
        </HoverCard>
    )
}