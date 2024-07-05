import Toolbar from './components /Toolbar/Toolbar';
import {Route, Routes} from 'react-router-dom';
import Pages from './containers/Pages';

function Admin() {
  return null;
}

const App = () => {
  return (
    <>
     <header>
       <Toolbar/>
     </header>
      <main>
        <Routes>
          <Route path='/pages/:pageName' element={<Pages/>}/>
          <Route path='/pages/admin' element={<Admin/>}/>
          <Route path="*" element={<h1>Not found!</h1>}/>
        </Routes>
      </main>
    </>
  )
};

export default App
