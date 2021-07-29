import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { findStolenBike } from "../store/bike_search/Search.action";
import { CardMedia, Paper } from "@material-ui/core";

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
    const [searchBike, setSeacrchBike] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')


    const state = {
        searchBike,
        startDate,
        endDate
    }

    const classes = useStyles();


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('hola')
        dispatch(findStolenBike(state))
    };

    return (
        <Grid>
            <Grid style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Grid >
                    <Paper variant="outlined" >
                        <img style={{ width: '150px', height: '150px' }} src='https://superol3g.github.io/coding-challenge-frontend-react/static/media/logo.aba6572d.svg' />
                    </Paper>
                </Grid>
                <Grid>
                    <h1>Police Department of Berlin</h1>
                    <h4>Stolen bykes</h4>
                </Grid>
            </Grid>
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
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <Button variant="contained" color="primary" type="submit">
                    Find Cases
                </Button>
            </form>
        </Grid>
    );
}