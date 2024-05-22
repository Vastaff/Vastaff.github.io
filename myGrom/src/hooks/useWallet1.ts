import { useState, useEffect } from 'react';
import { mnemonicToWalletKey } from "@ton/crypto"; 
import { WalletContractV4, Address } from "@ton/ton"; // Импортируйте необходимые типы 
import { useTonClient } from './useTonClient'; // Замените на ваш хук 

 export function useWallet() { 
   const client = useTonClient(); 
   const [balance, setBalance] = useState<bigint | null>(null); 
   const [walletAddress, setWalletAddress] = useState<Address | null>(null); 
   const [error, setError] = useState<string | null>(null); 

   const mnemonic = "grunt donate away stomach knee present like strong occur foster glove fall balcony nasty possible orchard charge purse system sleep draft arctic stem loyal"; // your 24 secret words (replace ... with the rest of the words)
    // ... (логика безопасного получения мнемонической фразы) 

   useEffect(() => { 
     const initializeWallet = async () => { 
       try { 
         if (!client || !mnemonic) return; 

         const key = await mnemonicToWalletKey(mnemonic.split(" ")); 
         const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 }); 
         const openedWallet = await client.open(wallet); 

         setWalletAddress(openedWallet.address); 

         const walletBalance = await client.getBalance(openedWallet.address); 
         setBalance(walletBalance); 
       } catch (err) { 
         setError((err as Error).message); 
       } 
     }; 

     initializeWallet(); 
   }, [client, mnemonic]); // Добавьте mnemonic в зависимости 

   return { balance, address: walletAddress?.toString(), error }; 
 } 
 