import styles from './components/App.module.css';
import ButtonClickCounter from './components/Exercise 1/ButtonClickCounter';
import InputTracker from './components/Exercise 2/InputFieldTracker';
import ToggleSwitch from './components/Exercise 3/ToggleSwitch';
import HoverHighlight from './components/Exercise 4/HoverHighlight';
import FormSubmissionAlert from './components/Exercise 5/FormSubmissionAlert';
import KeyPressDisplay from './components/Exercise 6/KeyPressDisplay';
import DoubleClickMessageDisplay from './components/Exercise 7/DoubleClickMessage';
import DropdownSelection from './components/Exercise 8/DropdownSelection';
import CheckboxToggle from './components/Exercise 9/CheckboxToggle';
import SearchFilter from './components/Exercise 10/SearchFilter';
 

 
function App() {
  return (
    <div className={styles.frame}> 
      <p style={{fontSize: '20px', fontWeight: 'bold'}}>Exercise 1: Button Click Counter</p>
      <ButtonClickCounter />
      <p style={{fontSize: '20px', fontWeight: 'bold'}}>Exercise 2: Input Field Tracker</p>
      <InputTracker />
      <p style={{fontSize: '20px', fontWeight: 'bold'}}>Exercise 3: Toggle Switch</p>
      <ToggleSwitch />
      <p style={{fontSize: '20px', fontWeight: 'bold'}}>Exercise 4: Hover Highlight</p>
      <HoverHighlight />
      <p style={{fontSize: '20px', fontWeight: 'bold'}}>Exercise 5: Form Submission Alert</p>
      <FormSubmissionAlert />
      <p style={{fontSize: '20px', fontWeight: 'bold'}}>Exercise 6: Key Press Display</p>
      <KeyPressDisplay /> 
      <p style={{fontSize: '20px', fontWeight: 'bold'}}>Exercise 7: Double Click Message Display</p>
      <DoubleClickMessageDisplay />
      <p style={{fontSize: '20px', fontWeight: 'bold'}}>Exercise 8: Dropdown Selection</p>  
      <DropdownSelection />
      <p style={{fontSize: '20px', fontWeight: 'bold'}}>Exercise 9: Checkbox Toggle</p>
      <CheckboxToggle />
      <p style={{fontSize: '20px', fontWeight: 'bold'}}>Exercise 10: Search Filter</p>
      <SearchFilter />
    </div>  
  );
}

export default App;