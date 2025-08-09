import React from 'react';
import './App.css';
import TransactionProcessor from './components/TransactionProcessor';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>SARS Transaction Processor</h1>
        <p>Enter comma-separated numerical values to process transaction data</p>
      </header>
      <main className="App-main">
        <TransactionProcessor />
      </main>
    </div>
  );
};

export default App;