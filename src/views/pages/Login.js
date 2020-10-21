
import React,{ Component  } from 'react';
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


class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
        collapse: false,
        email:'',
        password:''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange= this.handleChange.bind(this);
  }

  
  componentWillMount() {
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      if (AppState && AppState.isLoggedIn) {
      
        this.props.history.push('/user');
      }
    }
   

  }

  
  handleChange(e){
    const {name, value} = e.target;
    this.setState({ [name] : value});
  }

  handleSubmit(){
    var data = this.state;
    api.post(
      'login',
      {'email':data.email,'password':data.password}
      ).then(res => {
        if (res.data.error){
          alert(res.data.message);
          return false; 
        }
        processStorage(res.data.user);
        this.props.history.push('/dashboard');
      });
  
  }

  render() {
    console.log('appstate',appState())
    // const [form] = Form.useForm();
    return (
      
      <div className="login-card-border-less-wrapper">
        <Col span={12} offset={6}>
          <Card title="Login" bordered={false} style={{ width: "100%" }}>
            <Form
              layout="vertical"
            >
              <Form.Item label="Email" required tooltip="This is a required field">
                <Input name="email" type="text" placeholder="Enter your email" onChange={this.handleChange} />
              </Form.Item>
              <Form.Item
                label="Password"
                tooltip={{
                  title: '',
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input type="password" name="password" placeholder="Enter your password" onChange={this.handleChange}/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={this.handleSubmit}>Login</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </div>
     
    );
  }
}

export default Login;   