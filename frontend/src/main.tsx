
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { store } from './app/store.ts'
import { Provider } from 'react-redux'
import {Toaster} from 'sonner'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <Provider store={store}>  
    <Toaster richColors/>
    <App/>
  </Provider>
  </BrowserRouter>

  
)
