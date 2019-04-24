import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCommonArea} from '../../actionCreators/commonAreaAction';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import DefaultSelect from '../../constants/defaultSelect';

class CommonAreaMachine  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commonAreaId:'',
            commonArea: '',
            machineId:'',

            errors:{},
            loading:false,
            message:''
           
        }

    }


componentDidMount() {
    this.refreshData() ;
}

refreshData() {
    this.props.getCommonArea();
}

handleChange = (event) => {
    this.setState({message:''});
    if (!!this.state.errors[event.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[event.target.name];
        this.setState({ [event.target.name]: event.target.value.trim(''), errors });
    }
    else {
        this.setState({ [event.target.name]: event.target.value.trim('') });
    }
}


onSubmit = (e) => {
    e.preventDefault();
    const {commonArea} = this.state
    
    let errors = {};
    if(this.state.commonArea===''){
        errors.commonArea="Common Area can't be empty"
    }

    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0
    if(isValid){           
        this.setState({loading:true});
        this.props.addCommonArea(commonArea)
        .then(()=>
        this.props.history.push('/superDashboard/displayCommonAreaMaster'))
        .catch(err=>{
            this.setState({message: err.response.data.message, loading: false})                    
        })
        this.setState({
            commonArea:''
        })   
        }      
    console.log("commonArea",commonArea)
}

getCommonArea= ({ getAreas }) => {
    if (getAreas) {
        return getAreas.commonAreas.map((item) => {
            return (
                <option key={item.commonAreaId} value={item.commonAreaId}>
                    {item.commonArea}
                </option>
            )
        })
    }

} 

render() {
    return(       
            <div>       
                <UI onClick={this.logout} change={this.changePassword}>

                <Form onSubmit={this.onSubmit} >
                <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div><h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Add Common Area</h3></div><br/>
                    <Row>
                        <Col md={6}>
                        <FormGroup>
                            <Label>Common Area</Label>                               
                            <Input type="select" name="commonArea" defaultValue='no-value' onChange={this.handleChange}>                                     
                            <DefaultSelect/>
                            {this.getCommonArea(this.props.commonAreaReducer)}
                            </Input>
                        </FormGroup>
                        </Col>
                        <Col md={6}>
                        <FormGroup>
                            <Label>Machine</Label>                               
                            <Input type="select" name="machine" defaultValue='no-value' onChange={this.handleChange}>                                     
                            <DefaultSelect/>
                            {this.getCommonArea(this.props.commonAreaReducer)}
                            </Input>
                        </FormGroup>
                        </Col>
                    </Row>
                    
                    <Button color="success" className="mr-2">Submit</Button>             
                    <Button color="danger" onClick={this.push}>Cancel</Button>
                                                                                      
                </Form>
                </UI> 
        </div>
        )
        
    }
}

function mapStateToProps(state) {
     return {
        commonAreaReducer: state.commonAreaReducer

        }
    }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getCommonArea}, dispatch);
    }

export default connect(mapStateToProps, mapDispatchToProps)(CommonAreaMachine);
