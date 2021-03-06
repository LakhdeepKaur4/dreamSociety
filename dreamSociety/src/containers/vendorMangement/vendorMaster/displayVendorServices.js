import React, { Component } from 'react';
import { getVendorMaster,getRateType,deleteVendor,updateVendor,deleteSelectedVendor,updateVendorServices,deleteVendorServices} from '../../../actionCreators/vendorMasterAction';
import { getServiceType } from '../../../actionCreators/serviceMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal, FormGroup, ModalBody, ModalHeader,Table, Input, Label } from 'reactstrap';

import DefaultSelect from '../../../constants/defaultSelect';
import SearchFilter from '../../../components/searchFilter/searchFilter';
import UI from '../../../components/newUI/vendorDashboardInside';
import Spinner from '../../../components/spinner/spinner';



class DisplayVendorServices extends Component {



    state = {
      
            vendorServiceId:'',         
            serviceId: '',
            serviceName: '',
            rateId: '',
            rateType:'',
            rate:'',          
            isActive: false,
            menuVisible: false,
            editVendorModal: false,
            loading:true,
            search: '',
            modalIsOpen: false,
            search: '', 
            ids:[],
            isDisabled:true,    
            errors:{}
        }

    componentDidMount() {
       this.refreshData();
    }

    onHandleChange=(e)=>{
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
        this.props.getVendorMaster().then(()=> this.setState({loading:false}));
        this.props.getServiceType().then(()=> this.setState({loading:false}));
        this.props.getRateType().then(()=> this.setState({loading:false}));
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


    delete(vendorServiceId){   console.log(vendorServiceId)    
        this.setState({loading:true})
        let{isActive}=this.state;
        this.props.deleteVendorServices(vendorServiceId,isActive)
        .then(()=>this.refreshData())
        this.setState({isActive:false})

    }

    deleteSelected(ids){
        console.log(ids)
        this.setState({loading:true,
        isDisabled:true});
        this.props.deleteSelectedVendor(ids)
        .then(() => this.refreshData())
        .catch(err => err.response.data.message);
    }

   

//    updateVendor=()=>{
//         let errors = {};
//         if(this.state.vendorName===''){
//             errors.vendorName="Vendor Name can't be empty"
//         }
//            else if(this.state.currentAddress===''){
//                 errors.currentAddress="Current Address can't be empty"
//             }
//             else if(this.state.permanentAddress===''){
//                 errors.permanentAddress="Permanent Address can't be empty"
//             }
//             else if(this.state.contact===''){
//                 errors.contact="Contact can't be empty"                
//             }
//             else if(this.state.rate1===''){
//                 errors.rate1="Rate can't be empty"                
//             } 
//         const formData=new FormData();
//         this.setState({ errors });
//         const isValid = Object.keys(errors).length === 0
//         if (isValid) {
//         this.setState({loading: true})
//         formData.append('vendorServiceId',this.state.vendorServiceId) 
//         formData.append('vendorName',this.state.vendorName)
//         formData.append('contact',this.state.contact)
//         formData.append('currentAddress',this.state.currentAddress)
//         formData.append('permanentAddress',this.state.permanentAddress)
//         formData.append('serviceId',this.state.serviceId)
//         formData.append('rateId1',this.state.rateId1)
//         formData.append('rate1',this.state.rate1)
//         formData.append('profilePicture',this.state.profilePicture,this.state.profilePicture.name)
//         formData.append('documentOne',this.state.documentOne,this.state.documentOne.name)
//         formData.append('documentTwo',this.state.documentTwo,this.state.documentTwo.name)
//         this.props.updateVendor( this.state.vendorId,formData).then(() => this.refreshData());   
//         this.setState({ editVendorModal: !this.state.editVendorModal}); 
//         }
//    }

editUser(vendorServiceId,serviceId,rateId,serviceName,rateType,rate){console.log("vendorServiceId",vendorServiceId,"serviceId",serviceId,"rateId",rateId,"serviceName",serviceName,"rateType",rateType,"rate",rate)
    this.setState({
        vendorServiceId,serviceId,rateId,serviceName,rateType,rate
            ,editVendorModal: !this.state.editServiceModal})
            
    }

toggleEditVendorModal() {
        this.setState({
            editVendorModal: !this.state.editVendorModal
        });
    }

toggle() {
        this.setState({ modal: false });
    }

updateServices = () => { 
        const {vendorServiceId,serviceId,rateId,rate} = this.state
        this.props.updateVendorServices(vendorServiceId,serviceId,rateId,rate)
            .then(() => this.refreshData())
        this.setState({loading:true,
            vendorServiceId,serviceId,rateId,rate,
            editVendorModal: !this.state.editVendorModal
        })
        console.log("vendorServiceId",vendorServiceId,"serviceId",serviceId,"rateId",rateId,"rate",rate)
    
    }   


renderList = ({ vendors }) => {console.log("priya",vendors)


if (vendors) {
    return vendors.vendor[0].vendor_services.map((item,index) => {
        return (

            <tr key={item.vendorServiceId}>
                  <td><input type="checkbox"/></td>
                  <td>{index+1}</td>
                  <td>{item.service_master.serviceName}</td>
                  <td>{item.rate_master.rateType}</td>
                  <td>{item.rate}</td> 
                  <td>
                        <Button color="success" className="mr-2" onClick={this.editUser.bind(this,item.vendorServiceId,item.service_master.serviceId,item.rate_master.rateId,item.service_master.serviceName,item.rate_master.rateType,item.rate)}>Edit</Button> 
                        <Button color="danger" onClick={this.delete.bind(this,item.vendorServiceId)}>Delete</Button>
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
    
    push=()=>{
            this.props.history.push('/superDashboard/vendorMaster')
        }
           

    render() {
     
      
            let tableData;
            tableData=
            <Table className="table table-bordered">
        <thead>
            <tr>
                <th  style={{width:'4%'}}></th>
                <th  style={{width:'4%'}}>#</th>
                {/* <th  onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:"vendorName"}});
                        }}>Vendor Name  <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th> */}
                <th>Services</th>
                <th>Rate Types </th>           
                <th>Rates</th>             
                <th>Actions</th>
              
            </tr>
         
        </thead>

        <tbody>
            {this.renderList(this.props.vendorMasterReducer)}
        </tbody>
    </Table>
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
                <ModalHeader toggle={this.toggleEditVendorModal.bind(this)}> Edit Vendor Services</ModalHeader>
                <ModalBody>                    
                    <FormGroup>
                        <Label>Service Types</Label>
                        <Input type="select" name="serviceId" value={this.state.serviceId}  onChange={this.onHandleChange}>                      
                        <option>{this.state.serviceName}</option>
                        <DefaultSelect/>
                        {this.getDropDown(this.props.displayServiceMasterReducer)}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Rate Types</Label>
                        <Input type="select" name="rateId" value={this.state.rateId}  onChange={this.onHandleChange}>
                        <option>{this.state.rateType}</option>
                        <DefaultSelect/>
                        {this.getDropDown1(this.props.vendorMasterReducer)}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label> Rates</Label>
                        <Input name="rate" value={this.state.rate} onChange={this.onRateChange}>
                        </Input>
                        {/* <div>{!this.state.rate1 ? <span className="error">{this.state.errors.rate1}</span>: null}</div> */}
                    </FormGroup>
                              
                    <FormGroup>
                            <Button color="primary" className="mr-2" onClick={this.updateServices}>Save </Button>
                            <Button color="danger" onClick={this.toggleEditVendorModal.bind(this)}>Cancel</Button>
                        </FormGroup> 
                </ModalBody>
            </Modal>
            <div className="top-details" style={{ fontWeight: 'bold'}}><h3>Vendor Services</h3>
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
    return bindActionCreators({ getVendorMaster, getServiceType,getRateType,deleteVendor,updateVendor,deleteVendorServices,deleteSelectedVendor,updateVendorServices}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayVendorServices);
    