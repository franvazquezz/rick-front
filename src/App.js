import './App.css';
import Cards from './components/Cards/Cards.jsx';
import Nav from './components/Nav/Nav';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites'

function App() {
   const [characters, setCharacters] = useState([]);
   const {pathname} = useLocation()
   const navigate = useNavigate();
   const [access, setAccess] = useState(false);
   
   const login = async (userData) => {
      try {
        const { email, password } = userData;
        const { data } = await axios(`/login?email=${email}&password=${password}`);
        setCharacters([]);
        setAccess(data.access);
      } catch (error) {
        window.alert('Invalid email or password');
      }
    };
  
   
    useEffect(() => {
      access ? navigate('/home') : navigate('/');
      // eslint-disable-next-line
    }, [access]);

   const onSearch = async (id) => {
      try {
         const {data} = await axios(`/character/${id}`)
         if (data.name) setCharacters((oldChars) => [...oldChars, data]);
         else alert('No existe un personaje con ese ID');
      } catch (error) {
         console.log(error);
      }
   }
   const onClose = (id) => {
      setCharacters(characters.filter((char)=> {
         return char.id !== Number(id)
      })
      )
   }

   return (
      <div className='App'>
                  {pathname !== '/' && <Nav onSearch={onSearch}/>}
               <Routes>
                  <Route path='/' element = {<Form login= {login}/>}/>
                  <Route path="/home" element = {<Cards characters={characters} onClose={onClose}/>}/>
                  <Route path="/about" element = {<About/>}/>
                  <Route path="/detail/:id" element = {<Detail/>}/>
                  <Route path='/favorites' element = {<Favorites/>}/>
               </Routes>
      </div>
   );
}


export default App;
