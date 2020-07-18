import React from 'react';
import './ColorPicker.scss';

import utils from "../../utils";

export default function colorPicker(props){
    return(
        <div className="colorPicker">
            {
                Object.keys(utils.colors).map(color => {
                    return (
                        <div 
                            key={color}
                            className="color" 
                            style={{backgroundColor: utils.colors[color]}}
                            onClick={() => props.customColorCallback(color)}
                        >
                        </div>
                    )
                })
            }
        </div>
    )
}