import React, { useState, useEffect } from "react";
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
  import { useHistory } from 'react-router-dom';
  import { api } from '../../components/Api';
  import '../../assets/css/style.css';
  import 'antd/dist/antd.css';

function UserList(){   
   
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  const [collapsed,setCollapse] =useState(false)
  const [users,setUsers] = useState([]);
  const history = useHistory();
  let [state,setState] = useState(localStorage["appState"]);
  useEffect(() => {
   
      if (state) {
        let AppState = JSON.parse(state);
      
        if (AppState && AppState.isLoggedIn) {  

        }else{
          console.log('userList',AppState);
          history.push('/login');
        }
      }else{
        history.push('/login');
      }
  }, [state])


  useEffect(() => {
    api.get('users').then(res=>{
      console.log(res);
      setUsers(res.data.users);
    })  
  }, [])
      

  const handleDelete = (id) => {
    
    api.post('delete/'+id,{'id':id}).then(res=>{
        if(res.data.success){
            message.success('User deleted');
            setUsers(users.filter(el => el.id != id ))
        }
    });
  }

  // const handleLogout = () => {
  //   if(collapsed === true)
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
                render: (text, row) =><div> <Button href={"/#/users/"+row.id+"/edit"} type="button" >Edit</Button> <Popconfirm title="Are you sure？" okText="Yes" cancelText="No"> <Button danger onClick={e=>handleDelete(row.id)} type="button" >Delete</Button></Popconfirm> </div>,
              },
            ];
          

        return (
          <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} >
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
                  <div className=""> 
                      <Button href="#/users/add" style={{float: 'right','margin-bottom':'5px'}} type="primary">Add User</Button>       
                      <Table dataSource={users} columns={columns} />;
                  </div>
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Assessment @ 2020</Footer>
            </Layout>
          </Layout>
        );
     
    }
export default UserList;