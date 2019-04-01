import  React, {Component} from 'react';  
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Form,Table, Row, Col,Button,  Modal, FormGroup, ModalBody, ModalHeader, Label, Input} from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import {getSocietyEvents,updateSocietyEvents} from '../../actionCreators/societyEventBooking';
import Spinner from '../../components/spinner/spinner';
import {ViewEvent,GetEventOrganiser} from '../../actionCreators/eventMasterAction';
import DefaultSelect from '../../constants/defaultSelect';


class DisplaySocietyEventBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
           eventId:'', 
           societyEventName : '',
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
       console.log(societyEventBookId,eventId,eventName,firstName,startDate,endDate,startTime,endTime,perPersonCharge,childAbove,charges,description,"priy")
        this.setState({
            societyEventBookId,eventId,eventName,firstName,startDate,endDate,startTime,endTime,perPersonCharge,childAbove,charges,description
            ,editEventModal: !this.state.editEventModal})
    }

    toggleEditEventModal() {
        this.setState({
            editEventModal: !this.state.editEventModal
        });
    }

    renderList({ societyEvents }) {
      console.log(societyEvents)
        if (societyEvents ) {
            return societyEvents.eventBookings.map((item)=>{
                return(
                    <tr key={item.societyEventBookId}>
                       <td><input type="checkbox" ></input></td>
                       <td>{item.event_master?item.event_master.eventName:''}</td>
                       <td>{item.user_master.firstName + " " + item.user_master.lastName}</td>
                       <td>{item.startDate}</td>
                       <td>{item.endDate}</td>
                       <td>{item.startTime}</td>
                       <td>{item.endTime}</td>
                       <td>{item.perPersonCharge}</td>
                       <td>{item.childAbove}</td>
                       <td>{item.charges}</td>
                       <td>{item.description}</td>
                       <td>
                             <Button color="success" className="mr-2" onClick={this.editEvent.bind(this,item.societyEventBookId,item.event_master.eventId,item.event_master.eventName,item.user_master.firstName,item.startDate,item.endDate,item.startTime,item.endTime,item.perPersonCharge,item.childAbove,item.charges,item.description)}>Edit</Button>                 
                             <Button color="danger" >Delete</Button>
                        </td>
                   
                    </tr>
                )
            })
        
        }
    }


 handleChange=(event)=> {
      this.setState({ [event.target.name]: event.target.value})
      console.log(event.target.value,"abc")
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
    const {societyEventBookId,eventId,firstName,startDate,endDate,startTime,endTime,perPersonCharge,childAbove,charges,description}= this.state; 
console.log(societyEventBookId,eventId,firstName,startDate,endDate,startTime,endTime,perPersonCharge,childAbove,charges,description)
    this.props.updateSocietyEvents(societyEventBookId,eventId,firstName,startDate,endDate,startTime,endTime,perPersonCharge,childAbove,charges,description)
    .then(()=>this.refreshData())
    this.setState({ modalLoading: true})
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
                <th>Per Person Charges</th>
                <th>Child Above</th>
                <th>Charges</th>
                <th>Description</th>        
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
                            </FormGroup>

                            <Row form>
                            <Col md={6}>
                            <FormGroup>                               
                                <Label>Child Above </Label>                               
                                <Input type="text" name ="childAbove"  value={this.state.childAbove} onChange={this.handleChange}/>
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Charges </Label>                               
                                <Input type="text" name ="charges" value={this.state.charges} onChange={this.handleChange}/>
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
   
  return (

      <div>
          <UI onClick={this.logout} change={this.changePassword}>
            
                
                <div className="w3-container w3-margin-top w3-responsive">
                                <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                                    <span aria-hidden="true">&times;</span>
                            </div> 
                            
                    <Modal isOpen={this.state.editEventModal} toggle={this.toggleEditEventModal.bind(this)} >
                        <ModalHeader toggle={this.toggleEditEventModal.bind(this)}>Edit a Service</ModalHeader>
                        <ModalBody>
                           {!this.state.modalLoading?modalData:<Spinner/>}
                        </ModalBody>
                    </Modal>
                    <div className="top-details" style={{ fontWeight: 'bold'}}><h3>Service Details</h3>
                    <Button color="primary" type="button" onClick={this.push}>Add Services</Button></div>
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

    return bindActionCreators({getSocietyEvents,ViewEvent,GetEventOrganiser,updateSocietyEvents}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(DisplaySocietyEventBooking);


