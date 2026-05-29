import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

 const handleNumber = (num) => {
    
    if (display === 'Error') {
      setDisplay(num);
      setEquation(num);
      return;
    }

    
    if (equation === display && display !== '0') {
      setDisplay(num);
      setEquation(num);
    } else {
      
      if (display === '0') {
        setDisplay(num);
      } else {
        setDisplay(display + num);
      }
      setEquation(equation + num);
    }
  };

  const handleOperator = (op) => {
    if (display === 'Error') return;

    
    if (equation === display) {
      setEquation(display + op);
      setDisplay('0');
      return;
    }
    
    // Consecutive operator bug prevention
    const lastChar = equation.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
      setEquation(equation.slice(0, -1) + op);
      return;
    }

    setEquation(equation + op);
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleCalculate = () => {
    try {
      if (!equation) return;
      
    
      if (equation === display) return;

      
      const sanitizedEquation = equation.replace(/--/g, '+');
      const result = new Function(`return ${sanitizedEquation}`)();
      
      if (result === Infinity || isNaN(result)) {
        setDisplay('Error');
        setEquation('');
      } else {
        const formattedResult = Number(result.toFixed(4)).toString();
        
        // ─── MAIN UPDATE HERE ───
      }
        setDisplay(formattedResult);  
    } catch (error) {
      setDisplay('Error');
      setEquation('');
    }
  };

  return (
    <div className="calc-wrapper">
      {/* Dynamic Animated Ambient Background Blobs */}
      <div className="bg-blob blob-purple"></div>
      <div className="bg-blob blob-cyan"></div>

      <div className={`calc-container ${isMounted ? 'slide-in' : ''}`}>
        {/* Decorative Top Header */}
        <div className="calc-header">
          <div className="status-dots">
            <span className="dot r"></span>
            <span className="dot y"></span>
            <span className="dot g"></span>
          </div>
          <span className="calc-title">created by Ahsan</span>
        </div>

        {/* Dynamic Display Screen */}
        <div className="calc-screen">
          <div className="calc-equation">{equation || '0'}</div>
          <div className="calc-current">{display}</div>
        </div>

        {/* Interactive Keypad */}
        <div className="calc-grid">
          <button onClick={handleClear} className="btn-action grid-span-2">AC</button>
          <button onClick={() => handleOperator('/')} className="btn-operator">÷</button>
          <button onClick={() => handleOperator('*')} className="btn-operator">×</button>

          <button onClick={() => handleNumber('7')}>7</button>
          <button onClick={() => handleNumber('8')}>8</button>
          <button onClick={() => handleNumber('9')}>9</button>
          <button onClick={() => handleOperator('-')} className="btn-operator">-</button>

          <button onClick={() => handleNumber('4')}>4</button>
          <button onClick={() => handleNumber('5')}>5</button>
          <button onClick={() => handleNumber('6')}>6</button>
          <button onClick={() => handleOperator('+')} className="btn-operator">+</button>

          <button onClick={() => handleNumber('1')}>1</button>
          <button onClick={() => handleNumber('2')}>2</button>
          <button onClick={() => handleNumber('3')}>3</button>

          <button onClick={handleCalculate} className="btn-equals grid-row-span-2">=</button>

          <button onClick={() => handleNumber('0')} className="grid-span-2">0</button>
          <button onClick={() => handleNumber('.')}>.</button>
        </div>
      </div>
    </div>
  );
}

export default App;