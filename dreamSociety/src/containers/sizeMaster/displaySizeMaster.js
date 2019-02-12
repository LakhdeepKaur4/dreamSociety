import React, { Component } from 'react';
import { displaySize,deleteSize,updateSize} from '../../actionCreators/sizeMasterAction';
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
    loading:true
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
      return getSize.filter(this.searchFilter(this.state.search)).map((item) => {
        return (
          <tr key={item.sizeId}>



            <td>{item.sizeType}</td>

            <td>
              <div className="w3-row">
              <button className="btn btn-success"  onClick={this.editSize.bind(this, item.id, item.sizeId, item.sizeType)}> Edit</button>

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

  render() {
    let tableData;
    tableData=  <Table  className ="table table-bordered" >
    <thead>
      <tr>

        <th>Size Details</th>


      </tr>
    </thead>
    <tbody>

       {this.TowerMasterDetails(this.props.SizeDetails)}

    </tbody>
  </Table>
   if(!this.props.SizeDetails.getSize){
    tableData=<div style={{textAlign:'center',fontSize:'20px'}}><Spinner>....Fetching details</Spinner></div>
  }

    return (
     

      <div>
        <UI onClick={this.logout}>

          
          <div className ="w3-container w3-margin-top">
                                        <div  className ="top-details" >
            <h3 align="center"> Size List</h3>
            <Button  className="btn btn-success" onClick ={this.addSize} > Add Size master</Button>
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


              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.updateSize.bind(this)}>Update Size Details</Button>{' '}
                <Button color="secondary" onClick={this.toggleEditSizeModal.bind(this)}>Cancel</Button>
              </ModalFooter>
            </Modal>
            <SearchFilter type="text" value={this.state.search}
              onChange={this.searchOnChange} />
         
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
  return bindActionCreators({ displaySize,deleteSize,updateSize }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplaySizeMaster)
