import React from 'react';
import { Row, Button } from 'antd';
import { State } from 'constant';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'store/actions';
// import testPlant from 'images/bellpeppers1_background.png';

import './style.css';

function PlantCollection(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const handleTakeOut = (id) => {
    dispatch(actions.changeStatePlant(id, State.PLANTED, state.plants));
    props.onClose();
  };

  const plants = state.plants.filter((item) => item.state === State.INSTOCK);
  if (plants.length === 0) {
    return (
      <div>
        <div className='collection align-center'>
          <strong>No plant in the stock</strong>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className='collection'>
          {plants.map((item) => {
            return (
              <Row key={item.plantId} className='bgc-w item'>
                <div className='plantAva bgc-blue'>
                  <img src={item.plant_img} className='plantImg' alt='' />
                </div>
                <div className="center-ver">
                  <strong>{item.name}</strong> <br />
                </div>
                <Button
                  type='primary'
                  className='bgc-green radius align-center'
                  onClick={() => handleTakeOut(item.plantId)}
                >
                  <strong>Plant</strong>
                </Button>
              </Row>
            );
          })}
        </div>
      </div>
    );
  }
}

export default PlantCollection;
