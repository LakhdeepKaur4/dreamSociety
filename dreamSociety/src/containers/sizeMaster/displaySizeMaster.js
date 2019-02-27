import React, { Component } from 'react';
import { displaySize,deleteSize,updateSize,deleteMultipleSize} from '../../actionCreators/sizeMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import { Table,Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';

import UI  from '../../components/newUI/superAdminDashboard';
import SearchFilter from '../../components/searchFilter/searchFilter';
import Spinner from '../../components/spinner/spinner';
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
    search:'',
    loading:true,
    ids: [],
    isDisabled: true,
  }

  componentDidMount() {

    this.refreshData()

  }

  refreshData() {
    this.props.displaySize().then(() =>this.setState({loading:false}));
  }

   
  searchOnChange = (e) => {
    this.setState({search:e.target.value})
}


  OnKeyPresshandle(event) {
    const pattern = /[a-zA-Z _]/;
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
 
    this.props.updateSize(sizeId,sizeType).then(()=>{this.refreshData()})

    
      this.setState({
        editSizeModal: false, loading:true,editSizeData: { sizeType: '' }
      })
  }


  editSize(id, sizeId, sizeType) {
    console.log('ghrehj');

    this.setState({
      editSizeData: { id, sizeId, sizeType }, editSizeModal: !this.state.editSizeModal
    })
    return <div> loading</div>
  }



  deleteSize(sizeId) {
             this.setState({loading:true})
        let {isActive } =this.state.editSizeData;    
       this.props.deleteSize(sizeId,isActive).then(()=>{this.refreshData()})
      this.setState({editSizeData:{isActive:false}})
  
      
  }
  
  searchFilter(search){
    return function(x){
        return x.sizeType.toLowerCase().includes(search.toLowerCase()) || !search;
    }
}

  TowerMasterDetails({ getSize }) {
    console.log("getSize ", getSize);
    if (getSize) {
      return getSize.filter(this.searchFilter(this.state.search)).map((item,index) => {
        return (
          <tr key={item.sizeId}>
               <td><input type="checkbox" name="ids" value={item.eventId} className="SelectAll"
                         onChange={(e, i) => {
                            const {sizeId} = item
                            if(!e.target.checked){
                                if(this.state.ids.length>-1){
                                    document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(sizeId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1)
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true})
                                }
                            }
                        }
                            else {
                                this.setState({ids: [...this.state.ids, sizeId]})
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                        } 
                             }}/></td>
           <td>{index+1}</td>

            <td>{item.sizeType}</td>
  
            <td>
            <div>
              <button className="btn btn-success mr-2"  onClick={this.editSize.bind(this, item.id, item.sizeId, item.sizeType)}> Edit</button>

              <button className="btn btn-danger" onClick={this.deleteSize.bind(this, item.sizeId)}>Delete</button>
              </div>
            </td>
          </tr>
        )
      })
    }
    
  }


  
  addSize =() =>{
    this.props.history.push('/superDashboard/sizemaster')

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
          this.props.deleteMultipleSize(ids)
          .then(() => {this.props.displaySize()
           .then(()=>this.setState({loading:false}))})
           .catch(err => err.response.data.message);
          }
          else{
              this.props.displaySize()
           .then(()=>this.setState({loading:false}))
          }
      }

  render() {
    let tableData;
    tableData=  <Table  className ="table table-bordered" >

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
        <th>#</th>
        <th>Size Details</th>

        <th> Actions  </th>
      </tr>
    </thead>
    <tbody>

       {this.TowerMasterDetails(this.props.SizeDetails)}

    </tbody>

  </Table>
   if(!this.props.SizeDetails.getSize){
    tableData=<div style={{textAlign:'center',fontSize:'20px'}}><Spinner>....Fetching details</Spinner></div>
  }
  let deleteSelectedButton = <Button color="danger" className="mb-2"  disabled={this.state.isDisabled} 
  onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>;
    return (
     

      <div>
        <UI onClick={this.logout}>

          
          <div className ="w3-container w3-margin-top w3-responsive">
          <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
   </div>
                                        <div  className ="top-details" >
            <h3 align="center"> Size List</h3>
            <button  className="btn btn-primary" onClick ={this.addSize} > Add Size master</button>
            </div>
            <Modal isOpen={this.state.editSizeModal} toggle={this.toggleEditSizeModal.bind(this)}>
              <ModalHeader toggle={this.toggleEditSizeModal.bind(this)}>Edit  Size Details</ModalHeader>
              <ModalBody>


                <FormGroup>
                  <Label for="lastName"> Size Type</Label>
                  <Input id="sizeType" value={this.state.editSizeData.sizeType} onChange={(e) => {
                    let { editSizeData } = this.state;

                    editSizeData.sizeType = e.target.value;

                    this.setState({ editSizeData });
                  }}
                  onKeyPress ={ this.OnKeyPresshandle}  required  maxLength={20}
                   />
                  
                </FormGroup>


             
             
                <Button color="primary"   className="mr-2" onClick={this.updateSize.bind(this)}>Save</Button>
                <Button color="danger" onClick={this.toggleEditSizeModal.bind(this)}>Cancel</Button>
                </ModalBody>
            </Modal>
            <SearchFilter type="text" value={this.state.search}
              onChange={this.searchOnChange} />
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
    SizeDetails: state.SizeDetails,


  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ displaySize,deleteSize,updateSize,deleteMultipleSize}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplaySizeMaster)
