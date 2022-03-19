import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Containers/Home/Home';

import Welcome from './Containers/Welcome/Welcome';

import Login from './Containers/Login/Login';
import Register from './Containers/Register/Register';
import Profile from './Containers/Profile/Profile';
import MovieDetail from './Containers/MovieDetail/MovieDetail';
import SearchResults from './Containers/SearchResults/SearchResults';

import AdminUsers from './Containers/Admin/AdminUsers';
import Admin from './Containers/Admin/Admin';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
      
        <Header/>

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/welcome" element={<Welcome/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/moviedetail" element={<MovieDetail/>}/>
          <Route path="/searchresults" element={<SearchResults/>}/>


         
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/adminusers" element={<AdminUsers/>}/>
          
          



        </Routes>

        <Footer/>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
