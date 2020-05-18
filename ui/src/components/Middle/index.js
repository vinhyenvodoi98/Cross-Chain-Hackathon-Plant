import React, { useState, useEffect } from 'react';
import shelfImg from 'images/shelf_side_rotate.png';
// import testPlant from 'images/bellpeppers1_background.png';
import testPot from 'images/pot_empty.png';
import './Middle.css';
import { State } from 'constant';
import { useSelector } from 'react-redux';
// import * as actions from 'store/actions';

function Plant(props) {
  return (
    <div>
      {!!props.plant && props.plant.state === State.PLANTED ? (
        <div className='plant'>
          <div className='stem'>
            {console.error(props.plant)}
            <img src={props.plant.plant_img} alt='' className='plantImg' />
          </div>
          <div className='pot'>
            <img src={testPot} alt='' className='potImg' />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function Middle() {
  const state = useSelector((state) => state);

  const [plants_init, setPlantsInit] = useState(new Array(12).fill(null));
  useEffect(() => {
    if (state.purses.length !== 0 && state.purses[2].extent.length !== 0) {
      var plants_init = new Array(12).fill(null);
      state.purses[2].extent.map((item) => (plants_init[item.plantId] = item));
      setPlantsInit(plants_init);
    }
  }, [state]);

  return (
    <div className='plant-area'>
      <div className='row' />
      <img className='shelf' src={shelfImg} alt='' />
      <div>
        <div className='row'>
          {plants_init.slice(0, 4).map((item, index) => {
            return <Plant key={index} plant={item} />;
          })}
        </div>
        <img className='shelf' src={shelfImg} alt='' />
        <div className='row'>
          {plants_init.slice(4, 8).map((item, index) => {
            return <Plant key={index} plant={item} />;
          })}
        </div>
        <img className='shelf' src={shelfImg} alt='' />
        <div className='row'>
          {plants_init.slice(8, 12).map((item, index) => {
            return <Plant key={index} plant={item} />;
          })}
        </div>
      </div>
      <img className='shelf' src={shelfImg} alt='' />
    </div>
  );
}

export default Middle;
