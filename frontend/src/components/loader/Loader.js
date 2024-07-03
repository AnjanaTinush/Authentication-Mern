import React from 'react';
import ReactDOM from 'react-dom';
import './Loader.scss';
import lorderImg from '../../assets/loader.gif';

const Loader = () => {
  return ReactDOM.createPortal(
    <div className='wrapper'>
      <div className='loader'>
        <img src={lorderImg} alt='Loading...' />
      </div>
    </div>,
    document.getElementById('loader')
  );
};

export const Spinner = () =>{
    return (
        <div className='--center-a;ll'>
          <img src={lorderImg} alt='Loading...'/>
        </div>
    )
} 

export default Loader;
