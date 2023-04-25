import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from '../pages/Home'
import SummonerForm from '../pages/SummonerForm'

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/SummonerForm' element={<SummonerForm/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router