import React from 'react';

import '../css/Content.css';

const Content = (props) => (
    <div className="Content">
        <p>{props.content}</p>
    </div>
);

export default Content;