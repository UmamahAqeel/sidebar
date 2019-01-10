import React from 'react';
import { Wrapper } from './StyledComponents';
import { HeaderContext } from './Sidebar';

// const Header = (props) => (
//     <Wrapper>
//         <h1>{props.title}</h1>
//     </Wrapper>
// );

// export default Header;

const Header1 = () => {
    return <Wrap />;
};

const Wrap = () => (
    <HeaderContext.Consumer>
        <Wrapper>
            {(context) => {
                return <h1>{context}</h1>
            }}
        </Wrapper>
    </HeaderContext.Consumer>
);

export default { Header1, Wrap };