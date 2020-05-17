import React, { useState } from 'react';
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
  const purses = useSelector((state) => state.purses);

  var plants_init = new Array(12).fill(null);
  // const [plants_init, setPlantsInit] = useState(new Array(12).fill(null));

  if (purses.length !== 0 && purses[2].extent.length !== 0) {
    // console.log('middel', purses);
    // var temp = plants_init;
    purses[2].extent.map((item) => {
      plants_init[item.plantId] = item;
      // console.log('item', item);
    });
    // setPlantsInit(temp);
  }

  return (
    <div className='plant-area'>
      <div className='row' />
      <img className='shelf' src={shelfImg} alt='' />
      {console.log('plant_init', plants_init)}
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
      )}
      <img className='shelf' src={shelfImg} alt='' />
    </div>
  );
}

export default Middle;
