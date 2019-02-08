import React, { Component } from 'react';
import { viewTower,updateTower,deleteTower } from '../../actionCreators/towerMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table,Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter'
import UI from '../../components/newUI/superAdminDashboard';

class DisplayTowerMaster extends Component {

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


  let {isActive} =this.state.editTowerData;
     this.props.deleteTower(towerId,isActive).then(()=>{this.refreshdata()})

        this.setState({editTowerData:{isActive:false}});


  }



  toggleEditTowerModal() {
    this.setState({
      editTowerModal: !this.state.editTowerModal
    })
  }

  updateTower() {
    let {  towerId, towerName } = this.state.editTowerData;

  
   this.props.updateTower(towerId,towerName).then(()=>{this.refreshdata()})
      this.setState({
        editTowerModal: false, editTowerData: { id: '', towerName: '' }
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
  logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user-type');
    return this.props.history.replace('/') 
}
  render() {


    return (
      <div>
        <UI onClick={this.logout}>
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
            <SearchFilter type="text" value={this.state.search} onChange={this.searchOnChange} />
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
        </UI>
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
  return bindActionCreators({ viewTower,updateTower,deleteTower}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTowerMaster)
