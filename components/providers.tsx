"use client";

import React, { useState, createContext } from 'react';
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";

type Wallet = {
    wallet: {
        selectedWallet: any;
        userAccount: any;
    },
    stats: any,
}

type WalletContextType = {
    wallet: Wallet;
    setWallet: React.Dispatch<React.SetStateAction<Wallet>> | undefined;
};

const defaultContextValue: WalletContextType = {
    wallet: { wallet: { selectedWallet: null, userAccount: null }, stats: null },
    setWallet: undefined, // This will be overridden by the actual function when using the Provider
};

export const WalletContext = createContext(defaultContextValue);

export function WalletContextProvider({ children }: { children: React.ReactNode }) {
    // Update the state initialization to use statsData
    const [wallet, setWallet] = useState<Wallet>({ wallet: { selectedWallet: null, userAccount: null }, stats: null });

    return (
        <WalletContext.Provider value={{ wallet, setWallet }}>
            <Header />
            {children}
            <Footer />
        </WalletContext.Provider>
    );
}