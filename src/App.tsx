import { ThemeProvider } from './Context/ThemeProvider';
import Weather from './components/Weather';
import './App.css'


function App() {

  return (
    <ThemeProvider>
       <Weather />
   
    </ThemeProvider>
  )
}

export default App
