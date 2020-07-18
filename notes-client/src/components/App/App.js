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
      this.readBoardFromLocalStorage();
    }
  }

  async readBoardFromLocalStorage(){
    let bid = JSON.parse(localStorage.getItem('board')).bid;
    await this.verifyBoard(bid);
    bid = JSON.parse(localStorage.getItem('board')).bid;
    this.setState({bid});
  }

  async verifyBoard(bid){
    let response = await fetch(`/api/verifyBoard/${bid}`);
    if(response.status === 200) return;
    else{
      // Remove board storage
      localStorage.removeItem('board');
      await this.createBoard();
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
