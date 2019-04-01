import  React, {Component} from 'react';  
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Form, Row, Col, FormGroup, Label, Input} from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import DefaultSelect from '../../constants/defaultSelect';
import { ViewEvent} from '../../actionCreators/eventMasterAction';

class SocietyEventBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
           eventId:'', 
           eventName : '',
           organisedBy:'',
           startDate:'',
           endDate:'',
           startTime:'',
           endTime:'',         
           breakfast:'',
           lunch:'',
           eveningSnacks:'',
           dinner:'',
           dJ:'',
           drinks:'',
           invitationCard:'',
           perPersonCharge:'',
           childAbove:'',
           charges:'',
           description:''
        }
    }

    componentDidMount(){
        this.props.ViewEvent();
    }

    handleChange=(event)=> {
       this.setState({ [event.target.name]: event.target.value})
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
                invitationCard :
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
    
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
    }
    
    render(){
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
                                <Input type="select" name="eventName" placeholder="Event Name" defaultValue='no-value' onChange={this.handleChange}>
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
                            {this.getEventName(this.props.EventDetails)}                  
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
                                <Input type="checkbox" name="breakfast" value={this.state.breakfast} onChange={this.handleChange} />Breakfast
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>   
                                <Input type="checkbox" name="lunch" value={this.state.lunch} onChange={this.handleChange} />Lunch
                                </Label>
                            </FormGroup>
                            <FormGroup check>                                                                                                                                                                                                                            
                                <Label check>   
                                <Input type="checkbox" name="eveningSnacks" value={this.state.eveningSnacks} onChange={this.handleChange}/>Evening Snacks
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>   
                                <Input type="checkbox" name="dinner" value={this.state.dinner} onChange={this.handleChange}/>Dinner
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>   
                                <Input type="checkbox" name="dJ" value={this.state.dJ} onChange={this.handleChange}/>DJ
                                </Label>
                            </FormGroup><br/>

                        <Row form>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Upload Your Invitation Card</Label>                               
                                <Input accept='image/*' style={{display:'inline-block'}}type="file" name ="invitationCard" onChange={this.FileChange} />
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Per Person Charge</Label>                               
                                <Input type="text" name ="perPersonCharge"  placeholder="Enter Price"  onChange={this.handleChange}/>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
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

                    </Form>
                </UI>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        EventDetails: state.EventDetails
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({ViewEvent}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SocietyEventBooking);