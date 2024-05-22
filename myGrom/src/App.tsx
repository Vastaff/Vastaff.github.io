import { useState,useEffect } from 'react'
import { TonConnectButton } from '@tonconnect/ui-react';
import './App.css'
import { useWallet } from './hooks/useWallet1';
import '@twa-dev/sdk';


function App() {
  const [count, setCount] = useState(0);
  const { balance, address } =  useWallet()

  useEffect(() => { 
    document.title = `Вы кликнули ${count} раз`; 
  }, [count]); // Зависимость от count 

  return (
    <div className="App">
      <div className="Container">
         <TonConnectButton />
      </div>
      <h1>MyGrom</h1>
      <div className='Container'>
          <b>Адрес кошелька:</b>
          <div className='Hint'>{address?.slice(0, 30) + '...'}</div>
      </div>
      <div className='Container'>
          <b>Баланс в nanoTON:</b>
          <div>{balance ? balance.toString() : 'Loading...'}</div>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          кликни меня!
        </button>
        <p>
        Вы кликнули {count} раз
        </p>
      </div>
      <p className="read-the-docs">
        "Это тестовое приложение!"
      </p>
    </div>
  );
}


export default App
