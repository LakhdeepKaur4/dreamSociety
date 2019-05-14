import React, { Component } from 'react';
import { getComplaints,rejectComplaint } from '../../../actionCreators/viewComplaintsAction';
import { getServiceType, getServiceDetail,deleteSelectedService,updateServices } from '../../../actionCreators/serviceMasterAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Label, Table, Col, Row } from 'reactstrap';
import SearchFilter from '../../../components/searchFilter/searchFilter';
import UI from '../../../components/newUI/superAdminDashboard';
import Spinner from '../../../components/spinner/spinner';
import DefaultSelect from '../../../constants/defaultSelect';
import { ItemMeta } from 'semantic-ui-react';

class ViewComplaints extends Component {

    state = {
            filterName:"slotTime1",
            complaintId:'',
            slotTime1:'',
            slotTime2:'',
            slotTime3:'',
            date:'',
            flatDetailId:'',        
            isActive: false,
            ids:[], 
            menuVisible: false,
            editModal: false,
            isDisabled:true, 
            search: '',
            errors:{},
            loading:true,
            modalLoading: false,
            message:'',
            accept:''
        

    }


    componentDidMount() {
        this.refreshData();
   
    }

    onHandleChange=(event)=>{
        this.setState({message:''})
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value, errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }


    refreshData() {
        this.props.getComplaints().then(()=> this.setState({loading:false, modalLoading: false, editModal:false}));
    }   

    rejectComplaint(complaintId){
        this.setState({loading:true})
        let {isActive } =this.state;  
        this.props.rejectComplaint(complaintId,isActive)
            .then(() => this.refreshData())
            this.setState({isActive:false})
    }
    
    deleteSelected(ids){
        this.setState({loading:true,
        isDisabled:true});
        this.props.deleteSelectedService(ids)
        .then(() => this.refreshData())
        .catch(err => err.response.data.message);
    }

  
    searchFilter(search) {
        return function (x) {
            console.log(x)
            return x.complaintId.toString().includes(search.toLowerCase()) || !search;
        }
    }

    push=()=>{
        this.props.history.push('/superDashboard/ServiceMaster')
    }

    toggleEditServiceModal() {
        this.setState({
            editModal: !this.state.editModal, message:''
        });
    }

    openComplaint( slotTime1,slotTime2,slotTime3) {
        this.setState({
            slotTime1,slotTime2,slotTime3,
              editModal: !this.state.editModal
        });

    }

    updateServices() {
        const {serviceId, serviceName, service_detail, serviceDetailId } = this.state;
        let errors={};
        if(this.state.serviceName===''){
            errors.serviceName="Service Name can't be empty";
        }
        this.setState({errors});
        const isValid =Object.keys(errors).length===0;
        if(isValid &&  this.state.message === ''){

            this.props.updateServices(serviceId,serviceName, service_detail, serviceDetailId)
            .then(() => this.refreshData())
            .catch(err=>{
                this.setState({modalLoading:false,message: err.response.data.message, loading: false})
                })
                if(this.state.message === ''){
                    this.setState({editModal: true})
                }
                else {
                    this.setState({editModal: false})
                }       
            this.setState({ modalLoading: true
       })

        }         
    }

    

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    renderList = ({ complaints }) => {console.log(complaints)
        if (complaints) {
            
            return complaints.complaints.sort((item1,item2)=>{
                var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                return this.state.sortVal ? cmprVal : -cmprVal;
                }).filter(this.searchFilter(this.state.search)).map((item,index) => {
                return (
                    
                    <tr key={item.complaintId}>
                          <td><input type="checkbox" name="ids" className="SelectAll" value={item.complaintId}
                         onChange={(e) => {
                            const {complaintId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(complaintId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1);
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true});
                                }
                            }
                            else {
                                this.setState({ids: [...this.state.ids, complaintId]});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                                
                             }}/></td>
                        <td>{index+1}</td>
                        <td>{"Flat No- " + item.flat_detail_master.flatNo+" , " +  item.flat_detail_master.floor_master.floorName + " floor, " + " " + item.flat_detail_master.tower_master.towerName}</td>
                        <td>{item.description}</td> 
                        <td>{item.flat_detail_master.user_master.firstName + " " + item.flat_detail_master.user_master.lastName + " , " + item.flat_detail_master.user_master.contact}</td>                                          
                        <td>
                        <Button color="success" className="mr-2" name="accept" >Accept</Button>
                        <Button color="danger" className="mr-2" onClick={this.rejectComplaint} >Reject</Button>
                        </td>
                        <td>{item.complaint_status_master.statusType}</td>
                        <td>
                            <Button color="success" className="mr-2"  onClick={this.openComplaint.bind(this,item.slotTime1, item.slotTime2,item.slotTime3)}>Send</Button>
                        
                        </td>
                        
                    </tr>
                    

                )         
            })
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

       
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
    }
    
    render() {
        
        let tableData;
        tableData=
        <Table className="table table-bordered">
        <thead>
            <tr>
            <th style={{width:'4%'}}></th>
                <th style={{width:'4%'}}>#</th>
                <th onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:'slotTime1'}});
                        }}>Flat Details <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                <th>Description</th>
                <th>Complainee</th>
                <th style={{width:'19%'}}>Complaint Status</th>
                <th>Current Status</th>
                <th>Send Confirmation</th>
                
             
            </tr>
        </thead>

        <tbody>
            {this.renderList(this.props.viewComplaintsReducer)}    
        </tbody>
    </Table>


        let modalData =<div>
                             <FormGroup>
                                 <Row>

                                     <Col md={3}>
                             <Input type ="radio" value="slotTime1"/>
                          <Label> {this.state.slotTime1}</Label>

                          </Col>

                          <Col md={3}>
                             <Input type ="radio" value="slotTime1"/>
                             <Label> Slot2</Label>

                             </Col>
                             <Col md={1}>
                             <Input type ="radio" value="slotTime1"/>  
                             <Label> Slot3</Label>

                              </Col>

                             </Row>
                             </FormGroup>  
                             
                   
                        <FormGroup>
                            <Button color="primary" className="mr-2" onClick={this.updateServices.bind(this)}>Save </Button>
                            <Button color="danger" onClick={this.toggleEditServiceModal.bind(this)}>Cancel</Button>
                        </FormGroup>
</div>
           let deleteSelectedButton = <Button color="danger" className="mb-2"
           onClick={this.deleteSelected.bind(this, this.state.ids)} disabled={this.state.isDisabled}>Delete Selected</Button>
        return (

            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                  
                    <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                    <span aria-hidden="true">&times;</span>
                     </div>

                    <Modal isOpen={this.state.editModal} toggle={this.toggleEditServiceModal.bind(this)} >
                        <ModalHeader toggle={this.toggleEditServiceModal.bind(this)}>Edit a Service</ModalHeader>
                        <ModalBody>
                           {!this.state.modalLoading?modalData:<Spinner/>}
                        </ModalBody>
                    </Modal>
                    <div className="top-details" style={{ fontWeight: 'bold'}}><h3>View Complaints</h3>
                    {/* <Button color="primary" type="button" onClick={this.push}>Add Services</Button> */}
                    </div>
                
             
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
        viewComplaintsReducer:state.viewComplaintsReducer
        

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getComplaints,rejectComplaint}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewComplaints);      