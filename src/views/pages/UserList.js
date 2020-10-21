import React, { Component } from "react";
import EditUser from './EditUser';
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
    Popconfirm,
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
class UserList extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            collapse: false,
            users:[],
        };
        this.handleLogout= this.handleLogout.bind(this);
        this.handleDelete= this.handleDelete.bind(this);
    }

    componentDidMount() {
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

         api.get('users').then(res=>{
             console.log(res);
            this.setState({users:res.data.users});
         })  
       
    
      }
      
      handleDelete(id){
        let users = this.state.users;
        api.post('delete/'+id,{'id':id}).then(res=>{
            if(res.data.success){
                message.success('User deleted');
                this.setState({
                    users: users.filter(el => el.id != id )
                });
            }
        });
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

    

    render(){
        const { collapsed } = this.state;
        const columns = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
            },
            {
                title: 'Action',
                dataIndex: '',
                key: 'id',
                render: (text, row) =><div> <Button href={"/#/users/"+row.id+"/edit"} type="button" >Edit</Button> <Popconfirm title="Are you sure？" okText="Yes" cancelText="No"> <Button danger onClick={e=>this.handleDelete(row.id)} type="button" >Delete</Button></Popconfirm> </div>,
              },
            ];
          

        return (
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
                            
                    <Table dataSource={this.state.users} columns={columns} />;

                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Assessment @ 2020</Footer>
            </Layout>
          </Layout>
        );
     
    }
}

export default UserList;