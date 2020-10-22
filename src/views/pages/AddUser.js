import React,{  useEffect, useState } from "react";
import { 
    Layout,
    Menu, 
    Table,
    Row,
    Col, 
    Card,
    Input,
    Button,
    Form,
    message
  } from 'antd';

import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import { api } from '../../components/Api';
import '../../assets/css/style.css';
import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
function AddUser(){
     
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmpassword,setConfirmPassword]=useState('');
    const [collapsed,setCollapsed]=useState(false);
    const history = useHistory();
    let [state,setState] = useState(localStorage["appState"]);
    useEffect(()=>{
        
        if (state) {
        let AppState = JSON.parse(state);
        if (AppState && AppState.isLoggedIn) {
        }else{
            history.push('/login');
        }
        }else{
            history.push('/login');
        }

    },[state])  

    const handleLogout =() =>{
        let state = localStorage["appState"];
        if (state) {
           state = JSON.parse(state);
        }
        api.post('/logout/'+state.user.id,{token:state.user.auth_token}).then(res =>{
            if(res.data.success){
                localStorage.clear();
                setState('')
            }else{
                alert('Sorry unable to log out');
            }
        });
    }

    const handleSubmit = () =>{
        api.post(
            'register',
            {
                'name':name,
                'email':email,
                'password':password,
                'password_confirmation':confirmpassword,
            }).then(res=>{
                if(res.data.errors){
                    var err = res.data.errors;
                    err.forEach(element => {
                        message.error(element);
                    });
                }

                if(res.data.success){
                    message.success('User created');
                    history.push('/user');
                }
            console.log(res);
        });
    }

      
        return(
            <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={collapsed}>
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<DesktopOutlined />}>
                  User List
                </Menu.Item>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Settings">
                  <Menu.Item onClick={handleLogout} key="6">Logout</Menu.Item>
                </SubMenu>
               </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }} />
              <Content style={{ margin: '0 16px' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <div className="login-card-border-less-wrapper">
                        <Col span={12} offset={6}>
                        <Card title="Add User" bordered={false} style={{ width: "100%" }}>
                            <Form
                            layout="vertical"
                            >
                            <Form.Item label="name" required tooltip="This is a required field">
                                <Input name="name" type="text" placeholder="Enter your name" onChange={e=>setName(e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Email" required tooltip="This is a required field">
                                <Input name="email" type="email" placeholder="Enter your email" onChange={e=>setEmail(e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                tooltip={{
                                title: 'This field is required',
                                }}
                            >
                                <Input type="password" name="password" placeholder="Enter your password" onChange={e=>setPassword(e.target.value)}/>
                            </Form.Item>
                            <Form.Item
                                label="Confirm Password"
                                tooltip={{
                                title: 'This field is required',
                                }}
                            >
                                <Input type="password" name="password_confirm" placeholder="Confirm your password" onChange={e=>setConfirmPassword(e.target.value)}/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={handleSubmit}>Create</Button>
                            </Form.Item>
                            </Form>
                        </Card>
                        </Col>
                    </div>    
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Assessment @ 2020</Footer>
            </Layout>
          </Layout>
        );
    }
        


export default AddUser;