import React, { Component } from 'react';
import { viewTower } from '../../actionCreators/towerMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import MenuBar   from '../../components/superAdminDashboardUI/menuBar/menuBar';
import SideBar from '../../components/superAdminDashboardUI/sideBar/sideBar';
import { authHeader } from '../../helper/authHeader';
import { Table,Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
import {URN} from  '../../actions/index'
import SearchFilter from '../../components/searchFilter/searchFilter'

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
    menuVisible: false,
    search:''
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
      `${URN}/tower/delete/` + towerId, {isActive},{ headers: authHeader() }).then((response) => {
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
  searchFilter(search){
    return function(x){
        return x.towerName.toLowerCase().includes(search.toLowerCase()) || !search;
    }
}


  TowerMasterDetails({ tower }) {

    if (tower) {
      return tower.filter(this.searchFilter(this.state.search)).map((item) => {
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


  searchOnChange =(e)=>{
  //  this.setState({})
  this.setState({search:e.target.value})
  }

  render() {


    return (
      <div>
      <MenuBar onClick={() => this.setState({ menuVisible: !this.state.menuVisible })}/>
                <div style={{ margin: '48px auto' }}>
                    <SideBar onClick={() => this.setState({ menuVisible: false })}
                     visible={this.state.menuVisible}>
<div>
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
  <SearchFilter type="text" value ={this.state.search}   onChange={this.searchOnChange}  />
                <Table >
                  <thead>
                    <tr>

                      <th>Tower Name</th>


                    </tr>
                  </thead>
                  <tbody>
                   
                      <td colSpan="2"> {this.TowerMasterDetails(this.props.TowerDetails)}</td>
                    
                  </tbody>
              </Table>
      </div>
      </SideBar>
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
