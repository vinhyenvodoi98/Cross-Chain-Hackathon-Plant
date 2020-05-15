import { Row, Col, Button } from 'antd';
import React from 'react';
import './style.css';
import { State } from 'constant';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'store/actions';
import testPlant from 'images/bellpeppers1_background.png';
// import oxyImg from 'images/oxygen_bubble_big.png';

function Item(props) {
  return (
    <Col className='gutter-row r-bot-10px r-top-10px' span={8}>
      {/* <div className='bg-swapItem swapItem'>
        <div className='bgc-w mg-15px r-bot-10px '>

          <div className='oxy-num unset-width flex-display p-left-5px'>
            <img src={oxyImg} className='oxy-img' alt='oxy' />
            <strong className='number'>100k</strong>
          </div>

        </div>
        <div className='divSwapImg center'>
          <img src={testPlant} className=' swapItemImg ' alt='' />
          <h2 className='priceSwapItem'> +3310 </h2>
        </div>
      </div> */}

      <div className='align-center'>
        <strong> {props.item.name} </strong>
      </div>

      <div className='bg-swapItem'>
        <img src={testPlant} className=' h-160px w-100 ' alt='' />
      </div>

      <div>
        {/* <img src={oxyImg} className='oxy-img' alt='oxy' /> */}
        <Button className='w-100 r-bot-10px' type='primary' onClick={props.onBuyPlant}>
          <strong className=''>Buy: {props.item.simoola} Simoola</strong>
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

  return (
    <Row gutter={[20, 20]} className='overflow bgc-smoke'>
      {state.plants.map((item, index) => {
        if (item.state === State.INSTORE) {
          return <Item key={index} onBuyPlant={() => handleBuyPlant(index)} item={item} />;
        } else return <div key={index} />;
      })}
    </Row>
  );
}

export default Store;
