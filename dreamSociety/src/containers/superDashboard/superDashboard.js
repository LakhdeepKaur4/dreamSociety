import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './superDashboard.css';
import Logo from '../../assets/2.jpg';
import SideBar from '../../components/superAdminDashboardUI/sideBar/sideBar';
import MenuBar from '../../components/superAdminDashboardUI/menuBar/menuBar';


export default class Dashboard extends Component {
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

  editUser() {
    this.setState({
      editUserModal: !this.state.editUserModal
    });
  }
  
  render() {
    return (<div>
      <MenuBar onClick={() => this.setState({menuVisible: !this.state.menuVisible})} />
      <div style={{ margin: '48px auto' }}>
        <SideBar onClick={() => this.setState({menuVisible: false})}
                        visible={this.state.menuVisible}
                        style={{ backgroundImage: `url(${Logo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '600px' }}>

        </SideBar>
      </div>

    </div>
    );
  }
}


