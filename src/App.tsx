import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import {Home} from './pages/Home'
import {SingleCityList} from './pages/SingleCityList'
import {NotFound} from './pages/NotFound'
import {Header} from './components/Header'
import {Footer} from './components/Footer'


function App() {
    return (
        <>
            <Router basename='/react-weather'>
                <Header/>
                <main className="container content">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/cities/:name" component={SingleCityList}/>
                        <Route component={NotFound}/>
                    </Switch>
                </main>
                <Footer/>
            </Router>
        </>
    );
}

export default App;
