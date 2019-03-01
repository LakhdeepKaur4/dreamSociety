import React, { Component } from 'react';
import { getVendorMaster,getRateType,deleteVendor,updateVendor } from '../../../actionCreators/vendorMasterAction';
import { getServiceType } from '../../../actionCreators/serviceMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal, FormGroup, ModalBody, ModalHeader,Table, Input, Label } from 'reactstrap';
import { DocURN,PicURN } from '../../../actions/index';
import DefaultSelect from '../../../constants/defaultSelect';
import SearchFilter from '../../../components/searchFilter/searchFilter';
import UI from '../../../components/newUI/vendorDashboardInside';
import Spinner from '../../../components/spinner/spinner';
import GoogleDocsViewer from 'react-google-docs-viewer';


class DisplayVendorMaster extends Component {



    state = {
            vendorId:'',
            vendorName: '',
            contact: '',
            currentAddress: '',
            permanentAddress: '',
            serviceId1: {
                serviceId: '',
                serviceName: ''
            },
            serviceId2: {
                serviceId: '',
                serviceName: ''
            },
            serviceId3: {
                serviceId: '',
                serviceName: ''
            },
            rateId1: {
                rateId: '',
                rateType:''
            },
            rateId2: {
                rateId: '',
                rateType:''
            },
            rateId3: {
                rateId: '',
                rateType:''
            },
            rate1: '',
            rate2: '',
            rate3: '',
            documentOne: '',
            documentTwo:'',
            profilePicture: '',
            isActive: false,
            menuVisible: false,
            editVendorModal: false,
            loading:true,
            search: '',
            modal: false,
            modalIsOpen: false,

        
 
        }
    componentDidMount() {
       this.refreshData();
    }


   

    onHandleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    refreshData() {
        this.props.getVendorMaster().then(()=> this.setState({loading:false}));
        this.props.getServiceType().then(()=> this.setState({loading:false}));
        this.props.getRateType().then(()=> this.setState({loading:false}));
    }

    editUser(vendorId,vendorName,currentAddress,permanentAddress,contact,serviceName,serviceId,rateType,rateId,rate,documentOne,documentTwo,picture){
    this.setState({
        vendorId,vendorName,currentAddress,permanentAddress,contact,serviceName,serviceId,rateType,rateId,rate,documentOne,documentTwo,picture
            ,editVendorModal: !this.state.editServiceModal})
            
    }

    toggleEditVendorModal() {
        this.setState({
            editVendorModal: !this.state.editVendorModal
        });
    }
    toggleModal() {
        this.setState({ modalIsOpen: false });
    }
    toggle() {
        this.setState({ modal: false });
    }

    toggleDocumentModal() {
        this.setState({ modalIsOpen: false });
    }

    selectImages = (e) => {
        this.setState({
            profilePicture: e.target.files[0]
        })

    }

    selectImage = (e) => {
        this.setState({
            documentOne: e.target.files[0]
        })

    }
     
    selectImage2=(e)=>{
        this.setState({
            documentTwo: e.target.files[0]
        })
    }

    
    searchFilter(search) {
        return function (x) {
            return x.vendorName.toLowerCase().includes(search.toLowerCase()) || !search;
        }
    }
  
    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    getDropDown = ({item}) => {
        if (item) {
            return item.map((item) => {
                return (
                    <option key={item.serviceId} value={item.serviceId}>
                        {item.serviceName}
                    </option>
                )
            })
        }
    }

    getDropDown1 = ({rate}) => {
        if (rate) {
            return rate.rate.map((item) => {
                return (
                    <option key={item.rateId} value={item.rateId}>
                        {item.rateType}
                    </option>
                )
            })
        }

    }

    openModal = (documentOne) => {
        this.setState({
            documentOne
        })
        this.setState( { modalIsOpen: true  });

    }
    
   

    Modal = (documentTwo) => {
        this.setState({
            documentTwo
        })
        this.setState({ modal: true });

    }


    delete(vendorId){
        
        this.setState({loading:true})
        let{isActive}=this.state;
        this.props.deleteVendor(vendorId,isActive)
        .then(()=>this.refreshData())
        this.setState({isActive:false})

    }

   updateVendor=()=>{
       
        const formData=new FormData();   
        formData.append('vendorName',this.state.vendorName)
        formData.append('contact',this.state.contact)
        formData.append('currentAddress',this.state.currentAddress)
        formData.append('permanentAddress',this.state.permanentAddress)
        formData.append('serviceId1',this.state.serviceId1.serviceId)
        formData.append('serviceId2',this.state.serviceId2.serviceId)
        formData.append('serviceId3',this.state.serviceId3.serviceId)
        formData.append('rateId1',this.state.rateId1.rateId)
        formData.append('rateId2',this.state.rateId2.rateId)
        formData.append('rateId3',this.state.rateId3.rateId)
        formData.append('rate1',this.state.rate1)
        formData.append('rate2',this.state.rate2)
        formData.append('rate3',this.state.rate3)
        formData.append('profilePicture',this.state.profilePicture,this.state.profilePicture.name)
        formData.append('documentOne',this.state.documentOne,this.state.documentOne.name)
        formData.append('documentTwo',this.state.documentTwo,this.state.documentTwo.name)
        this.props.updateVendor( this.state.vendorId,formData).then(()=>{this.refreshData})
        this.setState({loading:true, editVendorModal: !this.state.editVendorModal});

   }


    renderList = ({ vendors }) => {


        if (vendors) {
            return vendors.vendor.map((vendors) => {
                
                return (

                    <tr key={vendors.vendorServiceId}>
                        <td>{vendors.vendor_master.vendorName}</td>
                        <td>{vendors.vendor_master.currentAddress}</td>
                        <td>{vendors.vendor_master.permanentAddress}</td>
                        <td>{vendors.vendor_master.contact}</td>
                        <td>{vendors.service_master.serviceName}</td>
                        <td>{vendors.rate_master.rateType}</td>
                        <td>{vendors.rate}</td>
                        <td><button className="btn btn-light" onClick={this.openModal.bind(this, vendors.vendor_master.documentOne)}>View Document</button></td>
                        <td><button className="btn btn-light" onClick={this.Modal.bind(this, vendors.vendor_master.documentTwo)}>View Document </button></td>
                        <td><img style={{width:"100%", height:"15%"}} src={PicURN+ vendors.vendor_master.picture}></img></td>
                        
                        <td>
                             <Button color="success" className="mr-2"onClick={this.editUser.bind(this,vendors.vendorId, vendors.vendor_master.vendorName,vendors.vendor_master.currentAddress,vendors.vendor_master.permanentAddress,vendors.vendor_master.contact,vendors.service_master.serviceName,vendors.service_master.serviceId,vendors.rate_master.rateType,vendors.rate_master.rateId,vendors.rate,vendors.vendor_master.documentOne,vendors.vendor_master.documentTwo,vendors.vendor_master.picture)}>Edit</Button> 
                
                            <Button color="danger"onClick={this.delete.bind(this,vendors.vendorId)} >Delete</Button>
                        </td>
                    </tr>

                )
            })
        }
    }

    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    OnKeyPressUserhandler(event) {
        const pattern = /[a-zA-Z_ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    

    push=()=>{
        this.props.history.push('/superDashboard/vendorMaster')
    }
       
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }


    render() {
     
      
            let tableData;
            tableData=
            <Table className="table table-bordered">
        <thead>
            <tr>
                <th>Vendor Name</th>
                <th>Current Address</th>
                <th>Permanent Address</th>
                <th>Contact</th>
                <th>Serice Types</th>
                <th>Rate Types</th>
                <th>Rates</th>
                <th>Document 1</th>
                <th>Document 2</th>
                <th>Profile Picture</th>
                <th>Actions</th>
              
            </tr>
         
        </thead>

        <tbody>
            {this.renderList(this.props.vendorMasterReducer)}
        </tbody>
    </Table>
            return(
            <div>
                 <UI onClick={this.logout}>

                <div className="w3-container w3-margin-top w3-responsive">
                <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                    <span aria-hidden="true">&times;</span>
            </div>
           
            <Modal isOpen={this.state.editVendorModal} toggle={this.toggleEditVendorModal.bind(this)}>
                <ModalHeader toggle={this.toggleEditVendorModal.bind(this)}> Edit Vendor</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label> Vendor Name</Label>
                        <Input name="vendorName" value={this.state.vendorName} onChange={this.onHandleChange}>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label> Current Address</Label>
                        <Input name="currentAddress" value={this.state.currentAddress} onChange={this.onHandleChange}>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Permanent Address</Label>
                        <Input name="permanentAddress" value={this.state.permanentAddress} onChange={this.onHandleChange}>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Contact</Label>

                        <Input name="contact" value={this.state.contact} onChange={this.onHandleChange}>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Service Types</Label>
                        <Input type="select" name="serviceId1" value={this.state.serviceName}  onChange={this.onHandleChange}>                      
                        <option>{this.state.serviceName}</option>
                        <DefaultSelect/>
                        {this.getDropDown(this.props.displayServiceMasterReducer)}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Rate Types</Label>
                        <Input type="select" name="rateId1" value={this.state.rateType}  onChange={this.onHandleChange}>
                        <option>{this.state.rateType}</option>
                        <DefaultSelect/>
                        {this.getDropDown1(this.props.vendorMasterReducer)}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label> Rates</Label>
                        <Input name="rate1" value={this.state.rate} onChange={this.onHandleChange}>
                        </Input>
                    </FormGroup>
                    <FormGroup></FormGroup>
                    <FormGroup>
                        <Label> Document One</Label>
                        <GoogleDocsViewer
                            width="400px"
                            height="700px"
                            fileUrl={DocURN+this.state.documentOne}/>
                    </FormGroup>
                    <FormGroup>
                            <Label>Upload Your Id</Label>
                            <Input type="file" name="documentOne"  accept='.docx ,.doc,application/pdf' onChange={this.selectImage} required  />
                        </FormGroup>
                     
                    <FormGroup>
                    <Label> Document Two</Label>
                        <GoogleDocsViewer
                             width="400px"
                             height="700px"
                             fileUrl={DocURN+this.state.documentTwo}/>
                    </FormGroup>
                    <FormGroup>
                            <Label>Upload Another Id</Label>
                            <Input type="file" name="documentTwo"  accept='.docx ,.doc,application/pdf' onChange={this.selectImage2} required  />

                        </FormGroup>
                    <FormGroup>
                    <Label> Profile Picture</Label>
                        <img style={{width:"30%", height:"35%"}} src={PicURN+ this.state.picture}></img>
                        <Input type="file" name="profilePicture" accept="image/*" onChange={this.selectImages} required /> 
                    </FormGroup>
                    
                    <FormGroup>
                            <Button color="primary" className="mr-2" onClick={this.updateVendor}>Save </Button>
                            <Button color="danger" onClick={this.toggleEditVendorModal.bind(this)}>Cancel</Button>
                        </FormGroup>
                </ModalBody>
            </Modal>
            <div className="top-details" style={{ fontWeight: 'bold'}}><h3>Vendor Details</h3>
            <Button color="primary" type="button" onClick={this.push}>Add Vendor</Button></div>
            {!this.state.loading ? tableData : <Spinner />}

            </div>

                <Modal 
                     isOpen={this.state.modalIsOpen} >
                  <ModalHeader toggle={this.toggleModal.bind(this)}/>
                  <ModalBody style={{paddingLeft:"45px", paddingRight:"2px"}}>
                      <GoogleDocsViewer
                        width="400px"
                        height="700px"
                        fileUrl={DocURN+this.state.documentOne}/>
                  </ModalBody>
                </Modal>

                <Modal
                     isOpen={this.state.modal} >
                  <ModalHeader toggle={this.toggle.bind(this)}/>
                  <ModalBody style={{paddingLeft:"45px", paddingRight:"2px"}}>
                  
                      <GoogleDocsViewer
                        width="400px"
                        height="700px"
                        fileUrl={DocURN+this.state.documentTwo}/>

                  </ModalBody>
              </Modal>
                </UI>            
            </div>
         )
    }
}


function mapStateToProps(state) {
    return {
        vendorMasterReducer: state.vendorMasterReducer,
        displayServiceMasterReducer: state.displayServiceMasterReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getVendorMaster, getServiceType,getRateType,deleteVendor,updateVendor}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayVendorMaster);
