import React from 'react';
import { FormGroup, Input, Button, Label } from 'reactstrap';

const Input = props => {
    return (
        <FormGroup>
            <Label>{props.label}</Label>
            <Input name={props.name} type={props.type} onChange={props.inputChange} />
        </FormGroup>
    );
}


export default Input;