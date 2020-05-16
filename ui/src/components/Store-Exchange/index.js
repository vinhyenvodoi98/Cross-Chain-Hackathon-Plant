import { Row, Col, Button } from 'antd';
import React from 'react';
import './style.css';
import { State } from 'constant';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'store/actions';
// import testPlant from 'images/bellpeppers1_background.png';
// import oxyImg from 'images/oxygen_bubble_big.png';

function Item(props) {
  return (
    <Col className='gutter-row r-bot-10px r-top-10px' span={8}>
      <div className='align-center'>
        <strong> {props.item.name} </strong>
      </div>

      <div className='bg-swapItem'>
        <img src={props.item.plant_img} className=' h-160px w-100 ' alt='' />
      </div>

      <div>
        {/* <img src={oxyImg} className='oxy-img' alt='oxy' /> */}
        <Button className='w-100 r-bot-10px' type='primary' onClick={props.onBuyPlant}>
          <strong className=''>Buy: {props.item.price} Moola</strong>
        </Button>
      </div>
    </Col>
  );
}

function Store(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const handleBuyPlant = (id) => {
    dispatch(actions.changeStatePlant(id, State.INSTOCK, state.plants));
    props.onClose();
  };

  const plants = state.plants.filter((item) => item.state === State.INSTORE);
  if (plants.length === 0) {
    return (
      <div>
        <div className='collection align-center'>
          <strong>No plant in the store</strong>
        </div>
      </div>
    );
  } else {
    return (
      <Row gutter={[20, 20]} className='overflow bgc-smoke'>
        {plants.map((item) => {
          return (
            <Item key={item.plantId} onBuyPlant={() => handleBuyPlant(item.plantId)} item={item} />
          );
        })}
      </Row>
    );
  }
}

export default Store;
