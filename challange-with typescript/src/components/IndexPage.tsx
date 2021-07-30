import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useSelector } from "react-redux";
import ReactPaginate from 'react-paginate';
import './IndexPage.css'
import imagenBicicleta from '../assets/illustration.png'    

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

export default function IndexPage(): any{
    const classes = useStyles();

    const stolenBikesSearch : any[] = useSelector((state : any) => state?.stolen_bikes)

    const [pageNumber, setPageNumber] = useState(0);

    const bikesPerPage : number = 10;
    const pagesVisited : number = pageNumber * bikesPerPage;


    const pageCount : number = Math.ceil(stolenBikesSearch.length / bikesPerPage);

    const changePage : any = ({ selected } : any) => {
        setPageNumber(selected);
    };



    return (
        <div className={classes.root}>
            {stolenBikesSearch.slice(pagesVisited, pagesVisited + bikesPerPage).map((e : any) => {
                return (
                    <Paper className={classes.paper} key={e.id}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase className={classes.image}>
                                    <img className={classes.img} alt="complex" src={e.large_img ? e.large_img : imagenBicicleta} />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="row" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1">
                                            Title: {e.title}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Description: {e.description}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                    <Typography variant="body2" color="textSecondary">
                                        Date Stolen: {`${new Date(e.date_stolen*1000).getDate()}/${new Date(e.date_stolen*1000).getMonth()}/${new Date(e.date_stolen*1000).getFullYear()}`}
                                        </Typography>
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
                pageRangeDisplayed={10}
                marginPagesDisplayed={10}
            />
        </div>
    );
}