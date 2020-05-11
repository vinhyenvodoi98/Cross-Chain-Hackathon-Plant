import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import oxyImg from '../../images/oxygen_bubble_big.png';
import * as actions from '../../store/actions';

import './top.css';

function Top() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.activateConnection(true));
  }, [dispatch]);

  return (
    <div className='oxy-area p-10px'>
      <div className='oxy-num'>
        {console.log(state)}
        <img src={oxyImg} className='oxy-img' alt='oxy' />
        <strong className='number'>
          {// fetch wallet data
          state.purses.length !== 0
            ? `${state.purses[0].extent} ${state.purses[0].issuerPetname}`
            : 'not connected'}
        </strong>
      </div>
    </div>
  );
}

export default Top;
