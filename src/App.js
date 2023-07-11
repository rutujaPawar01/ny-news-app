import logo from './logo.svg';
import './App.css';
import {
  Box
} from '@mui/material';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <section>
        <Box>Test </Box>
      </section>
      <footer>
        Developed by Rutuja Pawar
      </footer>
    </div>
  );
}

export default App;
