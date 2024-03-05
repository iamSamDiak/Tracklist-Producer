import Tape from './components/Tape/Tape'
import Settings from './components/Settings/Settings'
import AudioContext from './AudioContext'

export const audioContext = new AudioContext()

function App() {
  return (
    <div className="App">
      <Tape/>
      <Settings/>
    </div>
  );
}

export default App;
