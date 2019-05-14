import React from 'react';
import { FormGroup, Input, Button, Label } from 'reactstrap';

const InputField = props => {
    return (
        <FormGroup>
            <Label>{props.label}</Label>
            <Input disabled={props.disabled} placeholder={props.placeholder} name={props.name} type={props.type} onChange={props.inputChange} value={props.value
            } />
        </FormGroup>
    );
}


export default InputField;