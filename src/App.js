import './App.css';
import { Route, Routes, NavLink } from 'react-router-dom';
import EventForm from './Components/EventForm';
import EventList from './Components/EventList';
import DataContext from './Components/DataContext';
import { createContext } from 'react';
import EventDetails from './Components/EventDetails';

export const eventConext = createContext();

function App() {
  const {events,addEvent,deleteEvent,YYYY_MM_DD_To_DD_MM_YYYY,findEvent, editEvent} = DataContext();
  const contextValue = {events,addEvent,deleteEvent,YYYY_MM_DD_To_DD_MM_YYYY,findEvent, editEvent}
  
  return (
    <eventConext.Provider value={contextValue}>
      <div className="App">
        <div className='navbar'>
        <NavLink to='/'>
          <li>Home Page</li>
        </NavLink>
        <NavLink to='/Add'>
          <li>Add Event</li>
        </NavLink>
      </div>
      <Routes>
        <Route path='/' element={<EventList />} />
        <Route path='/Add' element={<EventForm />}/>        
        <Route path='/Add/:id' element={<EventForm />}/>        
        <Route path='/:id' element={<EventDetails />}/>        
      </Routes>
        
      </div>
    </eventConext.Provider>
  );
}

export default App;
