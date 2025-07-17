import './App.css';
import { useState } from 'react';
import TasksManagement from './Day14/TasksManagement';
import { LoginContext } from './Day14/context';

function App() {
  const [user, setUser] = useState<string | null>(null);
  return (
    <LoginContext.Provider value={{ user, setUser }}>
      <TasksManagement/>
    </LoginContext.Provider>
  );
}

export default App;