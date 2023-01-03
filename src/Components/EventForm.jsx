import { useContext } from "react";
import { useForm } from "react-hook-form";
import { eventConext } from "../App";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function EventForm(){
    const navigate = useNavigate();
    const params = useParams()
    const {events,addEvent,findEvent,deleteEvent, editEvent} = useContext(eventConext)
    let EventSelected = {title:'',startDate:'2023-05-05',endDate:'2023-05-05',description:''}
    
    if(params.id!==undefined){
        EventSelected =findEvent(params?.id)[0][0]
    }
    
    const { register, handleSubmit, formState: { errors }, watch} = useForm({
        defaultValues:{
            title: EventSelected['title'],
            startDate: EventSelected['startDate'],
            endDate: EventSelected['endDate'],
            description: EventSelected['description']
        }});

    // const title = watch('title', params.id )
    const startDate =watch('startDate', '2023-05-05')
    const endDate =watch('endDate', '2023-05-05')

    const onSubmit = data => {
        params.id!==undefined?editEvent(data,params.id):addEvent(data)

        navigate('/')
    }
    function dateInStrToNumberArr(strDate){
        const dateInArr = []
        let sum=0
        let j=0
        for (let i = 0; i < strDate.length; i++) {
            if(strDate.charAt(i)==='-'){
                dateInArr[j]=sum
                sum=0
                j++
            }
            else{
                let digit=strDate.charAt(i)-0 
                sum*=10
                sum+=digit
            }   
        }
        dateInArr[j]=sum
        return dateInArr
    }

    function dateInPast(givenDate){
        const date = new Date();
        const todayInNumberArr = [date.getFullYear(),date.getMonth()+1,date.getDate()];
        const givenDateInNumberArr = dateInStrToNumberArr(Object.values(givenDate)[0])
        let answer = true
        for (let i = 0; i < 3; i++) {
            if(todayInNumberArr[i]<givenDateInNumberArr[i])
            {
                answer=false
                break
            }
            
        }
        return answer
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="Input">
                <label>Event Name:</label>
                <input {...register("title", { required: " This field is required", maxLength: {value: 20, message: "Too long"} })} />
                {errors.title && <span>{errors.title.message}</span>}
            </div>

            <div className="Input">
                <label>Start Date:</label>
                <input type="date" {...register("startDate", {required: " This field is required "})}/>
                {errors.startDate && <span>{errors.startDate.message}</span>}
                {(dateInPast({startDate}))&&<span>Date selected is not availabe</span>}

            </div>

            <div className="Input">
                <label>End Date:</label>
                <input type="date" {...register("endDate", {required: " This field is required "})}/>
                {errors.endDate && <span>{errors.endDate.message}</span>}
                {(dateInPast({endDate}))&&<span>Date selected is not availabe</span>}
                {endDate<startDate&&<span>Start and End dates are not matching</span>}
            </div>

            <div className="Input">
                <label>Description:</label>
                <input {...register("description",{ required: " This field is required"})} />
                {errors.description && <span>{errors.description.message}</span>}
            </div>

            <input type="submit" />
            
        </form>
    );
}

export default EventForm;