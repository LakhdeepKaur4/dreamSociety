import React, { Component } from 'react';
import { viewTower,updateTower,deleteTower } from '../../actionCreators/towerMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table,Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter'
import UI from '../../components/newUI/superAdminDashboard';

import Spinner from '../../components/spinner/spinner';
class DisplayTowerMaster extends Component {

  state = {
    editTowerData: {

      towerId: [],
      towerName: [],
      isActive:false
    },
    editTowerModal: false,
    menuVisible: false,
    search:'',
    loading:true
  }

  componentDidMount() {

    this.refreshData();

  }

  refreshData=()=>{
    this.props.viewTower().then(() =>this.setState({loading:false}));
  }

  OnKeyPresshandler(event) {
    const pattern=/[a-zA-Z _]/
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
      
    }
  }
  deleteTower(towerId) {
this.setState({loading:true});

  let {isActive} =this.state.editTowerData;
     this.props.deleteTower(towerId,isActive).then(()=>{this.refreshData()})

        this.setState({editTowerData:{isActive:false}});


  }



  toggleEditTowerModal() {
    this.setState({
      editTowerModal: !this.state.editTowerModal
    })
  }

  updateTower() {
    let {  towerId, towerName } = this.state.editTowerData;

  
   this.props.updateTower(towerId,towerName).then(()=>{this.refreshData()})
      this.setState({
        editTowerModal: false,loading:true, editTowerData: { id: '', towerName: '' }
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
              <button className="btn btn-success mr-2" onClick={this.editTower.bind(this, item.id, item.towerId, item.towerName)}>edit </button>
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

 addTower =() =>{
   this.props.history.push('/superDashboard/towermaster')
 }

  logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user-type');
    return this.props.history.replace('/') 
}
  render() {
     let tableData;
     tableData=<Table    className="table table-bordered">
   
              <thead>
                <tr>

                  <th>Tower Name</th>

                  <th> Actions  </th>
                </tr>
              </thead>

              

              <tbody>

                 {this.TowerMasterDetails(this.props.TowerDetails)}

              </tbody>
              
            </Table>
            if(!this.props.TowerDetails.tower){
              tableData=<div style={{textAlign:'center',fontSize:'20px'}}><Spinner>....Fetching Towers</Spinner></div>
            }

    return (
      <div>
        <UI onClick={this.logout}>
        
          <div className ="w3-container w3-margin-top w3-responsive">
                                        <div  className ="top-details" >
            <h3 align="center"> Tower List</h3>
            <button  className="btn btn-primary" onClick ={this.addTower} > Add Tower</button>
            </div>
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
                     maxLength={20}
                    required />
                </FormGroup>


              
              
                <Button color="primary"  className="mr-2" onClick={this.updateTower.bind(this)}>Save</Button>
                <Button color="danger" onClick={this.toggleEditTowerModal.bind(this)}>Cancel</Button>
                </ModalBody>
            </Modal>
            <SearchFilter type="text" value={this.state.search} onChange={this.searchOnChange} />
            {!this.state.loading?tableData:<Spinner/>}
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
