import React, { Component } from 'react';
import './flatMaster.css';
import { connect } from 'react-redux';
import { AddDetails, getSocietyNameDetails, getSizeTypeDetails, getDetails } from '../../actionCreators/flatMasterAction';
import { bindActionCreators } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, Form, Input, Button, Label } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import UI from '../../components/newUI/superAdminDashboard';


class FlatMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            societyId: '',
            flatType: '',
            flatSuperArea: '',
            sizeId: '',
            coverArea: '',
            errors: {},
            isSubmit: false,
            loading:true,
            menuVisible: false
        };
        this.onChange = this.onChange.bind(this);

    }

    componentDidMount() {
        this.props.getSocietyNameDetails().then(()=> this.setState({loading:false}))
        this.props.getSizeTypeDetails().then(()=> this.setState({loading:false}))
    }

    submit = (e) => {
        e.preventDefault();
        let errors = {};
        if (!this.state.societyId) {
            errors.societyId = "Society Name cannot be empty"
        }
        if (this.state.flatType === '') errors.flatType = "Cant be empty";
        else if (this.state.flatType.length < 3) errors.flatType = "Characters should be less than four"
        if (this.state.flatSuperArea === '') errors.flatSuperArea = "Cant be empty";

        if (!this.state.sizeId) {
            errors.sizeId = "SizeType cannot be empty";
        }
        if (this.state.coverArea === '') errors.coverArea = "Cant be empty";
        else if (parseInt(this.state.coverArea) >= parseInt(this.state.flatSuperArea)) errors.coverArea=
         "CoverArea cannot be greater then flatSuperArea";
        this.setState({ errors });

        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            this.setState({ loading: true })
            this.props.AddDetails({ ...this.state })
            .then(() => this.props.history.push('/superDashboard/flatmaster/flatmasterdetails'));
            this.setState({
                societyId: "",
                flatType: '',
                flatSuperArea: '',
                sizeId: '',
                coverArea: '',
                isSubmit: true,
                menuVisible: false
            });
        }
    }
    onChange(e){
        if (!this.state.errors[e.target.value]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            console.log('no errors');
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        } else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
        }

        console.log(this.state)
    }
    societyName({ list0 }) {
        console.log(list0)
        if (list0) {

            return (
                list0.map((item) => {
                    return (
                        <option key={item.societyId} value={item.societyId}>
                            {item.societyName}
                        </option>
                    )
                })
            )

        }
    }
    sizeType({ list4 }) {
        if (list4) {

            return (
                list4.map((item) => {
                    return (
                        <option key={item.sizeId} value={item.sizeId}>
                            {item.sizeType}
                        </option>
                    )
                })
            )

        }
    }

    push = () => {
        this.props.history.push('/superDashboard/flatmaster/flatmasterdetails')
    }
    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    OnKeyPresshandlerPhone=(event)=>{
        const pattern = /^[0-9+]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    

    render() {
          let form;
          if(!this.state.loading && this.props.flat.list0 && this.props.flat.list4 && this.state.errors){
            
          
            form = <Form onSubmit={this.submit}>
             <h3 style={{textAlign:'center', marginBottom: '10px'}}>Flat Master</h3>
            <FormGroup>
                <Label>Society Name</Label>
                <Input
                    type="select"
                    name="societyId"
                  
                    onChange={this.onChange}>
                    <option >--Select--</option>
                    {this.societyName(this.props.flat)}
                </Input>
                <span  className='error'>{this.state.errors.societyId}</span>

            </FormGroup>


            <FormGroup>
                <Label>Flat Type</Label>
                <Input
                    type="text"
                    name="flatType"
                    placeholder="flat type"
                    maxLength='4'
                    value={this.state.flatType}
                    onChange={this.onChange} />
                    
                <span className='error'>{this.state.errors.flatType}</span>
            </FormGroup>

            <FormGroup>
                <Label>Flat SuperArea</Label>
                <Input
                    type="text"
                    name="flatSuperArea"  
                    placeholder="flat superArea"  
                    value={this.state.flatSuperArea}
                    onKeyPress = {this.OnKeyPresshandlerPhone}
                    maxLength='3'
                    onChange={this.onChange} />
                <span className='error'>{this.state.errors.flatSuperArea}</span>
            </FormGroup>

            <FormGroup>
                <Label>Size Type</Label>
                <Input
                    type="select"
                    name="sizeId"
                    onChange={this.onChange}>
                    <option>--SELECT--</option>
                    {this.sizeType(this.props.flat)}
                </Input>
                <span className='error'>{this.state.errors.sizeId}</span>
            </FormGroup>

            <FormGroup>
                <Label>Cover Area</Label>
                <Input
                    type="text"
                    name="coverArea"
                    placeholder="Cover Area"
                    value={this.state.coverArea}
                    onKeyPress = {this.OnKeyPresshandlerPhone}
                    maxLength='3'
                    onChange={this.onChange} />
                <span  className='error'>{this.state.errors.coverArea}</span>
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
                        {form}
                    </div>
                </UI>
                {/* </SideBar>
                </div> */}

            </div>

        )

    }
}
function mapStateToProps(state) {

    return {
        flat: state.flat

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AddDetails, getSocietyNameDetails, getSizeTypeDetails, getDetails }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(FlatMaster);