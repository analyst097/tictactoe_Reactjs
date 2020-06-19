import React, { Component } from 'react';
import './App.css';
var DOC = document;

class App extends Component{

  constructor(){

    super();
      this.state = {
        playerTurn: 1,
        player: [0,0],
        clicks: 0,
        matrix : [ 0,0,0,0,0,0,0,0,0 ]
    };
  }

  componentDidUpdate(){
     console.log(this.state);
     if(this.state.clicks >= 5){
      let winner = this.winCheck();
      if( winner!=null ) {
          alert("Player " + winner + " wins");
          DOC.getElementsByClassName('grid-container')[0].style.pointerEvents = 'none';
          DOC.getElementById('reset').style.display = 'block';
          DOC.getElementById('playerTurn').style.display ='none';
      }
  }
  }


   changeTurn = (nextTurn) =>{
      DOC.getElementById('turn').innerHTML = nextTurn;
      this.setState({ 
         playerTurn: nextTurn,
      });
}

   getTurn = () =>{
      return this.state.playerTurn;
}

   clickCounter = ()=>{
      let turn = this.state.playerTurn;
      let upclicks = this.state.clicks;
      upclicks += 1;
      if(this.state.clicks >= 9){
          console.log(this.state.player);
          alert('9 Clicks reached.');
      }
      turn -= 1;
      let pclicks = this.state.player;
      pclicks[turn] += 1;
      this.setState({player: pclicks, clicks: upclicks});
}


   matrixUpdate = (itemClicked)=>{
      let playerClicked = this.state.playerTurn;
      let itemId = itemClicked.id;
      let copy = this.state.matrix;

      if(playerClicked === 1){       
          copy[itemId] = 1;
      }
      else{
         copy[itemId] = 2;
      }

      this.setState({matrix: copy});
}

   winCheck = ()=>{
      let copyMatrix = this.state.matrix;
      let row = null;
      let col = null;
      let diag = null;
  
      row = this.rowCheck(1,2,copyMatrix);
      if(row != null) { return row; }
  
      col =  this.columnCheck(1, 2, copyMatrix);
      if(col != null) { return col; }
  
      diag = this.diagonalCheck(1,2,copyMatrix);
      if(diag != null) { return diag; }
  
}


   rowCheck = (val1, val2, matrix)=>{

      if( (matrix[0] === val1 && matrix[1] === val1 && matrix[2] === val1) ||
          (matrix[3] === val1 && matrix[4] === val1 && matrix[5] === val1) ||
          (matrix[6] === val1 && matrix[7] === val1 && matrix[8] === val1) ) { return val1; }
  
      else if( (matrix[0] === val2 && matrix[1] === val2 && matrix[2] === val2) ||
               (matrix[3] === val2 && matrix[4] === val2 && matrix[5] === val2) ||
               (matrix[6] === val2 && matrix[7] === val2 && matrix[8] === val2)) { return val2; }
  
      else{ return null; }
}

   columnCheck = (val1, val2, matrix)=>{
      if( (matrix[0] === val1 && matrix[3] === val1 && matrix[6] === val1) ||
          (matrix[1] === val1 && matrix[4] === val1 && matrix[7] === val1) ||
          (matrix[2] === val1 && matrix[5] === val1 && matrix[8] === val1) ) { return val1; }
      
  else if( (matrix[0] === val2 && matrix[3] === val2 && matrix[6] === val2) ||
           (matrix[1] === val2 && matrix[4] === val2 && matrix[7] === val2) ||
           (matrix[2] === val2 && matrix[5] === val2 && matrix[8] === val2)) { return val2; }

  else{ return null; }
}

   diagonalCheck = (val1, val2, matrix)=>{
      if( ( matrix[0] === val1 && matrix[4] === val1 && matrix[8] === val1 ) ||
          ( matrix[2] === val1 && matrix[4] === val1 && matrix[6] === val1 ) ) { return val1; }

  else if( ( matrix[0] === val2 && matrix[4] === val2 && matrix[8] === val2 ) ||
           ( matrix[2] === val2 && matrix[4] === val2 && matrix[6] === val2 ) ) { return val2; }
  else { return null; }
} 

   startGame = ()=>{
    DOC.getElementsByClassName('grid-container')[0].style.pointerEvents = 'all';
    DOC.getElementById('playerTurn').style.display = 'block';
    DOC.getElementById('start').style.display = 'none';
    console.log(this.state);
}

   resetGame = ()=> {
      window.location.reload();
}


 gameHandler = (event)=>{
   let turn = this.getTurn();
   let nextTurn = null;
   if(this.state.clicks <=9){
      
       if(turn === 1){
           DOC.getElementById(event.target.id).innerHTML = 'X';
           DOC.getElementById(event.target.id).style.pointerEvents = 'none';
           nextTurn = 2;
       }
       else{
           event.target.innerHTML = 'O';
           nextTurn = 1;
           DOC.getElementById(event.target.id).style.pointerEvents = 'none';
       }

       this.changeTurn(nextTurn);
       this.clickCounter();
       this.matrixUpdate(event.target);

   }
   else{
      DOC.getElementsByClassName('grid-container')[0].style.pointerEvents = 'none';
      DOC.getElementById('reset').style.display = 'block';
      DOC.getElementById('playerTurn').style.display ='none';
   }
}

  render(){
    return (
      <div className="App">
        <header>
            <h1>Tic Tac Toe</h1>
            <button id="start" onClick={() => this.startGame(this)}>START GAME</button>
            <h2 id="playerTurn">Player <span id={"turn"}>1</span> turn</h2>
            <button id="reset" onClick={this.resetGame}>RESET GAME</button>
            
        </header>
  
     <div className="grid-container">
         <div id="0" className="item1" onClick={(event)=> this.gameHandler(event)}></div>
         <div id="1" className="item2" onClick={(event)=> this.gameHandler(event)}></div>
         <div id="2" className="item3" onClick={(event)=> this.gameHandler(event)}></div>
         <div id="3" className="item4" onClick={(event)=> this.gameHandler(event)}></div>
         <div id="4" className="item5" onClick={(event)=> this.gameHandler(event)}></div>
         <div id="5" className="item6" onClick={(event)=> this.gameHandler(event)}></div>
         <div id="6" className="item7" onClick={(event)=> this.gameHandler(event)}></div>
         <div id="7" className="item8" onClick={(event)=> this.gameHandler(event)}></div>
         <div id="8" className="item9" onClick={(event)=> this.gameHandler(event)}></div>
     </div>
      </div>
    );
  };
  
}

export default App;
