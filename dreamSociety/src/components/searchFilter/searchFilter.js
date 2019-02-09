import React from 'react';
import { FormGroup, Input} from 'reactstrap';

const searchFilter = (props) => {
    console.log(props)
    return (
        <FormGroup>
            <Input type={props.type}
                value={props.value}
                onChange={props.onChange}
                placeholder="Search" />
        </FormGroup>
    );
}

export default searchFilter;