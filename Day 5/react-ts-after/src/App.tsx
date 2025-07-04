import ButtonClickCounter from './components/Exercise 1/ButtonClickCounter';
import InputFieldTracker from './components/Exercise 2/InputFieldTracker';
import ToggleSwitch from './components/Exercise 3/ToggleSwitch';
import HoverHighlight from './components/Exercise 4/HoverHighlight';
// ... import các component khác

function App() {
  return (
    <div style={{display:'flex', alignItems:'center',  justifyContent:'center',flexDirection: "column"}}> 
      <ButtonClickCounter />
      <InputFieldTracker />
      <ToggleSwitch />
      <HoverHighlight />
    </div>
  );
}

export default App;