import './App.css';
import book from './imgs/book.jpg'

import Jumbotron from 'react-bootstrap/Jumbotron'

function App() {
  return (
    <div className="App">
      <Jumbotron>
        <img id="book" src={book} alt="book"></img>
      </Jumbotron>
    </div>
  );
}

export default App;
