import React, { Component } from 'react';
import { displaySize } from '../../actionCreators/sizeMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { authHeader } from '../../helper/authHeader';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Segment, Menu, Icon, Sidebar } from 'semantic-ui-react';
import {URN} from '../../actions/index'
import SearchFilter from '../../components/searchFilter/searchFilter';

class DisplaySizeMaster extends Component {
  state = {
    
    editSizeData: {

      id: "",
      sizeId: [],
      sizeType: [],
      isActive:false
    },

    editSizeModal: false,
    menuVisible: false,
    search:''
  }

  componentDidMount() {

    this.props.displaySize()

  }

  refreshData() {
    this.props.displaySize();
  }

   
  searchOnChange = (e) => {
    this.setState({search:e.target.value})
}


  OnKeyPresshandle(event) {
    const pattern = /^[0-9]$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }
  }


  toggleEditSizeModal() {
    this.setState({
      editSizeModal: !this.state.editSizeModal
    })
  }
  updateSize() {
    let { sizeId, sizeType } = this.state.editSizeData;
    console.log('dfdsfd', sizeId, sizeType);
    console.log(sizeId)

    axios.put(`${URN}/size/` + this.state.editSizeData.sizeId, {
      sizeType
    }, { headers: authHeader() }).then((response) => {

      this.refreshData();

      this.setState({
        editSizeModal: false, editSizeData: { sizeType: '' }
      })
    });
  }


  editSize(id, sizeId, sizeType) {
    console.log('ghrehj');
    this.setState({
      editSizeData: { id, sizeId, sizeType }, editSizeModal: !this.state.editSizeModal
    })
    return <div> loading</div>
  }



  deleteSize(sizeId) {
    console.log('sisxcdasd', sizeId);
        let {isActive } =this.state.editSizeData
    axios.put(`${URN}/size/` + sizeId,{isActive}, { headers: authHeader() }).then((response) => {
      console.log(response.data);
      this.refreshData()
      this.setState({editSizeData:{isActive:false}})
    })
      .catch((err) => {
        console.log(err);
      })
  }
  
  searchFilter(search){
    return function(x){
        return x.sizeType.toLowerCase().includes(search.toLowerCase()) || !search;
    }
}

  TowerMasterDetails({ getSize }) {
    console.log("getSize ", getSize);
    if (getSize) {
      return getSize.filter(this.searchFilter(this.state.search)).map((item) => {
        return (
          <tr key={item.sizeId}>



            <td>{item.sizeType}</td>

            <td>
              <button className="btn btn-primary" onClick={this.editSize.bind(this, item.id, item.sizeId, item.sizeType)}> Edit</button>

              <button className="btn btn-danger" onClick={this.deleteSize.bind(this, item.sizeId)}>Delete</button>
            </td>
          </tr>
        )
      })
    }
    return <div>...loading</div>
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
        <div style={{ margin: '48px auto' }}>
          <Sidebar.Pushable as={Segment} attached="bottom">
            <Sidebar width='thin' as={Menu} animation="uncover" visible={this.state.menuVisible} icon="labeled" vertical inverted>
              <Menu.Item><Icon name="user" /><Link to="/superDashboard/registration">Super Admin Register</Link></Menu.Item>
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
              <Segment basic style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '600px' }}>
                <div>
                  <h3 align="center"> Size List</h3>

                  <Modal isOpen={this.state.editSizeModal} toggle={this.toggleEditSizeModal.bind(this)}>
                    <ModalHeader toggle={this.toggleEditSizeModal.bind(this)}>Edit  Size Details</ModalHeader>
                    <ModalBody>


                      <FormGroup>
                        <Label for="lastName"> Size Type</Label>
                        <Input id="sizeType" value={this.state.editSizeData.sizeType} onChange={(e) => {
                          let { editSizeData } = this.state;

                          editSizeData.sizeType = e.target.value;

                          this.setState({ editSizeData });
                        }} />
                      </FormGroup>


                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.updateSize.bind(this)}>Update Size Details</Button>{' '}
                      <Button color="secondary" onClick={this.toggleEditSizeModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                  <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                  <table >
                    <thead>
                      <tr>

                        <th>Size Details</th>


                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> {this.TowerMasterDetails(this.props.SizeDetails)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>


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
    SizeDetails: state.SizeDetails,


  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ displaySize }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplaySizeMaster)
