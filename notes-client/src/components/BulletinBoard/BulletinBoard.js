import React from 'react';
import './BulletinBoard.scss';

import StickyNote from '../StickyNote/StickyNote';
import ColorPicker from '../ColorPicker/ColorPicker';

import utils from "../../utils";

class BulletinBoard extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            notes: null,
            newColor: 'yellow'
        }
    }

    componentDidMount(){
       this.updateNotes();
    }

    async updateNotes(){
        let response = await fetch(`/api/board/${this.props.bid}/notes`);
        let notes = await response.json();
        this.setState({notes});
    }

    async handleAddNoteClick(color){
        let response = await fetch(`/api/board/${this.props.bid}/note`, {
            method: 'POST',
            body: JSON.stringify({
                content: '',
                color
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        this.updateNotes();
    }

    renderStickyNotes(){
        return this.state.notes.map(note => {
            return (
                <StickyNote
                    bid={this.props.bid}
                    key={note._id} 
                    note={note}
                    updateNotes={() => this.updateNotes()}
                />
            )
        })
    }

    render(){
        if(!this.state.notes) return null;
        return (
            <div className="bulletinBoard">
               { this.renderStickyNotes() }

               <div className="addNote"  style={{backgroundColor: utils.colors[this.state.newColor]}}>
                   <ColorPicker 
                        customColorCallback={(color) => {
                            this.setState({newColor: color})
                            this.handleAddNoteClick(color)
                    }}
                   />
                   <div className="addNoteInfo">
                       Click Color to Add New Note 
                   </div>
               </div>
            </div>
        )
    }
}

export default BulletinBoard;