import Approutes from './Services/Approutes';
import Sidebar from './Components/Sidebar';
import Login from './Pages/Login';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
    <Toaster />   
    <Approutes />
       
    </div>
    
  );
}

export default App;
