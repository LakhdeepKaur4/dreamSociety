import React, { Component } from 'react';
import { getComplaints,rejectComplaint,acceptComplaint,sendConfirmations,complaintCompleted} from '../../../actionCreators/viewComplaintsAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Label, Table, Col, Row } from 'reactstrap';
import SearchFilter from '../../../components/searchFilter/searchFilter';
import UI from '../../../components/newUI/superAdminDashboard';
import Spinner from '../../../components/spinner/spinner';
import DefaultSelect from '../../../constants/defaultSelect';
import { ItemMeta } from 'semantic-ui-react';

class ViewComplaints extends Component {
constructor(){
    super()
   this.state = {
            filterName:"slotTime1",
            complaintId:'',
            slots:[],
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
            accept:'',
            updatedSlots:''
        

    }
}

    componentDidMount() {
        this.refreshData();
   
    }

    onHandleChange=(event)=>{
                
        this.setState({updatedSlots:event.target.value})
        if (!!this.state.errors[event.target.updatedSlots]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.updatedSlots];
            this.setState({ updatedSlots:event.target.value.trim(''), errors });
        }
        else {
            this.setState({ errors:event.target.value.trim('') });
        }
    }


    refreshData() {
        this.props.getComplaints().then(()=> this.setState({loading:false, modalLoading: false, editModal:false}));
    }   

    rejectComplaint=(complaintId)=>{
        this.setState({loading:true})
        let {isActive } =this.state;  
        this.props.rejectComplaint(complaintId,isActive)
            .then(() => this.refreshData())
            this.setState({isActive:false})
    }

    acceptComplaint=(complaintId)=>{
        this.setState({loading:true})
        let {isActive } =this.state;  
        this.props.acceptComplaint(complaintId,isActive)
            .then(() => this.refreshData())
            this.setState({isActive:false})
    }

  
    searchFilter(search) {
        return function (x) {

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

    openComplaint(complaintId,slots) {
        this.setState({
            complaintId,slots,
              editModal: !this.state.editModal
        },function(){
           
        });

    }

    complaintCompleted(complaintId){console.log(complaintId)
        this.setState({loading:true})
        let {isActive } =this.state;  
        this.props.complaintCompleted(complaintId,isActive)
            .then(() => this.refreshData())
            this.setState({isActive:false})
    }


    sendConfirmation=()=> {
        const {complaintId,updatedSlots}= this.state;
            let errors = {};
            if(this.state.updatedSlots===''){
                errors.updatedSlots="Slot can't be empty"
            }


            this.setState({ errors });
            const isValid =Object.keys(errors).length===0;
            if(isValid ){
                this.props.sendConfirmations(complaintId,updatedSlots)
                .then(() => this.refreshData())
                this.setState({
                    modalLoading:true
                })
            }
                
            // .catch(err=>{
            //     this.setState({modalLoading:false,message: err.response.data.message, loading: false})
            //     })
            //     if(this.state.message === ''){
            //         this.setState({editModal: true})
            //     }
            //     else {
            //         this.setState({editModal: false})
            //     }       
    //         this.setState({ modalLoading: true
    //    })
       
    }

    

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    renderList = ({ complaints }) => {console.log(complaints);
    
        if (complaints) {
            
            return complaints.complaints.sort((item1,item2)=>{
                var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                return this.state.sortVal ? cmprVal : -cmprVal;
                }).filter(this.searchFilter(this.state.search)).map((item,index) => {
                return (
                    
                    <tr key={item.complaintId}>
                        
                        <td>{index+1}</td>
                        <td>{"Flat No- " + item.flat_detail_master.flatNo+" , " +  item.flat_detail_master.floor_master.floorName + " floor, " + " " + item.flat_detail_master.tower_master.towerName}</td>
                        <td>{item.description}</td> 
                        <td>{item.flat_detail_master.user_master.firstName + " " + item.flat_detail_master.user_master.lastName + " , " + item.flat_detail_master.user_master.contact}</td>                                          
                        <td style={{width:'27%'}}>
                      
                        <Button color="primary" className="mr-2" name="accept"  onClick={this.acceptComplaint.bind(this,item.complaintId)}  disabled={!!(item.complaint_status_master.statusType==='ACCEPTED') || !!(item.complaint_status_master.statusType==='COMPLETED')|| !!(item.complaint_status_master.statusType==='CANCELED') ||  !!(item.complaint_status_master.statusType==='IN PROGRESS')}>Accept</Button>
                        <Button color="danger" className="mr-2" onClick={this.rejectComplaint.bind(this,item.complaintId)}  disabled={!!(item.complaint_status_master.statusType==='COMPLETED' ) ||  !!(item.complaint_status_master.statusType==='CANCELED')}>Reject</Button>
                        <Button color="success" className="mr-2" onClick={this.complaintCompleted.bind(this,item.complaintId)} disabled={!!(item.complaint_status_master.statusType==='COMPLETED') ||  !!(item.complaint_status_master.statusType==='CANCELED')}>Completed</Button>
                        </td>
                        <td>{item.complaint_status_master.statusType}</td>
                        <td>
                            <Button color="success" className="mr-2"  onClick={this.openComplaint.bind(this,item.complaintId,item.slots)} disabled={!!(item.complaint_status_master.statusType==='REGISTERED' ) || !!(item.complaint_status_master.statusType==='COMPLETED') || !!(item.complaint_status_master.statusType==='IN PROGRESS') || !!(item.complaint_status_master.statusType==='CANCELED')}>Send</Button>
                        
                        
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
            
                <th style={{width:'4%'}}>#</th>
                <th onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:'slotTime1'}});
                        }}>Flat Details <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                <th>Description</th>
                <th>Complainee</th>
                <th style={{width:'19%'}}>Actions</th>
                <th style={{width:'11%'}}>Current Status</th>
                <th>Send Confirmation</th>
                
             
            </tr>
        </thead>

        <tbody>
            {this.renderList(this.props.viewComplaintsReducer)}    
        </tbody>
    </Table>


        let modalData =<div>
                              <FormGroup>
                    <Label> Slots</Label>
                    <Input type="select" name ="updatedSlots" defaultValue='no-value' onChange={this.onHandleChange}>        
                     <DefaultSelect/>
                                 {this.state.slots?this.state.slots.map((item )=> {
                                     return(
                                    <option key={item} value={item}>{item}</option>
                                     )
                                 }):[]}                     
                   
                      
                    </Input>
                    <span className="error">{this.state.errors.updatedSlots}</span>
              
                </FormGroup>
                             
                   
                        <FormGroup>
                            <Button color="primary" className="mr-2" onClick={this.sendConfirmation}>Send Confirmation </Button>
                            <Button color="danger" onClick={this.toggleEditServiceModal.bind(this)}>Cancel</Button>
                        </FormGroup>
</div>
          
        return (

            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                  
                    <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                    <span aria-hidden="true">&times;</span>
                     </div>

                    <Modal isOpen={this.state.editModal} toggle={this.toggleEditServiceModal.bind(this)} >
                        <ModalHeader toggle={this.toggleEditServiceModal.bind(this)}>Select Slot</ModalHeader>
                        <ModalBody>
                           {!this.state.modalLoading?modalData:<Spinner/>}
                        </ModalBody>
                    </Modal>
                    <div className="top-details" style={{ fontWeight: 'bold'}}><h3>View Complaints</h3>
                    </div>
                
             
                    <SearchFilter type="text" value={this.state.search}
                        onChange={this.searchOnChange} />
                 
                          
                   
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
    return bindActionCreators({ getComplaints,rejectComplaint,acceptComplaint,sendConfirmations,complaintCompleted}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewComplaints);      