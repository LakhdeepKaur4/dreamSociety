import React, { Component } from 'react';
import './flatMaster.css';
import { connect } from 'react-redux';
import { AddDetails, getSocietyNameDetails, getSizeTypeDetails, getDetails } from '../../actionCreators/flatMasterAction';
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
            societyId: '',
            flatType: '',
            flatSuperArea: '',
            sizeId: '',

            coverArea: '',
            validationError: '',
            errors: {},
            isSubmit: false,
            menuVisible: false
        }

    }

    componentDidMount() {
        this.props.getSocietyNameDetails()
        this.props.getSizeTypeDetails()
    }

    submit = (e) => {
        e.preventDefault();
        let errors = {};
        if (!this.state.societyId) {
            errors.societyId = "society name cannot be empty"
        }
        if (this.state.flatType === '') errors.flatType = "cant be empty";
        else if (this.state.flatType.length < 3) errors.flatType = "Characters should be less than four"
        if (this.state.flatSuperArea === '') errors.flatSuperArea = "cant be empty";

        if (!this.state.sizeId) {
            errors.sizeId = "sizeType cannot be empty";
        }
        if (this.state.coverName === '') errors.coverName = "cant be empty";
        this.setState({ errors });

        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            this.setState({ isSubmit: true })
            this.props.AddDetails({ ...this.state })
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



    // selectedSizeType=(e)=>{
    //     this.state.sizeId=e.target.value
    //     console.log(this.state.sizeId)
    // }
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

    render() {


        const form = <Form onSubmit={this.submit}>
            <FormGroup>
                <Label>SocietyName</Label>
                <Input
                    type="select"
                    name="societyId"
                    onChange={this.onChange}>
                    <option >--SELECT--</option>
                    {this.societyName(this.props.flat)}
                </Input>
                <span>{this.state.errors.societyId}</span>

            </FormGroup>


            <FormGroup>
                <Label>Flat Type</Label>
                <Input
                    type="text"
                    name="flatType"
                    maxLength='4'
                    value={this.state.flatType}
                    onChange={this.onChange} />
                <span>{this.state.errors.flatType}</span>
            </FormGroup>

            <FormGroup>
                <Label>Flat SuperArea</Label>
                <Input
                    type="number"
                    name="flatSuperArea"
                    min='0'
                    value={this.state.flatSuperArea}
                    onChange={this.onChange} />
                <span>{this.state.errors.flatSuperArea}</span>
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
                <span>{this.state.errors.sizeId}</span>
            </FormGroup>

            <FormGroup>
                <Label>CoverArea</Label>
                <Input
                    type="number"
                    name="coverArea"
                    value={this.state.coverArea}
                    min='0'
                    onChange={this.onChange} />
                <span>{this.state.errors.coverArea}</span>
            </FormGroup>

            <FormGroup>
                <Button color="success" type="submit" className="mr-2">Submit</Button>
                <Button color="primary" onClick={this.push}>FlatDetails</Button>
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
                        {this.state.isSubmit ? <Redirect to="/superDashboard/flatmaster/flatmasterdetails" /> : form}
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