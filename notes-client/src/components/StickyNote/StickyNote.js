import React from 'react';
import './StickyNote.scss';

import utils from "../../utils";

import ColorPicker from '../ColorPicker/ColorPicker';
import {FiTrash2} from 'react-icons/fi';

class StickyNote extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            content: this.props.note.content
        }
    }

    async handleDeleteClick(){
        await fetch(`/api/note/${this.props.note._id}`, {method: 'DELETE'});
        this.props.updateNotes();
    }

    handleContentChange(e){
        this.setState({content: e.target.value});
        this.notifyContentChange(e.target.value);
    }

    notifyContentChange(newContent){
        fetch(`/api/note/${this.props.note._id}/changeContent`, {
            method: 'POST',
            body: JSON.stringify({
                content: newContent
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    render(){
        return(
            <div className="stickyNote" style={{backgroundColor: utils.colors[this.props.note.color]}}>
                <div className="content">
                    <textarea className="content-text" value={this.state.content} onChange={(e) => this.handleContentChange(e)}>
                    </textarea>
                </div>
                <div className="toolBar">
                    <div className="delete" onClick={() => this.handleDeleteClick()}>
                        <FiTrash2 />
                    </div>
                    <div className="colors">
                        <ColorPicker _id={this.props.note._id} updateNotes={() => this.props.updateNotes()}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default StickyNote;