import React, { Component } from 'react';
import { viewTower,updateTower,deleteTower,deleteMultipleTower } from '../../actionCreators/towerMasterAction';
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
      isActive:false,
      isChecked: false
    },
    editTowerModal: false,
    menuVisible: false,
    search:'',
    loading:true,
    ids: [],
    isDisabled: true
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

      return tower.filter(this.searchFilter(this.state.search)).map((item,index) => {
      
        return (

          <tr key={item.towerId}>

<td><input type="checkbox" name="ids" value={item.eventId} className="SelectAll"
                         onChange={(e, i) => {
                            const {towerId} = item
                            if(!e.target.checked){
                                if(this.state.ids.length>-1){
                                    document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(towerId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1)
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true})
                                }
                            }
                        }
                            else {
                                this.setState({ids: [...this.state.ids, towerId]})
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                        } 
                             }}/></td>
            <td>{index+1}</td>
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
close=()=>{
  return this.props.history.replace('/superDashBoard')
}


selectAll = () => {
  let selectMultiple = document.getElementsByClassName('SelectAll');
  let ar =[];
      for(var i = 0; i < selectMultiple.length; i++){
                  ar.push(parseInt(selectMultiple[i].value));
                  selectMultiple[i].checked = true;
          }
          this.setState({ids: ar});
          if(ar.length > 0){
              this.setState({isDisabled: false});
          }
  }
  unSelectAll = () =>{
      let allIds = []
      let unSelectMultiple = document.getElementsByClassName('SelectAll');
      for(var i = 0; i < unSelectMultiple.length; i++){
              unSelectMultiple[i].checked = false
      }

          this.setState({ids: [ ...allIds]});
          if(allIds.length === 0){
              this.setState({isDisabled: true});
          }
  }
  deleteSelected(ids){
          this.setState({loading:true,
              isDisabled:true});
              if(window.confirm('Are You Sure ?')){
          this.props.deleteMultipleTower(ids)
          .then(() => {this.props.viewTower()
           .then(()=>this.setState({loading:false}))})
           .catch(err => err.response.data.message);
          }
          else{
              this.props.viewTower()
           .then(()=>this.setState({loading:false}))
          }
      }


  render() {
     let tableData;
 
     tableData=<Table    className="table table-bordered">
   
              <thead>
                <tr>
               
                <th style={{alignContent:'baseline'}}>Select All<input
                type="checkbox" id="allSelect" className="ml-2" onChange={(e) => {
                            if(e.target.checked) {
                                this.selectAll();
                            }
                            else if(!e.target.checked){
                                this.unSelectAll();
                            } 
                        }  
                    }/></th>
                  <th> #</th>
                     
                  <th>Tower Name</th>

                  <th> Actions  </th>
                </tr>
              </thead>

              

              <tbody>

                 {this.TowerMasterDetails(this.props.TowerDetails)}

              </tbody>
              
            </Table>
             let deleteSelectedButton = <Button color="danger" className="mb-2"  disabled={this.state.isDisabled} 
             onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>;
            if(!this.props.TowerDetails.tower){
              tableData=<div style={{textAlign:'center',fontSize:'20px'}}><Spinner>....Fetching Towers</Spinner></div>
            }

    return (
      <div>
        <UI onClick={this.logout}>
        
          <div className ="w3-container w3-margin-top w3-responsive">
          <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
   </div>

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
            {deleteSelectedButton}
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
  return bindActionCreators({ viewTower,updateTower,deleteTower,deleteMultipleTower}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTowerMaster)
