import React from 'react';
import './App.css';
import SlideButton from './components/SlideButton';

const App = () => {
  return (
    <div className="App">
      <SlideButton defaultMotionValue={125} />
      <SlideButton defaultMotionValue={-125} />
    </div>
  );
};

export default App;
