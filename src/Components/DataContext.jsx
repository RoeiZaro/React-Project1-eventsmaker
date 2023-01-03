import { useState } from "react"


function DataContext() {
    const [events, setEvents] = useState([
        [{title:"Ben's Bar-Mitzva", startDate:"2022-12-30", endDate:"2022-12-31", description: "A regular event for regular people"},0],
        [{title:"logan's Bar-Mitzva", startDate:"2022-12-30", endDate:"2022-12-31", description: "A regular event for regular people"},1]
    ])
    const [id,setId] = useState(2)
    const addEvent = (e) => {setEvents([...events,[e,id]]);setId(id+1)}
    function editEvent(e,id){
        const events2 = events
        for (let i = 0; i < events2.length; i++) {
            if(events2[i][1]==id){
                events2[i][0]=e
            }
        }
        setEvents([...events2])
    }

    function deleteEvent(eventDeletedId) {
        const newEventList = events?.filter((eve) => {
            return eve[1] != eventDeletedId
        })
        setEvents([...newEventList])
    }
    const findEvent = (givenId) => events.filter((eve) => eve[1] == givenId)

    const YYYY_MM_DD_To_DD_MM_YYYY = (str) => str.split("-").reverse().join("-")

    return { events, addEvent, deleteEvent, YYYY_MM_DD_To_DD_MM_YYYY, findEvent , editEvent}
}



export default DataContext;