import Toolbar from './components /Toolbar/Toolbar';
import {Route, Routes} from 'react-router-dom';
import Pages from './containers/Pages';
import Admin from './containers/Admin/Admin';

const App = () => {
  return (
    <>
     <header>
       <Toolbar/>
     </header>
      <main>
        <Routes>
          <Route path='/pages/:pageName' element={<Pages/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path="*" element={<h1>Not found!</h1>}/>
        </Routes>
      </main>
    </>
  )
};

export default App
