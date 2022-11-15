import logo from './logo.svg';
import './App.css';
import Head from './component/Layout/Head';
import Footer from './component/Layout/Footer';
import MenuLeft from './component/Layout/Menuleft';
import { useLocation } from 'react-router-dom';
import MenuAcc from './component/Layout/MenuAcc';
import { UserContext } from './component/Context/Usercontext';
import { useState } from 'react';
function App(props) {
  let params = useLocation();
  const [qtycart,setQtycart] = useState('');
  const [qtywl,setQtywl] = useState('')
  function getqty(qty){
    // console.log('qty',qty)
    setQtycart(qty)
  }
  function getwl(wl){
    console.log(wl)
    setQtywl(wl)
  }
  return (
    <>
    <UserContext.Provider value={{
      getqty:getqty,
      qtycart:qtycart,
      getwl:getwl,
      qtywl:qtywl
    }}>
      <Head/>
      <section>
        <div className='container'>
            <div className='row'>
              {params['pathname'].includes("account") ? <MenuAcc/> :<MenuLeft/>}
              {props.children}
            </div>
        </div>
      </section>
      <Footer/>
    </UserContext.Provider>
    </>
  );
}

export default App;
