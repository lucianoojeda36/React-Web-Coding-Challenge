import axios from "axios";
import {DataState, DataType} from '../../interfaces/DataType'
export const GET_STOLEN_BIKE = "GET_STOLEN_BIKE";
export const GET_ERROR_STOLEN_BIKE = "GET_ERROR_STOLEN_BIKE";
export const GET_IS_LOADING_STOLEN_BIKE = "GET_IS_LOADING_STOLEN_BIKE";





export const findStolenBike= (props:DataState) => {

  return (dispatch : any) => {
    axios.get(`https://bikeindex.org/api/v2/bikes_search`)
    .then((res) => {
      dispatch({ type: GET_IS_LOADING_STOLEN_BIKE, payload: true })
      const expresionSearchBike = new RegExp(`${props.searchBike}.*`, "i");
    
      const expresionStartDate = `${Date.parse(props.startDate)/1000}`
      const expresionEndDate = `${Date.parse(props.endDate)/1000}`
      
      const _to_date_stolen = res.data.bikes.filter((e : any)=>e.date_stolen > expresionStartDate && e.date_stolen < expresionEndDate)
      const _to_search_bike = res.data.bikes.filter((e : any)=>expresionSearchBike.test(e.title))
      
      if (props.searchBike && props.searchBike !=="" && !props.startDate && !props.endDate) {
        let result = _to_search_bike
        dispatch({ type: GET_STOLEN_BIKE, payload: result })
      }
      else if (!props.searchBike){
        let result = _to_date_stolen 
        dispatch({ type: GET_STOLEN_BIKE, payload: result })
      }
      else if (props.searchBike && props.searchBike !=="" && props.startDate && props.startDate !=="" && props.endDate && props.endDate !==""){
        let result = _to_date_stolen.filter((e : any)=>expresionSearchBike.test(e.title))
        dispatch({ type: GET_STOLEN_BIKE, payload: result })
      }
      else{
        dispatch({ type: GET_STOLEN_BIKE, payload:res.data.bikes })
      }
      
      })
    .catch((error)=>{ 
      console.log(error)
      dispatch({ type: GET_ERROR_STOLEN_BIKE, payload: true })
    })
    .finally(()=>{
      dispatch({ type: GET_IS_LOADING_STOLEN_BIKE, payload: false })
    })
  }
}



