import  React, {Component} from 'react';  
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Form,Table, Row, Col,Button,  Modal, FormGroup, ModalBody, ModalHeader, Label, Input} from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import {getSocietyEvents,updateSocietyEvents,deleteEvents,deleteSelectedEvent} from '../../actionCreators/societyEventBooking';
import Spinner from '../../components/spinner/spinner';
import {ViewEvent,GetEventOrganiser} from '../../actionCreators/eventMasterAction';
import DefaultSelect from '../../constants/defaultSelect';


class DisplaySocietyEventBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
           eventId:'', 
           organisedBy:'',
           startDate:'',
           endDate:'',
           startTime:'',
           endTime:'',         
           breakfast:false,
           lunch:false,
           eveningSnacks:false,
           dinner:false,
           dJ:false,
           drinks:false,
           invitationCardPicture:'',
           perPersonCharge:'',
           childAbove:'',
           charges:'',
           description:'',
           editEventModal:false,
           modalLoading:false,
           loading:true,
           isDisabled:true,
           ids:[],
           errors:{}
        }
    }

    componentDidMount(){
        this.refreshData();
    }

    refreshData() {
        this.props.getSocietyEvents().then(()=> this.setState({loading:false, modalLoading: false, editEventModal:false}));
        this.props.ViewEvent();
        this.props.GetEventOrganiser();
    }   

    editEvent(societyEventBookId,eventId,eventName,firstName,startDate,endDate,startTime,endTime,perPersonCharge,childAbove,charges,description){
       console.log(eventId,'eventId',eventName,"eventName")
        this.setState({
            societyEventBookId,eventId,eventName,firstName,startDate,endDate,startTime,endTime,perPersonCharge,childAbove,charges,description
            ,editEventModal: !this.state.editEventModal})
    }

    toggleEditEventModal() {
        this.setState({
            editEventModal: !this.state.editEventModal
        });
    }

    deleteEvents(societyEventBookId){console.log(societyEventBookId)
        this.setState({loading:true})
        let {isActive } =this.state;  
        this.props.deleteEvents(societyEventBookId,isActive)
            .then(() => this.refreshData())
            this.setState({isActive:false})
    }
    
    deleteSelected(ids){console.log(ids)
        this.setState({loading:true,
        isDisabled:true});
        this.props.deleteSelectedEvent(ids)
        .then(() => this.refreshData())
      
    }


    renderList({ societyEvents }) {
      console.log(societyEvents)
        if (societyEvents ) {
            return societyEvents.eventBookings.map((item)=>{
                return(
                    <tr key={item.societyEventBookId}>
                       <td><input type="checkbox" name="ids" className="SelectAll" value={item.societyEventBookId}
                         onChange={(e) => {
                            const {societyEventBookId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(societyEventBookId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1);
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true});
                                }
                            }
                            else {
                                this.setState({ids: [...this.state.ids, societyEventBookId]});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                                
                             }}/></td>
                       <td>{item.event_master?item.event_master.eventName:''}</td>
                       <td>{item.user_master.firstName + " " + item.user_master.lastName}</td>
                       <td>{item.startDate}</td>
                       <td>{item.endDate}</td>
                       <td>{item.startTime}</td>
                       <td>{item.endTime}</td>                       
                       <td>{item.perPersonCharge}</td>
                       <td>{item.childAbove}</td>
                       <td>{item.charges}</td>
                       <td>
                             <Button color="success" className="mr-2" onClick={this.editEvent.bind(this,item.societyEventBookId,item.event_master.eventId,item.event_master.eventName,item.user_master.firstName,item.startDate,item.endDate,item.startTime,item.endTime,item.perPersonCharge,item.childAbove,item.charges,item.description)}>Edit</Button>                 
                             <Button color="danger"  onClick={this.deleteEvents.bind(this, item.societyEventBookId)}>Delete</Button>
                        </td>
                   
                    </tr>
                )
            })
        
        }
    }


 handleChange=(event)=> {
    if (!!this.state.errors[event.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[event.target.name];
        this.setState({ [event.target.name]: event.target.value.trim(''), errors });
    }
    else {
        this.setState({ [event.target.name]: event.target.value.trim('') });
    }
 }
 
 getEventName({getEvent}){
    if(getEvent){
        return getEvent.event.map((item) => {
            return (
                <option key={item.eventId} value={item.eventId}>
                    {item.eventName}
                </option>
            )
        })
    }
}


getEventOrganiser({events}){
    if(events){
        return events.event.map((item) => {
            return (
                <option key={item.userId} value={item.userId}>
                    {item.firstName}</option>
            )
        })
    }
}

updateEvents(){
    const {societyEventBookId,eventId,eventName,organisedBy,startDate,endDate,startTime,endTime,perPersonCharge,childAbove,charges,description}= this.state; 
    let errors = {};
        if(this.state.perPersonCharge===''){
            errors.perPersonCharge="Person Charges can't be empty"
            }
            else if(this.state.childAbove===''){
                errors.childAbove="Child Above can't be empty"
            }   
            else if(this.state.charges===''){
                errors.charges="Charges can't be empty"
            }  
            this.setState({ errors });
            const isValid = Object.keys(errors).length === 0
            if (isValid) {
                this.setState({loading: true});
                this.props.updateSocietyEvents(societyEventBookId,eventId,eventName,organisedBy,startDate,endDate,startTime,endTime,perPersonCharge,childAbove,charges,description)
                .then(()=>this.refreshData())
                .catch(err=>{
                    this.setState({modalLoading:false, loading: false})
                    })
                this.setState({ modalLoading: true})
                
}}


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

push=()=>{
    this.props.history.push('/superDashBoard/societyeventbooking')
}

render() { 
    
           let tableData= <Table className="table table-bordered">
        <thead>
            <tr>       
                <th  style={{width:'4%'}}>#</th>
                <th>Event Name</th>
                <th>Oragnised By</th>
                <th>Event Start Date</th>
                <th>Event End Date</th>
                <th>Event Start Time</th>
                <th>Event End Time</th>             
                <th  style={{width:'6%'}}>Per Person Charges</th>
                <th>Child Above</th>
                <th  style={{width:'4%'}}>Charges</th>   
                <th>Actions</th>                          
            </tr>
        
        </thead>

        <tbody>
            {this.renderList(this.props.societyEventBookingReducer)}
        </tbody>
        </Table>
                        
            let modalData =<div>
                            <FormGroup>
                                <Label >Event Name</Label>
                                <Input type="select" name="eventId" value={this.state.eventId} defaultValue='no-value'  onChange={this.handleChange}>
                                <DefaultSelect/>
                                {this.getEventName(this.props.EventDetails)}                  
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label >Oragnised By</Label>
                                <Input type="select" name="organisedBy" value={this.state.organisedBy} defaultValue='no-value'  onChange={this.handleChange}>
                                <DefaultSelect/>
                                {this.getEventOrganiser(this.props.EventDetails)}    
                                </Input>                           
                            </FormGroup>   

                            <Row form>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Event Start Date</Label>
                                <Input type="date" name="startDate" value={this.state.startDate} onChange={this.handleChange}/>
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Event End Date</Label>
                                <Input type="date" name="endDate" value={this.state.endDate} onChange={this.handleChange}/>
                            </FormGroup>
                            </Col>
                            </Row>             
                        
                            <Row form>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Event Start Time</Label>
                                <Input type="time" name="startTime" value={this.state.startTime} onChange={this.handleChange}/>
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Event End Time</Label>
                                <Input type="time" name="endTime" value={this.state.endTime} onChange={this.handleChange}/>
                            </FormGroup>
                            </Col>
                            </Row>
                            <FormGroup>
                                <Label>Per Person Charge</Label>                               
                                <Input type="text" name ="perPersonCharge"  value={this.state.perPersonCharge}  onChange={this.handleChange}/>
                                <span className="error">{this.state.errors.perPersonCharge}</span>
                            </FormGroup>

                            <Row form>
                            <Col md={6}>
                            <FormGroup>                               
                                <Label>Child Above </Label>                               
                                <Input type="text" name ="childAbove"  value={this.state.childAbove} onChange={this.handleChange}/>
                                <span className="error">{this.state.errors.childAbove}</span>
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Charges </Label>                               
                                <Input type="text" name ="charges" value={this.state.charges} onChange={this.handleChange}/>
                                <span className="error">{this.state.errors.charges}</span>
                            </FormGroup>
                            </Col>
                            </Row>

                            <FormGroup>
                                <Label>Description</Label>                               
                                <Input type="text" name ="description" value={this.state.description} maxLength={3000} onChange={this.handleChange}/>
                            </FormGroup>

                            <FormGroup>
                                <Button color="primary" className="mr-2"  onClick={this.updateEvents.bind(this)} >Save </Button>
                                <Button color="danger">Cancel</Button>
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
                            
                    <Modal isOpen={this.state.editEventModal} toggle={this.toggleEditEventModal.bind(this)} >
                        <ModalHeader toggle={this.toggleEditEventModal.bind(this)}>Edit a Event</ModalHeader>
                        <ModalBody>
                           {!this.state.modalLoading?modalData:<Spinner/>}
                        </ModalBody>
                    </Modal>
                    <div className="top-details" style={{ fontWeight: 'bold'}}><h3>Society Event Booking Details</h3>
                    <Button color="primary" type="button" onClick={this.push}>Book Society Event</Button></div>
                    
                    
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
    console.log(state)
    return {
        societyEventBookingReducer: state.societyEventBookingReducer,
        EventDetails: state.EventDetails
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({getSocietyEvents,ViewEvent,GetEventOrganiser,updateSocietyEvents,deleteEvents,deleteSelectedEvent}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(DisplaySocietyEventBooking);

