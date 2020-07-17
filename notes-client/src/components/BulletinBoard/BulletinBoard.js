import React from 'react';
import './BulletinBoard.scss';

import StickyNote from '../StickyNote/StickyNote';

class BulletinBoard extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            notes: null
        }
    }

    componentDidMount(){
       this.updateNotes();
    }

    async updateNotes(){
        let response = await fetch('/api/notes');
        let notes = await response.json();
        this.setState({notes});
    }

    async handleAddNoteClick(){
        await fetch('/api/note', {
            method: 'POST',
            body: JSON.stringify({
                content: '',
                color: 'yellow'
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

               <button className="addNote" onClick={() => this.handleAddNoteClick()}>
                   New Note
               </button>
            </div>
        )
    }
}

export default BulletinBoard;