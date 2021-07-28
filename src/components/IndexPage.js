import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import InputSearchBike from './InputSearchBike';
import { useSelector } from "react-redux";
import ReactPaginate from 'react-paginate';
import './IndexPage.css'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 1000,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

export default function IndexPage() {
    const classes = useStyles();

    const stolenBikesSearch = useSelector((state) => state?.stolen_bikes)

    const [pageNumber, setPageNumber] = useState(0);

    const bikesPerPage = 10;
    const pagesVisited = pageNumber * bikesPerPage;


    const pageCount = Math.ceil(stolenBikesSearch.length / bikesPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };



    return (
        <div className={classes.root}>
            <InputSearchBike />
            {
                stolenBikesSearch && stolenBikesSearch[0] ?
                    stolenBikesSearch.slice(pagesVisited, pagesVisited + bikesPerPage).map((e) => {
                        return (
                            <Paper className={classes.paper} key={e.id}>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <ButtonBase className={classes.image}>
                                            <img className={classes.img} alt="complex" src={e.large_img} />
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Typography gutterBottom variant="subtitle1">
                                                    Model: {e.title}
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    Description: {e.description}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Stolen: {e.date_stolen}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                                    Stolen Location: {e.stolen_location}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        )
                    })
                    : <h1>No Results</h1>
            }


            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
        </div>
    );
}