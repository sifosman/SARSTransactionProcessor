import React from 'react';
import './App.css';
import TransactionProcessor from './components/TransactionProcessor';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header-inner">
          <img src="/sars-logos-white.png" alt="SARS logo" className="brand-logo" />
          <div className="brand-text">
            <h1>Transaction Processor</h1>
            <p>Enter comma separated numbers to sort (simple tool)</p>
          </div>
          <div className="brand-spacer" aria-hidden="true" />
        </div>
      </header>
      <main className="App-main">
        <TransactionProcessor />
      </main>
      <footer className="App-footer">
        <small>© SARS — for assessment/demo purposes</small>
      </footer>
    </div>
  );
};

export default App;