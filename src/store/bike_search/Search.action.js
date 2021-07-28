import axios from "axios";
export const GET_STOLEN_BIKE = "GET_STOLEN_BIKE";




export const findStolenBike = (props) => {

  return (dispatch) => {
    axios.get(`https://bikeindex.org/api/v2/bikes_search`)
    .then((res) => {
      const expresionSearchBike = new RegExp(`${props.searchBike}.*`, "i");
    
      const expresionStartDate = `${Date.parse(props.startDate)/1000}`
      const expresionEndDate = `${Date.parse(props.endDate)/1000}`
      
      const _to_date_stolen = res.data.bikes.filter((e)=>e.date_stolen > expresionStartDate && e.date_stolen < expresionEndDate)
      const _to_search_bike = res.data.bikes.filter((e)=>expresionSearchBike.test(e.title))
      
      if (props.searchBike && props.SearchBike !=="" && !props.startDate && !props.endDate) {
        let result = _to_search_bike
        console.log("=============>existe solo el nombre",result)
        dispatch({ type: GET_STOLEN_BIKE, payload: result })
      }
      else if (!props.searchBike){
        let result = _to_date_stolen 
        console.log("=============>existe solo la fecha",result)
        dispatch({ type: GET_STOLEN_BIKE, payload: result })
      }
      else if (props.searchBike && props.SearchBike !=="" && props.startDate && props.startDate !=="" && props.endDate && props.endDate !==""){
        let result = _to_date_stolen.filter((e)=>expresionSearchBike.test(e.title))
        console.log("=============>existe el nombre y la fecha",result)
        dispatch({ type: GET_STOLEN_BIKE, payload: result })
      }
      else{
        console.log("esta berga es una chota")
        dispatch({ type: GET_STOLEN_BIKE, payload:res.data.bikes })
      }
      
      })
    .catch((error)=>{ console.log(error)})
  }
}



