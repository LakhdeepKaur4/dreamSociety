import React from 'react';
import { FormGroup, Button } from 'reactstrap';

const ButtonComponent = props => {
    return (
        <Button className={props.className} color={props.color} onClick={props.buttonClicked}>{props.title}</Button>
    );
}


export default ButtonComponent;