import { Navbar } from './components/Navbar'
import { EnhancerPage } from './pages/EnhancerPage'
import { Footer } from './components/Footer'

function App() {

  return (
    <div className='grid grid-rows-[auto_1fr_auto] min-h-screen'>
      <Navbar></Navbar>
      <EnhancerPage></EnhancerPage>
      <Footer></Footer>
    </div>
  )
}

export default App
