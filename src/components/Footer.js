import React from 'react';
import { Wrapper } from './StyledComponents';
//import './Footer.css';

const footer = (props) => (
    <Wrapper>
        <h1>{props.title}</h1>
    </Wrapper>
);

export default footer;