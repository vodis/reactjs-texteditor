import React from 'react';
import TooltipList from '../../container/TooltipList';

import './Tooltip.css';

const Tooltip = (props) => (
    <div className="tooltip" style={{ top: props.top, left: props.left }}>
        <TooltipList  word={props.word} />
    </div>
);

export default Tooltip;