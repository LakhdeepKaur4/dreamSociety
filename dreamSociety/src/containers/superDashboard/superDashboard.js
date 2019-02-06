import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './superDashboard.css';
import Logo from '../../assets/2.jpg';
import SideBar from '../../components/superAdminDashboardUI/sideBar/sideBar';
import MenuBar from '../../components/superAdminDashboardUI/menuBar/menuBar';

 class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { menuVisible: false, editUserModal: false, };
    this.toggleEditUserModal = this.toggleEditUserModal.bind(this)
    this.editUser = this.editUser.bind(this);
  }
  toggleEditUserModal() {
    this.setState({
      editUserModal: !this.state.editUserModal
    });
  }

  logout=()=>{
    this.props.userLogout();   
}
  editUser() {
    this.setState({
      editUserModal: !this.state.editUserModal
    });
  }
  
  render() {
    return (<div>
      <MenuBar onClick={() => this.setState({menuVisible: !this.state.menuVisible})} />
      <div style={{ margin: '48px auto' }}>
        <Sidebar.Pushable as={Segment} attached="bottom">
          <Sidebar width='thin' as={Menu} animation="uncover" visible={this.state.menuVisible} icon="labeled" vertical inverted>
            <Menu.Item><Icon name="user" /><Link to="/superDashboard/registration">Super Admin Register</Link></Menu.Item>
            <Menu.Item><Icon name="user" />Admin Register</Menu.Item>
            <Menu.Item><Icon name="user" />Society Member Owner Register</Menu.Item>
            <Menu.Item><Icon name="user" />Society Member Tenant Register</Menu.Item>
            <Menu.Item><Icon name="user" /><Link to="/superDashboard/societyManagement">Society Management</Link></Menu.Item>
            <Menu.Item><Icon name="user" /><Link to="/vendorDashboard">Vendor</Link></Menu.Item>
            <Menu.Item><Icon name="user" /><Link to="/superDashboard/add_parking/new">Parking Master</Link></Menu.Item>
            <Menu.Item><Icon name="user" /><Link to="/superDashboard/towermaster">Tower Master</Link></Menu.Item>
            <Menu.Item><Icon name="user" /><Link to="/superDashboard/event">Event Master</Link></Menu.Item>
            <Menu.Item><Icon name="user" /><Link to="/superDashboard/flatmaster">Flat Master</Link></Menu.Item>
            <Menu.Item><Icon name="user" /><Link to="/superDashboard/sizemaster">Size Master</Link></Menu.Item>
            <Menu.Item><Icon name="user" /><Link to="/superDashboard/cityMaster">City Master</Link></Menu.Item>
            <Menu.Item><Icon name="user" /><Link to="/superDashBoard/assetsMaster">Assets Master</Link></Menu.Item>
            <Menu.Item><Icon name="user" /><Link to="/superDashBoard/assetsTypeSubMaster">Assets Type Sub Master</Link></Menu.Item>
          </Sidebar>
          <Sidebar.Pusher dimmed={this.state.menuVisible}>
            <Segment basic style={{ backgroundImage: `url(${Logo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '600px' }}>
              {/* <Header as="h3">Application Content</Header> */}
              {/* <Image src='//unsplash.it/800/480' /> */}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <SideBar onClick={() => this.setState({menuVisible: false})}
                        visible={this.state.menuVisible}
                        style={{ backgroundImage: `url(${Logo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '600px' }}>

        </SideBar>
      </div>

    </div>
    );
  }
}


function mapDispatchToProps(dispatch){
  return bindActionCreators({userLogout},dispatch);
  }

  export default (connect(null,mapDispatchToProps)(Dashboard))