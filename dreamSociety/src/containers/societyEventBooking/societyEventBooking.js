import  React, {Component} from 'react';  
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Form, Row, Col,Button, FormGroup, Label, Input} from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import DefaultSelect from '../../constants/defaultSelect';
import {ViewEvent,GetEventOrganiser} from '../../actionCreators/eventMasterAction';
import {addSocietyEvents} from '../../actionCreators/societyEventBooking';

class SocietyEventBooking extends Component {
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
           loading:false,
        }
    }

    componentDidMount(){
        this.props.ViewEvent();
        this.props.GetEventOrganiser();
    }

    handleChange=(event)=> {
       this.setState({ [event.target.name]: event.target.value})
    }

    h=(event)=>{
        this.setState({ [event.target.name]: event.target.checked})

    }

    FileChange=(event)=>{

        const files = event.target.files;
        const file = files[0];
        const fileName=file.name
        if (files && file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload =  () =>{
              this.setState({
                invitationCardPicture :
                  reader.result,
                  fileName
              })          
          }
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
    
    toggleChange = () => {
        this.setState({
          isChecked: !this.state.isChecked,
        });
      }
    onSubmit=(event)=>{
        event.preventDefault();
        const Events= this.state;
    
        this.setState({loading: true});
        this.props.addSocietyEvents(Events)
        console.log(Events)
    }
    
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
    }
    
    render(){console.log(this.state)
        return(
            <div>
                <UI onClick={this.logout} change={this.changePassword}>

                    <Form onSubmit={this.onSubmit} >

                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div><h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Book Society Events </h3></div><br/>
                        <Row form>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Event Name</Label>
                                <Input type="select" name="societyEventName" defaultValue='no-value' onChange={this.handleChange}>
                                <DefaultSelect/>
                                {this.getEventName(this.props.EventDetails)}                  
                                </Input>
                            </FormGroup>
                            </Col>

                            <Col md={6}>
                            <FormGroup>
                            <Label>Event Oragnised By</Label>
                            <Input type="select" name="organisedBy" defaultValue='no-value' onChange={this.handleChange}>
                            <DefaultSelect/>
                            {this.getEventOrganiser(this.props.EventDetails)}                  
                            </Input>
                            </FormGroup>
                            </Col>
                        </Row>
                       
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
                                <Label>
                            Select your options  
                                </Label>
                            </FormGroup>
                            
                            <FormGroup check>
                                <Label check>   
                                <Input type="checkbox" name="breakfast" onChange={this.h} />Breakfast
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>   
                                <Input type="checkbox" name="lunch" onChange={this.h} />Lunch
                                </Label>
                            </FormGroup>
                            <FormGroup check>                                                                                                                                                                                                                            
                                <Label check>   
                                <Input type="checkbox" name="eveningSnacks"  onChange={this.h}/>Evening Snacks
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>   
                                <Input type="checkbox" name="dinner" onChange={this.h}/>Dinner
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>   
                                <Input type="checkbox" name="drinks" onChange={this.h}/>Drinks
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>   
                                <Input type="checkbox" name="dJ" onChange={this.h}/>DJ
                                </Label>
                            </FormGroup><br/>

                        <Row form>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Upload Your Invitation Card</Label>                               
                                <Input accept='image/*' style={{display:'inline-block'}}type="file" name ="invitationCardPicture" onChange={this.FileChange} />
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Per Person Charge</Label>                               
                                <Input type="text" name ="perPersonCharge"  placeholder="Enter Price"  onChange={this.handleChange}/>
                            </FormGroup>
                            </Col> 
                        </Row>
                        <Row form>
                            <Col md={6}>
                            <FormGroup>                               
                                <Label>Child Above </Label>                               
                                <Input type="text" name ="childAbove"  placeholder="Example 12 years"  onChange={this.handleChange}/>
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Charges </Label>                               
                                <Input type="text" name ="charges" placeholder="Enter Price"   onChange={this.handleChange}/>
                            </FormGroup>
                            </Col>
                        </Row>
                            <FormGroup>
                                <Label>Description</Label>                               
                                <Input type="text" name ="description" placeholder="Description"  maxLength={3000} onChange={this.handleChange}/>
                            </FormGroup>
                            <Button color="success" className="mr-2">Submit</Button>             
                            <Button color="danger" >Cancel</Button>

                    </Form>
                </UI>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        EventDetails: state.EventDetails,
        societyEventBookingReducer: state.societyEventBookingReducer
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({ViewEvent,GetEventOrganiser,addSocietyEvents}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SocietyEventBooking);