import React, { Component } from 'react';
import { displaySize,deleteSize,updateSize} from '../../actionCreators/sizeMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Table,Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';

import UI  from '../../components/newUI/superAdminDashboard';
import SearchFilter from '../../components/searchFilter/searchFilter';
import {Link} from 'react-router-dom';

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
 
    this.props.updateSize(sizeId,sizeType).then(()=>{this.refreshData()})

    
      this.setState({
        editSizeModal: false, editSizeData: { sizeType: '' }
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
              <button className="btn btn-primary" onClick={this.editSize.bind(this, item.id, item.sizeId, item.sizeType)}> Edit</button>

              <button className="btn btn-danger" onClick={this.deleteSize.bind(this, item.sizeId)}>Delete</button>
            </td>
          </tr>
        )
      })
    }
    return <div>...loading</div>
  }


  logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user-type');
    return this.props.history.replace('/') 
}

  render() {


    return (
     

      <div>
        {/* <MenuBar onClick={() => this.setState({ menuVisible: !this.state.menuVisible })}/>
                <div style={{ margin: '48px auto' }}>
                    <SideBar onClick={() => this.setState({ menuVisible: false })}
                     visible={this.state.menuVisible}> */}
        <UI onClick={this.logout}>

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
            <Table >
              <thead>
                <tr>

                  <th>Size Details</th>


                </tr>
              </thead>
              <tbody>

                <td> {this.TowerMasterDetails(this.props.SizeDetails)}</td>

              </tbody>
            </Table>
          </div>
        </UI>
        {/* </SideBar>
 </div> */}
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
