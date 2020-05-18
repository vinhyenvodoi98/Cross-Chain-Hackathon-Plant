import React from 'react';
import { Row, Button } from 'antd';
import { State } from 'constant';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'store/actions';

import './style.css';

function PlantCollection(props) {
  const dispatch = useDispatch();
  const purses = useSelector((state) => state.purses);

  const handleTakeOut = (id) => {
    dispatch(actions.changeStatePursesPlant(id, State.PLANTED));
    props.onClose();
  };

  const plant_inStock =
    !!purses[2] && !!purses[2].extent ? purses[2].extent.filter((item) => !item.state) : [];
  if (plant_inStock.length === 0) {
    return (
      <div>
        <div className='collection align-center'>
          <strong>No plant in the stock</strong>
        </div>
      </div>
    );
  } else {
    return (
      <div className='collection'>
        {plant_inStock.map((item) => {
          return (
            <Row key={item.plantId} className='bgc-w item'>
              <div className='plantAva bgc-blue'>
                <img src={item.plant_img} className='plantImg' alt='' />
              </div>
              <div className='center-ver'>
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
    );
  }
}

export default PlantCollection;
