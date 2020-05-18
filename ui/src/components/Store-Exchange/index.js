import { Row, Col, Button } from 'antd';
import React from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'store/actions';

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
  const plants = useSelector((state) => state.plants);

  const handleBuyPlant = (item) => {
    const plants = [];
    plants.push(item);
    dispatch(actions.createOffer(plants));
    props.onClose();
  };

  return (
    <div>
      {plants.length !== 0 ? (
        <Row gutter={[20, 20]} className='overflow bgc-smoke'>
          {plants.map((item) => {
            return <Item key={item.plantId} onBuyPlant={() => handleBuyPlant(item)} item={item} />;
          })}
        </Row>
      ) : (
        <div>
          <div className='collection align-center'>
            <strong>No plant in the store</strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default Store;
