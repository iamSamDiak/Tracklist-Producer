import Tape from './components/Tape/Tape'
import Settings from './components/Settings/Settings'
import AudioContext from './AudioContext'

export const audioContext = new AudioContext()

function App() {
  return (
    <div className="Tracklist-Producer">
      <div className='main-title'>
        <h1>Tracklist (Producer)</h1>
      </div>
      <div className='App'>
        <Tape/>
        <Settings/>
      </div>
    </div>
  );
}

export default App;
