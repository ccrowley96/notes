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
                            onClick={async () => {
                                await handleColorChange(color, props._id)
                                props.updateNotes();
                            }}
                        >
                        </div>
                    )
                })
            }
        </div>
    )
}

async function handleColorChange(color, _id){
    await fetch(`/api/note/${_id}/changeColor/${color}`, {
        method: 'POST',
    })
}