import React,{ useState, useEffect, useParams } from "react";
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
import { useHistory } from "react-router-dom";


function EditUser() {
    const { Header, Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;
     
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         id:this.props.match.params.id,
    //         collapse: false,
    //         name:'',
    //         email:'',
    //         password:'',
    //         confirm_password:'',
            
    //     };
    //     this.handleLogout= this.handleLogout.bind(this);
    //     this.handleChange= this.handleChange.bind(this);
    //     this.handleSubmit= this.handleSubmit.bind(this);
    // }
    const [idx,setIdx] = useState(0);
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
    
    
    useEffect(()=>{
        let AppState = JSON.parse(state);
        setIdx(AppState.user.id);
        api.get('users/'+AppState.user.id).then(res=>{
                setName(res.data.name);
                setEmail(res.data.email);   
        });

    },[])  


    // componentDidMount(){
    //     let state = localStorage["appState"];
    //     if (state) {
    //       let AppState = JSON.parse(state);
    //       if (AppState && AppState.isLoggedIn) {
    //         console.log('appstateUser',AppState)
    //        }else{
    //         this.props.history.push('/login');
    //        }
    //     }else{
    //         this.props.history.push('/login');
    //        }

    //     api.get('users/'+this.state.id).then(res=>{
    //        this.setState({
    //            name:res.data.name,
    //            email:res.data.email,
    //        })
    //     });
    // }
    
    const handleLogout = () => {
        let state = localStorage["appState"];
        if (state) {
           state = JSON.parse(state);
        }
        api.post('/logout/'+state.user.id,{token:state.user.auth_token}).then(res =>{
            if(res.data.success){
                localStorage.clear();
                alert('You are Logged out');
                setState('');
            }else{
                alert('Sorry unable to log out');
            }
        });
    }

    const handleSubmit = () => {
        api.post(
            'users/update/'+idx,
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
                    message.success('User Updated');
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
                        <Card title="Edit User" bordered={false} style={{ width: "100%" }}>
                            <Form
                            layout="vertical"
                            >
                            <Form.Item label="name" required tooltip="This is a required field">
                                <Input name="name" type="text" value={name} placeholder="Enter your name" onChange={e => setName(e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Email" required tooltip="This is a required field">
                                <Input name="email" type="email" value={email} placeholder="Enter your email" onChange={e => setEmail(e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                tooltip={{
                                title: 'This field is required',
                                }}
                            >
                            <Input type="password" name="password" placeholder="Skip if you do not wish to change your password" onChange={e => setPassword(e.target.value)}/>
                            </Form.Item>
                            <Form.Item
                                label="Confirm Password"
                                tooltip={{
                                title: 'This field is required',
                                }}
                            >
                                <Input type="password" name="password_confirm" placeholder="Skip if you do not wish to change your password" onChange={e => setConfirmPassword(e.target.value)}/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={handleSubmit}>Update User</Button>
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
    

export default EditUser;