
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { api, appState, processStorage } from '../../components/Api';
import { 
  Layout,
  Menu, 
  Row,
  Col, 
  Card,
  Input,
  Button,
  Form,
} from 'antd';
import {
  InfoCircleOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../assets/css/login.css';



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    let state = localStorage["appState"];
      if (state) {
        let AppState = JSON.parse(state);
        if (AppState && AppState.isLoggedIn) {
        
          history.push('/user');
        }
      }
  }, [])


  const submitValue = () => {
    api.post(
      'login',
      {'email':email,'password':password}
      ).then(res => {
        if (res.data.error){
          alert(res.data.message);
          return false; 
        }
        processStorage(res.data.user);
        history.push('/dashboard');
      });
  
  }

    return (
      
      <div className="login-card-border-less-wrapper">
        <Col span={12} offset={6}>
          <Card title="Login" bordered={false} style={{ width: "100%" }}>
            <Form
              layout="vertical"
            >
              <Form.Item label="Email" required tooltip="This is a required field">
                <Input name="email" type="text" placeholder="Enter your email" onChange={e => setEmail(e.target.value)} />
              </Form.Item>
              <Form.Item
                label="Password"
                tooltip={{
                  title: '',
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input type="password" name="password" placeholder="Enter your password" onChange={e => setPassword(e.target.value)}/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={submitValue}>Login</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </div>
     
    );
}

export default Login;   