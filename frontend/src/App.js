import React from 'react';
import './App.css';

import { Layout } from 'antd';
import Top from './components/Top';
import Bottom from './components/Bottom';
import Middle from './components/Middle';

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Layout className='App'>
      <Header className='bgc-w h-50px'>
        <Top />
      </Header>
      <Content className='bg'>
        <Middle />
      </Content>
      <Footer className='h-50px'>
        <Bottom />
      </Footer>
    </Layout>
  );
}

export default App;
