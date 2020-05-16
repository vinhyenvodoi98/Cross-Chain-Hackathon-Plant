import React from 'react';
import shelfImg from 'images/shelf_side_rotate.png';
// import testPlant from 'images/bellpeppers1_background.png';
import testPot from 'images/pot_empty.png';
import './Middle.css';
import { State } from 'constant';
import { useSelector } from 'react-redux';
// import * as actions from 'store/actions';

function Plant(props) {
  if (props.plant.state === State.PLANTED) {
    return (
      <div className='plant'>
        <div className='stem'>
          <img src={props.plant.plant_img} alt='' className='plantImg' />
        </div>
        <div className='pot'>
          <img src={testPot} alt='' className='potImg' />
        </div>
      </div>
    );
  } else {
    return <div />;
  }
}

function Middle() {
  // const dispatch = useDispatch();
  const state = useSelector((state) => state);
  // useEffect(() => {
  //   dispatch(actions.getAllPlants());
  // }, [dispatch]);

  return (
    <div className='plant-area'>
      <div className='row' />
      <img className='shelf' src={shelfImg} alt='' />
      <div className='row'>
        {state.plants.slice(0, 4).map((item, index) => {
          return <Plant key={index} plant={item} />;
        })}
      </div>
      <img className='shelf' src={shelfImg} alt='' />
      <div className='row'>
        {state.plants.slice(4, 8).map((item, index) => {
          return <Plant key={index} plant={item} />;
        })}
      </div>
      <img className='shelf' src={shelfImg} alt='' />
      <div className='row'>
        {state.plants.slice(8, 12).map((item, index) => {
          return <Plant key={index} plant={item} />;
        })}
      </div>
      <img className='shelf' src={shelfImg} alt='' />
    </div>
  );
}

export default Middle;
