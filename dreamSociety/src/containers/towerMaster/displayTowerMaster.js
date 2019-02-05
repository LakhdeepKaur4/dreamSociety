import React, { Component } from 'react';
import { viewTower } from '../../actionCreators/towerMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Segment, Menu, Icon, Sidebar } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { authHeader } from '../../helper/authHeader';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
import {URN} from  '../../actions/index'

class DisplayTowerMaster extends Component {
  constructor(props) {
    super(props);
    // this.deleteTower = this.deleteTower.bind(this);
  }


  state = {
    editTowerData: {

      towerId: [],
      towerName: [],
      isActive:false
    },
    editTowerModal: false,
    menuVisible: false
  }

  componentDidMount() {

    this.props.viewTower()

  }

  OnKeyPresshandle(event) {
    const pattern=/^[0-9]$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
      
    }
  }

  
  refreshdata() {
    this.props.viewTower()

  }
  deleteTower(towerId) {
    console.log(towerId);

  let {isActive} =this.state.editTowerData;
    axios.put(
      `${URN}/tower/delete` + towerId, {isActive},{ headers: authHeader() }).then((response) => {
       this.refreshdata()

        this.setState({editTowerData:{isActive:false}});

      })
  }



  toggleEditTowerModal() {
    this.setState({
      editTowerModal: !this.state.editTowerModal
    })
  }

  updateTower() {
    let { id, towerId, towerName } = this.state.editTowerData;
    console.log('----------------', towerId, towerName);
    axios.put(`${URN}/tower/` + this.state.editTowerData.towerId, {
      towerName
    }, { headers: authHeader() }).then((response) => {
      this.refreshdata();

      this.setState({
        editTowerModal: false, editTowerData: { id: '', towerName: '' }
      })
    })
  }


  editTower(id, towerId, towerName) {
    console.log('efews', id, towerId, towerName);

    this.setState({
      editTowerData: { id, towerId, towerName }, editTowerModal: !this.state.editTowerModal
    })
  }


  TowerMasterDetails({ tower }) {

    if (tower) {
      return tower.map((item) => {
        return (

          <tr key={item.towerId}>


            <td>{item.towerName}</td>
            <td>
              <button className="btn btn-primary" onClick={this.editTower.bind(this, item.id, item.towerId, item.towerName)}>edit </button>
              <button className="btn btn-danger" onClick={this.deleteTower.bind(this, item.towerId)}>delete</button>
            </td>
          </tr>

        )
      })
    }
  }


  render() {


    return (

      <div>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark" id="headernav" >
          <Menu.Item onClick={() => this.setState({ menuVisible: !this.state.menuVisible })} >
            <Icon name="sidebar" style={{ color: 'white', cursor: 'pointer' }} />

          </Menu.Item>
          <i style={{ fontSize: '24px', color: 'skyblue', cursor: 'pointer' }} className="fa">&#xf1ad;</i> <Link className="navbar-brand" to="#">DRE@M SOCIETY</Link>
          <div className="navbar-collapse collapse" id="navbarCollapse" style={{ marginLeft: '20%' }}>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/superDashboard">Home<span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Gallery</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Contact Us</Link>
              </li>
            </ul>
            <form className="form-inline mt-2 mt-md-0">
              <button className="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#myModal" id="login" type="button"
                onClick={this.editUser}>Logout</button>
            </form>
          </div>
        </nav>
        <div style={{ marginTop: '48px' }}>
          <Sidebar.Pushable as={Segment} attached="bottom">
            <Sidebar width='thin' as={Menu} animation="uncover" visible={this.state.menuVisible} icon="labeled" vertical inverted>
              <Menu.Item><Icon name="user" /><Link to="/superDashboard/registration">Society Admin Register</Link></Menu.Item>
              <Menu.Item><Icon name="user" />Admin Register</Menu.Item>
              <Menu.Item><Icon name="user" />Society Member Owner Register</Menu.Item>
              <Menu.Item><Icon name="user" />Society Member Tenant Register</Menu.Item>
              <Menu.Item><Icon name="user" /><Link to="/vendorDashboard">Vendor</Link></Menu.Item>
              <Menu.Item><Icon name="user" /><Link to="/superDashboard/add_parking/new">Parking Master</Link></Menu.Item>
              <Menu.Item><Icon name="user" /><Link to="/superDashboard/towermaster">Tower Master</Link></Menu.Item>
              <Menu.Item><Icon name="user" /><Link to="/superDashboard/event">Event Master</Link></Menu.Item>
              <Menu.Item><Icon name="user" /><Link to="/superDashboard/flatmaster">Flat Master</Link></Menu.Item>
              <Menu.Item><Icon name="user" /><Link to="/superDashboard/sizemaster">Size Master</Link></Menu.Item>
            </Sidebar>
            <Sidebar.Pusher dimmed={this.state.menuVisible}>
              <Segment basic style={{ padding: '55px 0', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '600px' }}>
                <h3 align="center"> Tower List</h3>
                <Modal isOpen={this.state.editTowerModal} toggle={this.toggleEditTowerModal.bind(this)}>
                  <ModalHeader toggle={this.toggleEditTowerModal.bind(this)}>Edit Tower</ModalHeader>
                  <ModalBody>



                    <FormGroup>
                      <Label for="towerName">  Tower Name</Label>
                      <Input id="towerName" value={this.state.editTowerData.towerName} onChange={(e) => {
                        let { editTowerData } = this.state;

                        editTowerData.towerName = e.target.value;

                        this.setState({ editTowerData })
                        
                      }}
                      onKeyPress={this.OnKeyPresshandler}

                       required />
                    </FormGroup>


                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.updateTower.bind(this)}>Update Tower</Button>
                    <Button color="secondary" onClick={this.toggleEditTowerModal.bind(this)}>Cancel</Button>
                  </ModalFooter>
                </Modal>

                <table >
                  <thead>
                    <tr>

                      <th>Tower Name</th>


                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="2"> {this.TowerMasterDetails(this.props.TowerDetails)}</td>
                    </tr>
                  </tbody>
                </table>
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {

  return {
    TowerDetails: state.TowerDetails,


  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ viewTower }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTowerMaster)
