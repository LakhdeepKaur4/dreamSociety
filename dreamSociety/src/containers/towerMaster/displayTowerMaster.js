import React, { Component } from 'react';
import { viewTower,updateTower,deleteTower,deleteMultipleTower } from '../../actionCreators/towerMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table,Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter'
import UI from '../../components/newUI/superAdminDashboard';
import './tower.css'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Spinner from '../../components/spinner/spinner';
import {fetchFloor} from '../../actionCreators/floorAction';
class DisplayTowerMaster extends Component {

  state = {
    editTowerData: {

      towerId: [],
     
      isActive:false,
      isChecked: false
    },
    filterName:"towerName",
    editTowerModal: false,
    menuVisible: false,
    search:'',
    loading:true,
    ids: [],
    isDisabled: true,
    towerName: [],
    errors:{},
    message:'',
    modalLoading:false,
    floorName:''
  }

  componentDidMount() {

    this.refreshData();
    this.props.fetchFloor();

  }

  refreshData=()=>{
    this.props.viewTower().then(() =>this.setState({loading:false, modalLoading: false,editTowerModal:false}));
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

 
  onChange=(e)=> {
   this.setState({message:''})
   console.log("e",e.target.name);
   
   console.log(!!this.state.errors[e.target.name])
    if (!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({ [e.target.name]: e.target.value, errors });
  }
  else {
      this.setState({ [e.target.name]: e.target.value });
  }
   
  } 
  

 
   
  



  toggleEditTowerModal() {
    this.setState({
      editTowerModal: !this.state.editTowerModal, message:''
    })
  }

  updateTower() {
    let errors={};
        const {  towerId, towerName,Floors } = this.state
    if(!this.state.towerName){
      errors.towerName ="tower Name cant be empty please Select"
        }
     this.setState({errors})
     const isValid = Object.keys(errors).length===0
    if(isValid  &&  this.state.message === ''){
   this.props.updateTower(towerId,towerName,Floors).then(()=>{this.refreshData()}).catch(err=>{ console.log(err.response.data.message)
    this.setState({modalLoading:false,message: err.response.data.message, loading: false})
    })
    if(this.state.message === ''){
      this.setState({editTowerModal: true})
  }
  else {
      this.setState({editTowerModal: false})
  }
      this.setState({
         modalLoading: true
      })

  }
}


  editTower( towerId, towerName,floora) {
    console.log('efews',  towerId, towerName,floora);

    this.setState({
      towerId, towerName,floora, editTowerModal: !this.state.editTowerModal
    })
  }
  searchFilter(search){
    return function(x){
        return x.towerName.toLowerCase().includes(search.toLowerCase()) || !search;
    }
}


  TowerMasterDetails({ tower }) {
console.log("tower",tower)
let floor;
    if (tower) {
      return tower.tower.sort((item1,item2)=>{
        var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
        return this.state.sortVal ? cmprVal : -cmprVal;
    }).filter(this.searchFilter(this.state.search)).map((item, index) => {
     
      
        return (

          <tr key={item.towerId}>

<td><input type="checkbox" name="ids" value={item.towerId} className="SelectAll"
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
            <td>{item.Floors.map((i)=>{ floor= i.floorName
            return floor}).join(",")}</td>
            <td>
              <button className="btn btn-success mr-2" onClick={this.editTower.bind(this, item.towerId, item.towerName,floor)}>edit </button>
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
              if(window){
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
      getFloor=({floorDetails})=>{
        console.log('getFloor',floorDetails)
        if(floorDetails){
            return floorDetails.floor.map((item)=>{
                return (
                    {...item,label:item.floorName,value:item.floorId}
                )
            })
       }
    }
    floorChangeHandler=(name,selectOption)=>{
        console.log('selectOption',selectOption)
        console.log('event')
    //    const data=selectOption.map((item)=>{return item.floorId})
    //    this.state.floors.push(data)
        this.setState({
            [name]: selectOption.map((item)=>{return item.floorId}),
            floors:selectOption.map((item)=>{return {floorId:item.floorId}})
        })
        console.log('jkldfjdsklfjdklfjdklfj',this.state)
        // const data={floorId:this.state.floorId}
        // console.log(data)
        // this.state.floors.push(data)
         
    }

  render() {
     let tableData;
 
     tableData=<table    className="table table-md table-bordered">
   
              <thead>
                <tr>
               
                <th style={{width:"4%"}}></th>
                  <th style={{width:"4%"}}> #</th>
                     
                  <th  onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:'towerName'}})
                        }}    style={{width:"40%"}}>Tower Name      <i class="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                 <th  style={{width:"20%"}}> Floors </th>
                  <th  style={{width:"20%"}}> Actions  </th>
                </tr>
              </thead>

              

              <tbody>

                 {this.TowerMasterDetails(this.props.TowerDetails)}

              </tbody>
              
            </table>
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
                  <Input  id="towerName"  name ="towerName" value={this.state.towerName} onChange={this.onChange}
                    onKeyPress={this.OnKeyPresshandler}
                     maxLength={20}
                    />
                    <span className="error">{this.state.errors.towerName} </span>
                    <span className="error">{this.state.message}</span>
                </FormGroup>
                <FormGroup>
                  <Label for="towerName">Floors</Label>
                  <ReactMultiSelectCheckboxes
                 options={this.getFloor(this.props.floor)} 
                 onChange={this.floorChangeHandler.bind(this,'floorId')}>
              
                 </ReactMultiSelectCheckboxes>
                    <span className="error">{this.state.errors.towerName} </span>
                    <span className="error">{this.state.message}</span>
                </FormGroup>


              
              
                <Button color="primary"  className="mr-2" onClick={this.updateTower.bind(this)}>Save</Button>
                <Button color="danger" onClick={this.toggleEditTowerModal.bind(this)}>Cancel</Button>
                </ModalBody>
            </Modal>
            <SearchFilter type="text" value={this.state.search} onChange={this.searchOnChange} />
         
            {deleteSelectedButton}

            <label><b> Select All</b><input
                         type="checkbox" id="allSelect" className="ml-2" onChange={(e) => {
                            if(e.target.checked) {
                                this.selectAll();
                            }
                            else if(!e.target.checked){
                                this.unSelectAll();
                            } 
                        }  
                    }/></label>
            {!this.state.modalLoading ?tableData:<Spinner/>}
          </div>
        </UI>
      </div>
      
    );
  }
}

function mapStateToProps(state) {
console.log(state.TowerDetails)
  return {
    TowerDetails: state.TowerDetails,
    floor:state.FloorReducer

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ viewTower,updateTower,deleteTower,deleteMultipleTower,fetchFloor}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTowerMaster)
