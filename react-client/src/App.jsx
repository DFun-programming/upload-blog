import {BrowserRouter,Routes , Route} from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Search from './pages/Search'
import Home from './pages/Home'
import Header from './components/common/Header'
import './App.css'
import Footer from './components/common/Footer'
import PrivateRoute from './components/core/auth/PrivateRoute'
import Dashboard from './pages/Dashboard'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'
import ScrollToTop from './components/common/ScrollToTop'
import OpenRoute from './components/core/auth/OpenRoute'
function App() {
 
 return (
<>
<ScrollToTop></ScrollToTop>
  <Header/>
  <Routes>
    <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
         {/**OpenRoute for only users who are not logged in users */}
        <Route path='/signin' element={<OpenRoute><SignIn /></OpenRoute>} />
          {/**OpenRoute for only users who are not logged in users */}
        <Route path='/signup' element={<OpenRoute><SignUp /></OpenRoute>} />
        {/**Private Route for only logged in users */}
        <Route path='/dashboard' element={<PrivateRoute><Dashboard></Dashboard></PrivateRoute>}></Route>
        {/**Private Route for only logged in users */}
        <Route path='/create-post' element={<PrivateRoute><CreatePost></CreatePost></PrivateRoute>}></Route>
        <Route path='/update-post/:postId' element={<PrivateRoute><UpdatePost></UpdatePost></PrivateRoute>}></Route>
        <Route path='/post/:postSlug' element={<PostPage></PostPage>}></Route>
        <Route path='/search' element={<Search  />} />
    </Routes>
  <Footer/>
</>
  )
}

export default App
