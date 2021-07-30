import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { findStolenBike } from "../store/bike_search/Search.action";
import { Paper } from "@material-ui/core";
import styled from 'styled-components'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: black;
`;
const SubTitle = styled.h4`
  font-size: 1em;
  text-align: center;
  color: black;
`;




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


    const handleSubmit = (event : any) => {
        event.preventDefault();
        dispatch(findStolenBike(state))
    };

    return (
        <Grid>
            <Grid style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Grid >
                    <Paper variant="outlined" >
                        <img alt = 'not found' style={{ width: '150px', height: '150px' }} src='https://superol3g.github.io/coding-challenge-frontend-react/static/media/logo.aba6572d.svg' />
                    </Paper>
                </Grid>
                <Grid>
                    <Title>Police Department of Berlin</Title>
                    <SubTitle>Stolen bykes</SubTitle>
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
                    // className={classes.textField}
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
                    // className={classes.textField}
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