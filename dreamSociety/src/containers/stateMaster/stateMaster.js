import React, { Component } from 'react';
// import './flatMaster.css';
import { connect } from 'react-redux';
import { getCountry, addStates } from '../../actionCreators/countryAction';
import { bindActionCreators } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, Form, Input, Button, Label } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import UI from '../../components/newUI/superAdminDashboard';


class FlatMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {

            countryId: '',
            stateName: '',

            errors: {},
            isSubmit: false,
            loading:true,
            menuVisible: false
        }

    }

    componentDidMount() {
        this.props.getCountry().then(()=> this.setState({loading:false}))
        //    this.props.getSizeTypeDetails()
    }

    submit = (e) => {
        e.preventDefault();
        let errors = {};
        if (!this.state.countryId) {
            errors.countryId = "CountryName  cannot be empty"
        }
        if (this.state.stateName === '') errors.stateName = "Cant be empty";

        this.setState({ errors });

        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            
            this.setState({loading:true})
            console.log(this.state);
            this.props.addStates({ ...this.state })
           
            .then(() => this.props.history.push('/superDashboard/statemaster/statemasterdetails'));
            
            
            this.setState({
                countryId: "",
                countryName: '',
                stateName: '',
                
                isSubmit: true
            });


        }

    }
    onChange = (e) => {
        if (!this.state.errors[e.target.value]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        } else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
        }

        console.log(this.state)
    }

    countryName({ country1 }) {
        console.log(country1)
        if (country1) {

            return (
                country1.map((item) => {
                    return (
                        <option key={item.countryId} value={item.countryId}>
                            {item.countryName}
                        </option>
                    )
                })
            )

        }
    }

    push = () => {
        this.props.history.push('/superDashboard/statemaster/statemasterdetails')
    }
    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }
    onStateChange=(event)=>{
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }


    render() {

         let form;
         if(!this.state.loading && this.props.countryDetails.country1 && this.state.errors){
            form = <Form onSubmit={this.submit}>
              <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
   </div>
             <h3 style={{textAlign:'center', marginBottom: '10px'}}>State Master</h3>
        
            <FormGroup>
                <Label>CountryName</Label>
                <Input
                    type="select"
                    name="countryId"
                    onChange={this.onChange}>
                    <option >--SELECT--</option>
                    {this.countryName(this.props.countryDetails)}
                </Input>
                <span className='error'>{this.state.errors.countryId}</span>

            </FormGroup>


            <FormGroup>
                <Label>StateName</Label>
                <Input
                    type="text"
                    name="stateName"
                    placeholder='StateName'
                    maxLength='50'
                    onKeyPress={this.onStateChange}
                    // value={this.state.flatType} 
                    onChange={this.onChange} />
                <span className='error'>{this.state.errors.stateName}</span>
            </FormGroup>

            <FormGroup>
                <Button color="success" type="submit" className="mr-2">Submit</Button>
                <Button color="danger" onClick={this.push}>Cancel</Button>
            </FormGroup>
        </Form>
         }
        
        else if(this.submit){
            form = <Spinner />
        }
        


        return (
            <div>
                
                <UI onClick={this.logout}>
                    <div>
                      { form}   
                    </div>
                    
                </UI>
               
            </div>
        )

    }
}
function mapStateToProps(state) {

    return {
        countryDetails: state.countryDetails

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCountry, addStates }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(FlatMaster);