import React from 'react';
import './App.scss';

// Components
import BulletinBoard from '../BulletinBoard/BulletinBoard';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    // Check if user has a board, if not wait for board creation
    if(!localStorage.getItem('board')){
      // Board not found -- create new board
      this.createBoard();
    } else{
      let bid = JSON.parse(localStorage.getItem('board')).bid;
      this.setState({bid});
    }
  }

  async createBoard(){
    let response = await fetch('/api/board', {method: 'POST'});
    let board = await response.json();
    localStorage.setItem('board', JSON.stringify({bid: board._id}));
    this.setState({bid: board._id})
  }

  render(){
    if(!this.state.bid) return null
    return (
      <div className="app">
        <BulletinBoard bid={this.state.bid}/>
      </div>
    );
  }
}

export default App;
