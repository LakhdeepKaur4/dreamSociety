import React, { Component } from 'react';
import { getVendorMaster,deleteVendor,updateVendor,deleteSelectedVendor} from '../../../actionCreators/vendorMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal, FormGroup, ModalBody, ModalHeader,Table, Input, Label } from 'reactstrap';
import { DocURN,PicURN } from '../../../actions/index';
import SearchFilter from '../../../components/searchFilter/searchFilter';
import UI from '../../../components/newUI/vendorDashboardInside';
import Spinner from '../../../components/spinner/spinner';
import GoogleDocsViewer from 'react-google-docs-viewer';


class DisplayVendorMaster extends Component {

    state = {
            filterName:"vendorName",
            vendorId:'',
            vendorName: '',
            contact: '',
            currentAddress: '',
            permanentAddress: '',
            documentOne: null,
            documentTwo:'',
            profilePicture: '',
            isActive: false,
            menuVisible: false,
            editVendorModal: false,
            loading:true,
            search: '',
            modal: false,
            modalIsOpen: false,
            ids:[],
            isDisabled:true,    
            errors:{},
            message:'',
            modalLoading: false,
        }

    componentDidMount() {
       this.refreshData();
    }

    onHandleChange=(e)=>{
        this.setState({message:''})
        if(!!this.state.errors[e.target.name]){
            let errors =Object.assign({},this.state.errors)
            delete  errors[e.target.name]
            this.setState({[e.target.name]:e.target.value,errors});
        }
        else{
            this.setState({[e.target.name]:e.target.value});
            }
    }

    searchFilter(search) {
        return function (x) {
            return x.vendorName.toLowerCase().includes(search.toLowerCase()) || !search;
        }
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    refreshData() {
        this.props.getVendorMaster().then(()=> this.setState({loading:false, modalLoading: false, editVendorModal:false}));
    }

    editUser(vendorId,vendorName,currentAddress,permanentAddress,contact,documentOne,documentTwo,picture){
    this.setState({
            vendorId,vendorName,currentAddress,permanentAddress,contact,documentOne,documentTwo,picture
            ,editVendorModal: !this.state.editVendorModal})
            
    }

    toggleEditVendorModal() {
        this.setState({
            editVendorModal: !this.state.editVendorModal, message:''
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

    selectImages = (event) =>{
        if(!!this.state.errors[event.target.name]){
        
            let errors =Object.assign({},this.state.errors)
            delete  errors[event.target.name]
            this.setState({[event.target.name]:event.target.files,errors});
        }
        else{
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.setState({picture:  reader.result});
          };
        
          reader.readAsDataURL(event.target.files[0]);
          this.setState({profilePicture:event.target.files[0]})
        }
    }
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

    deleteSelected(ids){
        this.setState({loading:true,
        isDisabled:true});
        this.props.deleteSelectedVendor(ids)
        .then(() => this.refreshData())
        .catch(err => err.response.data.message);
    }

    viewServices(){
        this.props.history.push('/superDashBoard/displayVendorServices')
    }

   updateVendor=()=>{
        let errors = {};
        if(this.state.vendorName===''){
            errors.vendorName="Vendor Name can't be empty"
        }
           else if(this.state.currentAddress===''){
                errors.currentAddress="Current Address can't be empty"
            }
            else if(this.state.permanentAddress===''){
                errors.permanentAddress="Permanent Address can't be empty"
            }
            else if(this.state.contact===''){
                errors.contact="Contact can't be empty"                
            }
            else if(this.state.rate1===''){
                errors.rate1="Rate can't be empty"                
            } 
        const formData=new FormData();
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0    
        if (isValid  &&  this.state.message === '') {
     
        formData.append('vendorId',this.state.vendorId)
        formData.append('vendorName',this.state.vendorName)
        formData.append('contact',this.state.contact)
        formData.append('currentAddress',this.state.currentAddress)
        formData.append('permanentAddress',this.state.permanentAddress)
        formData.append('profilePicture',this.state.profilePicture,this.state.profilePicture.name)
        formData.append('documentOne',this.state.documentOne,this.state.documentOne.name)
        formData.append('documentTwo',this.state.documentTwo,this.state.documentTwo.name)
        this.props.updateVendor( this.state.vendorId,formData).then(() => this.refreshData())
        .catch(err=>{
            this.setState({modalLoading:false,message: err.response.data.message, loading: false})
        
        }) 
        if(this.state.message === ''){
            this.setState({editVendorModal: true})
        }
        else {
            this.setState({editVendorModal: false})
        }   
        this.setState({ modalLoading: true
        })
        }
   }


    renderList = ({ vendors }) => {
 
        if (vendors) {
            return vendors.vendor.sort((item1,item2)=>{
                var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                return this.state.sortVal ? cmprVal : -cmprVal;
                }).filter(this.searchFilter(this.state.search)).map((vendors,index) => {
                
                return (

                    <tr key={vendors.vendorId}>
                        <td><input type="checkbox" name="ids" className="SelectAll" value={vendors.vendorId}
                         onChange={(e) => {
                            const {vendorId} = vendors;
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(vendorId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1);
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true});
                                }
                            }
                            else {
                                this.setState({ids: [...this.state.ids, vendorId]});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                                
                             }}/></td>
                        <td>{index+1}</td>
                        <td>{vendors.vendorName}</td>
                        <td>{vendors.currentAddress}</td>
                        <td>{vendors.permanentAddress}</td>
                        <td>{vendors.contact}</td>
                        <td><button className="btn btn-light" onClick={this.openModal.bind(this, vendors.documentOne)}>View Document</button></td>
                        <td><button className="btn btn-light" onClick={this.Modal.bind(this, vendors.documentTwo)}>View Document </button></td>
                        <td><img style={{maxWidth: "100%",height: "auto",width: "auto\9"}} src={PicURN+ vendors.picture}></img></td>
                        <td><button className="btn btn-success mr-2" onClick={this.viewServices.bind(this,vendors.vendorId)}>View Services</button></td>                   
                        <td>
                             <Button color="success" className="mr-2"onClick={this.editUser.bind(this,vendors.vendorId, vendors.vendorName,vendors.currentAddress,vendors.permanentAddress,vendors.contact,vendors.documentOne,vendors.documentTwo, PicURN+vendors.picture)}>Edit</Button> 
                
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

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
    }
    
    OnKeyPressUserhandler(event) {
        const pattern = /[a-zA-Z_ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
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
            console.log(this.state)
    }

    unSelectAll = () =>{
        
        let unSelectMultiple = document.getElementsByClassName('SelectAll');
        let allIds = [];
        for(var i = 0; i < unSelectMultiple.length; i++){
                unSelectMultiple[i].checked = false
        }
        
        this.setState({ids: [ ...allIds]});
        if(allIds.length === 0){
            this.setState({isDisabled: true});
        }
        
    }

    

    push=()=>{
        this.props.history.push('/superDashboard/vendorMaster')
    }
       
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    OnKeyPressUserhandler(event) {
        const pattern = /[a-zA-Z_ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    
    OnKeyPresshandlerPhone(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    
    onRateChange=(e)=>{
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)){
            this.setState({[e.target.name]:e.target.value});
            
        }}


    render() { 
            let tableData;
            tableData=
            <Table className="table table-bordered">
        <thead>
            <tr>
                <th  style={{width:'4%'}}></th>
                <th  style={{width:'4%'}}>#</th>
                <th  onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:"vendorName"}});
                        }}>Vendor Name  <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                <th>Current Address</th>
                <th style={{ textAlign: "center", width: "16%" }}>Permanent Address</th>
                <th>Contact</th>
                <th>Document 1</th>
                <th>Document 2</th>
                <th>Profile Picture</th>
                <th>View Services</th>
                <th>Actions</th>
              
            </tr>
         
        </thead>

        <tbody>
            {this.renderList(this.props.vendorMasterReducer)}
        </tbody>
    </Table>
          let modalData=<div>
              <FormGroup>
                        <Label> Vendor Name</Label>
                        <Input name="vendorName" value={this.state.vendorName}  onKeyPress={this.OnKeyPressUserhandler} maxLength={20} onChange={this.onHandleChange}>
                        </Input>
                        <span className="error">{this.state.errors.vendorName}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label> Current Address</Label>
                        <Input name="currentAddress" value={this.state.currentAddress} onChange={this.onHandleChange}>
                        </Input>
                        <span className="error">{this.state.errors.currentAddress}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label>Permanent Address</Label>
                        <Input name="permanentAddress" value={this.state.permanentAddress} onChange={this.onHandleChange}>
                        </Input>
                        <span className="error">{this.state.errors.permanentAddress}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label>Contact</Label>
                        <Input name="contact" value={this.state.contact} onKeyPress={this.OnKeyPresshandlerPhone}  maxLength={10} onChange={this.onHandleChange}>
                        </Input>
                        <span className="error">{this.state.errors.contact}</span>
                        <span className="error">{this.state.message}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label> Document One</Label>
                        <GoogleDocsViewer
                            width="400px"
                            height="700px"
                            fileUrl={DocURN+this.state.documentOne}/>
                    </FormGroup>
                    <FormGroup>
                            <Label>Upload Your Id</Label>
                            <Input type="file" name="documentOne"  accept='.docx ,.doc,application/pdf' onChange={this.selectImage} required/>
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
                        <img id="target" style={{width:"30%", height:"35%"}} src={this.state.picture}/>
                        <Input type="file" name="profilePicture" accept="image/*" onChange={this.selectImages} required /> 
                        
                    </FormGroup>
                  
                    <FormGroup>
                            <Button color="primary" className="mr-2" onClick={this.updateVendor}>Save </Button>
                            <Button color="danger" onClick={this.toggleEditVendorModal.bind(this)}>Cancel</Button>
                        </FormGroup>
          </div>
                
                        let deleteSelectedButton = <Button color="danger" className="mb-2"
                        onClick={this.deleteSelected.bind(this, this.state.ids)} disabled={this.state.isDisabled}>Delete Selected</Button>;
                            return(
                            <div>
                                <UI onClick={this.logout} change={this.changePassword}>

                                <div className="w3-container w3-margin-top w3-responsive">
                                <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                                    <span aria-hidden="true">&times;</span>
                            </div>
                        
                            <Modal isOpen={this.state.editVendorModal} toggle={this.toggleEditVendorModal.bind(this)}>
                                <ModalHeader toggle={this.toggleEditVendorModal.bind(this)}> Edit Vendor</ModalHeader>
                                <ModalBody>
                                {!this.state.modalLoading?modalData:<Spinner/>}
                                    </ModalBody>
                                </Modal>
                                <div className="top-details" style={{ fontWeight: 'bold'}}><h3>Vendor Details</h3>
                                <Button color="primary" type="button" onClick={this.push}>Add Vendor</Button></div>
                                <SearchFilter type="text" value={this.state.search}
                                            onChange={this.searchOnChange} />

                                        {deleteSelectedButton}
                                        <Label style={{padding:'10px'}}><b>Select All</b><input className="ml-2"
                                            id="allSelect"
                                            type="checkbox" onChange={(e) => {
                                                if(e.target.checked) {
                                                    this.selectAll();
                                                }
                                                else if(!e.target.checked){
                                                    this.unSelectAll();
                                                } 
                                            } }/>
                                        </Label>
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
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getVendorMaster,deleteVendor,updateVendor,deleteSelectedVendor}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayVendorMaster);
