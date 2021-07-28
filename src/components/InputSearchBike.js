import React, {useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { findStolenBike } from "../store/bike_search/Search.action";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));




export default function InputSearchBike() {

    const dispatch = useDispatch()

    // const [startDate, setStartDate] = useState(new Date());
    // const [state, setState] = useState({
    //     search_case_description: '',
    //     startDate: '',
    //     endDate: '',

    // })

    const [ searchBike, setSeacrchBike] = useState('')
    const [startDate,setStartDate] = useState('')
    const [endDate,setEndDate] =  useState('')


    const state ={
        searchBike,
        startDate,
        endDate
    }


    // console.log("==========>",searchBike)
    // console.log("==========>",startDate)
    // console.log("==========>",endDate)

    const classes = useStyles();


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('hola')
        dispatch(findStolenBike(state))
        // event.target.reset();
    };

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
                id="standard-secondary"
                value={searchBike}
                label="Search Case Description"
                variant="outlined"
                color="secondary"
                onChange={(e) => setSeacrchBike(e.target.value)}
            />
            <TextField
                id="datetime-start"
                value={startDate}
                label="From"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <TextField
                id="datetime-end"
                label="To"
                value={endDate}
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e) => setEndDate( e.target.value)}
            />
            <Button variant="contained" color="primary" type="submit">
                Find Cases
            </Button>
        </form>
    );
}