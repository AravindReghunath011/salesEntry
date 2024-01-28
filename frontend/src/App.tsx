import Spreadsheet from "./pages/page"
import Pdf from './pages/pdf'
import {Routes,Route} from 'react-router-dom'

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Spreadsheet />}></Route>
      <Route path="/pdf" element={<Pdf/>}></Route>
    </Routes>
  )
}

export default App
