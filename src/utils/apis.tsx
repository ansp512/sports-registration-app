import axios from "axios";
import { GetEventsResponse } from "./api-response";

const STATIC_HEADERS ={
    headers: {
        "content-type": "application/json",
    }
}

export const getAllEvents: ()=> Promise<GetEventsResponse | any> =() => {
    return axios
        .get<GetEventsResponse>(
            `http://localhost:8001/api/events/get_all_events`
        )
        .then(r => r)
}

export const registerUser = (userName: string) => 
    axios
        .post(`http://localhost:8000/api/users/create-username/${userName}`, STATIC_HEADERS)
        .then(r=> r)


export const validateUser = (userName: string)=> {
    return axios
        .get<any>(
            `http://localhost:8000/api/users/validate/${userName}`
        )
        .then(r => r)
        }