import React from 'react';

import { Layout } from 'antd';
import Top from './components/Top';
import Bottom from './components/Bottom';
import Middle from './components/Middle';
import Application from 'contexts/Application';

import './App.css';

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Layout className='App bg'>
      {/* connect to wallet */}
      <Application />
      {/* UI */}
      <Header className='bgc-w h-50px p-10px r-bot-10px'>
        <Top />
      </Header>
      <Content className='opa p-10px'>
        <Middle />
      </Content>
      <Footer className='h-50px p-10px m-10px r-top-10px'>
        <Bottom />
      </Footer>
    </Layout>
  );
}

export default App;
