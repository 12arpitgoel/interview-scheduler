import React from 'react';
import Navbar from './components/Navbar';
import "./App.css";
import {BrowserRouter,Route} from 'react-router-dom';
import InterviewList from './components/screens/InterviewList';
import Creation from './components/screens/Creation';
import EditPage from './components/screens/EditPage';


function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <Route exact path="/">
          <InterviewList />
        </Route>
        <Route path="/create">
          <Creation/>
        </Route>
        <Route path="/edit/:meetingId">
          <EditPage />
        </Route>
    </BrowserRouter>
  );
}

export default App;
