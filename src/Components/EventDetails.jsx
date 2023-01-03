import { useParams,NavLink } from "react-router-dom";
import { useContext } from "react";
import { eventConext } from "../App";


const EventDetails = ()=>{
    const {events,YYYY_MM_DD_To_DD_MM_YYYY,findEvent,deleteEvent} = useContext(eventConext)
    const params = useParams()
    
    const EventSelected =findEvent(params.id)[0][0]
    console.log(findEvent(params.id))
    
    return(
       <div>
          <h1>Title: {EventSelected["title"]}</h1>
          <h1>Start Date: {YYYY_MM_DD_To_DD_MM_YYYY(EventSelected["startDate"])}</h1>
          <h1>End Date: {YYYY_MM_DD_To_DD_MM_YYYY(EventSelected["endDate"])}</h1>
          <h1>Description: {EventSelected["description"]}</h1>
          <NavLink to={`/Add/${params.id}`}><button>Edit</button></NavLink>
          
       </div>
    );
}


export default EventDetails;