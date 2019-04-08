import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addEventBooking } from './../../actionCreators/memberEventsBookingAction';
import { getMemberEvent } from './../../actionCreators/societyMemberEventAction';
import {getEventDetails} from './../../actionCreators/eventSpaceMasterAction';
import UI from '../../components/newUI/superAdminDashboard';
import _ from 'underscore';
import Spinner from '../../components/spinner/spinner';
import { Form, Button, FormGroup, Input, Label } from 'reactstrap';
import DefaultSelect from './../../constants/defaultSelect';




class MemberEventsBooking extends Component {
    constructor(props) {
        super(props);


        this.state = {
            societyMemberEventId: '',
            startDate: '',
            endDate: '',
            numberOfGuestExpected: '',
            eventSpaceId: '',

            loading: true,
            errors: {},
            message:'',


            menuVisible: false,
        }





    }


    componentDidMount = () => {
        this.refreshData()


    }



    refreshData = () => {
        this.props.getMemberEvent().then(() => this.setState({ loading: false }));
        this.props.getEventDetails().then(() => this.setState({ loading: false }));

    }




    eventType({ memberEventsResult }) {
        if (memberEventsResult) {
            return (
                memberEventsResult.event.map((item) => {
                    return (
                        <option key={item.societyMemberEventId} value={item.societyMemberEventId}>
                            {item.societyMemberEventName}
                        </option>
                    )
                })
            )

        }

    }


    spaceName({ space }) {
       
        if (space) {
            return (
                space.societyMember.map((item) => {
                    return (
                        <option key={item.eventSpaceId} value={item.eventSpaceId}>
                            {item.spaceName}
                        </option>
                    )
                })
            )

        }

    }




    onChange = (e) => {
        this.setState({message:'' })
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
        }
    }

    OnKeyPresshandlerPhone(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }


    handleSubmit = (e) => {
       
        e.preventDefault();
        let errors = {};

        // var ToDate = new Date();
  
    
        if (!this.state.societyMemberEventId) {
            errors.societyMemberEventId = "cant be empty";
        }
        else if(this.state.startDate === ''){
            errors.startDate = "cant be empty";
        } 

       
        else if(this.state.endDate === ''){
            errors.endDate = "cant be empty";
        }

        else if(this.state.startDate > this.state.endDate){
            errors.startDate = "Start Date should be less than end date ";
        }

        
        

        else if(this.state.numberOfGuestExpected === ''){
            errors.numberOfGuestExpected = "cant be empty";
        } 

        else if(this.state.eventSpaceId === ''){
            errors.eventSpaceId = "cant be empty";
        } 
        this.setState({ errors });




        const isValid = Object.keys(errors).length === 0;

        if (isValid) {

            this.setState({loading:true})
           
            this.props.addEventBooking(this.state)
            .then(()=>this.props.history.push('/superDashboard/memberEventsBookingDetail'))
            .catch(err=>{
                this.setState({message: err.response.data.message, loading: false})
            })
              


            this.setState({
                state: {
                   
                    societyMemberEventId: '',
                    startDate: '',
                    endDate: '',
                    numberOfGuestExpected: '',
                    eventSpaceId: '',
                  

                    menuVisible: false,


                }
            });

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

    eventDetails=()=>{
        this.props.history.push('/superDashboard/memberEventsBookingDetail');
    }

    close = () => {
        return this.props.history.replace('/superDashBoard')
    }

    minDate = () => {
        var d = new Date();
        return d.toISOString().split('T')[0];
    }

    render() {
   
        let formData;
        // if(!this.state.loading && this.props.cityMasterReducer.countryResult && this.props.cityMasterReducer.stateResult  &&  this.state.errors){
        formData = <div>
            <FormGroup>
                <Label>Event Type</Label>

                <Input type="select" defaultValue='no-value' name="societyMemberEventId" onChange={this.onChange}>
                    <DefaultSelect />
                    {this.eventType(this.props.societyMemberEventReducer)}
                </Input >
                <span className='error'>{this.state.errors.societyMemberEventId}</span>
            </FormGroup>


            <FormGroup>
                <Label>Start Date</Label>
                <Input type="date" min={this.minDate()} name="startDate" onChange={this.onChange}>
                </Input>
                <span className='error'>{this.state.errors.startDate}</span>
                <span className='error'>{this.state.message}</span>
            </FormGroup>

            <FormGroup>
                <Label>End Date</Label>
                <Input type="date" min={this.minDate()} name="endDate" onChange={this.onChange} />
                <span className='error'>{this.state.errors.endDate}</span>
            </FormGroup>

            <FormGroup>
                <Label>No Of Guest Expected</Label>
                <Input type="text" name="numberOfGuestExpected" onKeyPress={this.OnKeyPresshandlerPhone} onChange={this.onChange} maxLength={4}>
                </Input >
                <span className='error'>{this.state.errors.numberOfGuestExpected}</span>
            </FormGroup>

            <FormGroup>
                <Label>Space Name</Label>
                <Input type="select" defaultValue='no-value' name="eventSpaceId"  onChange={this.onChange}>
                    <DefaultSelect />
                    {this.spaceName(this.props.eventSpaceMasterReducer)}
                </Input >
                <span className='error'>{this.state.errors.eventSpaceId}</span>
            </FormGroup>

            <Button type="submit" color="success" className="mr-2">Submit</Button>
            <Button color="danger" onClick={this.eventDetails}  >Cancel</Button>

        </div>

        // }
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <Form onSubmit={this.handleSubmit}>
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Events Booking Master</h3>
                        {!this.state.loading ? formData : <Spinner />}

                    </Form>
                </UI>

            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("booking.........", state)

    return {
        memberEventsBookingReducer: state.memberEventsBookingReducer,
        societyMemberEventReducer: state.societyMemberEventReducer,
        eventSpaceMasterReducer: state.eventSpaceMasterReducer

    }



}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getMemberEvent, addEventBooking, getEventDetails }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(MemberEventsBooking));
