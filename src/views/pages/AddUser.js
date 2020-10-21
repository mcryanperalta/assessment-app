import React,{ Component } from "react";
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

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class AddUser extends Component{

     
    constructor(props) {
        super(props);

        this.state = {
            collapse: false,
            name:'',
            email:'',
            password:'',
            confirm_password:'',
            
        };
        this.handleLogout= this.handleLogout.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }

    componentDidMount(){
        let state = localStorage["appState"];
        if (state) {
          let AppState = JSON.parse(state);
          if (AppState && AppState.isLoggedIn) {
            console.log('appstateUser',AppState)
           }else{
            this.props.history.push('/login');
           }
        }else{
            this.props.history.push('/login');
           }

    }
    
    handleLogout(){
        let state = localStorage["appState"];
        if (state) {
           state = JSON.parse(state);
        }
        api.post('/logout/'+state.user.id,{token:state.user.auth_token}).then(res =>{
            if(res.data.success){
                localStorage.clear();
                alert('You are Logged out');
                window.location.reload();
            }else{
                alert('Sorry unable to log out');
            }
        });
    }

    handleSubmit(){
        var data  = this.state;
        console.log(data);
        api.post(
            'register',
            {
                'name':this.state.name,
                'email':this.state.email,
                'password':this.state.password,
                'password_confirmation':this.state.password_confirm,
            }).then(res=>{
                if(res.data.errors){
                    var err = res.data.errors;
                    err.forEach(element => {
                        message.error(element);
                    });
                }

                if(res.data.success){
                    message.success('User created');
                    this.props.history.push('/user');
                }
            console.log(res);
        });
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({ [name] : value});
      }



    render(){
        const { collapsed } = this.state;

        return(
            <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<DesktopOutlined />}>
                  User List
                </Menu.Item>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Settings">
                  <Menu.Item onClick={this.handleLogout} key="6">Logout</Menu.Item>
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
                                <Input name="name" type="text" placeholder="Enter your name" onChange={this.handleChange} />
                            </Form.Item>
                            <Form.Item label="Email" required tooltip="This is a required field">
                                <Input name="email" type="email" placeholder="Enter your email" onChange={this.handleChange} />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                tooltip={{
                                title: 'This field is required',
                                }}
                            >
                                <Input type="password" name="password" placeholder="Enter your password" onChange={this.handleChange}/>
                            </Form.Item>
                            <Form.Item
                                label="Confirm Password"
                                tooltip={{
                                title: 'This field is required',
                                }}
                            >
                                <Input type="password" name="password_confirm" placeholder="Confirm your password" onChange={this.handleChange}/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={this.handleSubmit}>Login</Button>
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
        
}

export default AddUser;