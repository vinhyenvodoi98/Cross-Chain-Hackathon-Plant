import React from 'react';
import { Row, Button } from 'antd';
import { State } from 'constant';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'store/actions';
import testPlant from 'images/bellpeppers1_background.png';

import './style.css';

function PlantCollection(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const handleTakeOut = (id) => {
    dispatch(actions.changeStatePlant(id, State.PLANTED, state.plants));
    props.onClose();
  };

  return (
    <div>
      <div className='collection'>
        {state.plants.map((item, index) => {
          if (item.state === State.INSTOCK) {
            return (
              <Row key={index} className='bgc-w item'>
                <div className='plantAva bgc-blue'>
                  <img src={testPlant} className='plantImg' alt='' />
                </div>
                <div>
                  <strong>{item.name}</strong> <br />
                  <span>Level {item.level}</span> <br />
                  <span className='green'>{item.oxy} oxygen/s</span>
                </div>
                <Button
                  type='primary'
                  className='bgc-green radius '
                  onClick={() => handleTakeOut(index)}
                >
                  <strong>Plant</strong>
                </Button>
              </Row>
            );
          } else {
            return <div key={index} />;
          }
        })}
      </div>
    </div>
  );
}

export default PlantCollection;
