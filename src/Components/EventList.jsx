import { useContext } from "react"
import { eventConext } from "../App";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

function EventList(){

    const location = useLocation()
    const {events,deleteEvent,YYYY_MM_DD_To_DD_MM_YYYY} = useContext(eventConext)
    const eventsList = []

    console.log(location.state)
    
    events.map((eve,i)=>eventsList.push(
        <div className="eventList" key={i}>
            <li key={`a${i}`}>{eve[0]['title']}</li>
            <li key={`b${i}`}>{YYYY_MM_DD_To_DD_MM_YYYY(eve[0]['startDate'])} To {YYYY_MM_DD_To_DD_MM_YYYY(eve[0]['endDate'])}</li>
            <li key={`c${i}`}>{eve[0]['description']}</li>
            <NavLink to={`/${eve[1]}`}><button>Details</button></NavLink>
            <button onClick={()=>deleteEvent(eve[1])}>Delete</button>
            <br></br>
        </div>
        ))
    
    return(
        <div className="Center">
            <h1>Events In The Future</h1>
            <button onClick={()=>deleteEvent(location.state)}>Uptade Events</button>
            {eventsList}
        </div>
        
    );

}

export default EventList;