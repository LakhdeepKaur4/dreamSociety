import React, { Component } from 'react';
// import './flatMaster.css';
import { connect } from 'react-redux';
import { getCountry, addStates } from '../../actionCreators/countryAction';
import { bindActionCreators } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect } from 'react-router-dom';
import { FormGroup, Form, Input, Button, Label } from 'reactstrap';
import Logo from '../../assets/2.jpg';
import SideBar from '../../components/superAdminDashboardUI/sideBar/sideBar';
import MenuBar from '../../components/superAdminDashboardUI/menuBar/menuBar';
import UI from '../../components/newUI/superAdminDashboard';


class FlatMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {

            countryId: '',
            stateName: '',

            errors: {},
            isSubmit: false,
            menuVisible: false
        }

    }

    componentDidMount() {
        this.props.getCountry()
        //    this.props.getSizeTypeDetails()
    }

    submit = (e) => {
        e.preventDefault();
        let errors = {};
        if (!this.state.countryId) {
            errors.countryId = "CountryName  cannot be empty"
        }
        if (this.state.stateName === '') errors.stateName = "cant be empty";

        this.setState({ errors });

        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            this.setState({ isSubmit: true })
            console.log(this.state);
            this.props.addStates({ ...this.state })
            this.setState({
                countryId: "",
                countryName: '',
                stateName: '',
                isSubmit: true
            });


        }

    }
    onChange = (e) => {
        if (!!this.state.errors[e.target.value]) {
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

    render() {


        const form = <Form onSubmit={this.submit}>
            <FormGroup>
                <Label>CountryName</Label>
                <Input
                    type="select"
                    name="countryId"
                    onChange={this.onChange}>
                    <option >--SELECT--</option>
                    {this.countryName(this.props.countryDetails)}
                </Input>
                <span>{this.state.errors.countryId}</span>

            </FormGroup>


            <FormGroup>
                <Label>StateName</Label>
                <Input
                    type="text"
                    name="stateName"
                    // value={this.state.flatType} 
                    onChange={this.onChange} />
                <span>{this.state.errors.stateName}</span>
            </FormGroup>

            <FormGroup>
                <Button color="primary" type="submit" className="mr-2">Submit</Button>
                <Button color="success" onClick={this.push}>Details</Button>
            </FormGroup>
        </Form>


        return (
            <div>
                {/* <MenuBar onClick={() => this.setState({menuVisible: !this.state.menuVisible})} />
                <div style={{ margin: '48px auto' }}>
                    <SideBar onClick={() => this.setState({menuVisible: false})}
                        visible={this.state.menuVisible}
                        style={{ backgroundImage: `url(${Logo})`,padding:'55px 0px',
                        backgroundSize: 'cover', backgroundRepeat: 'no-repeat', overFlow:`auto` }}> */}
                <UI>
                    <div className="flatMaster">
                        {this.state.isSubmit ? <Redirect to="/superDashboard/statemaster/statemasterdetails" /> : form}
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
        countryDetails: state.countryDetails

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCountry, addStates }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(FlatMaster);