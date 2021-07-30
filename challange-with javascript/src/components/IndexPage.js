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
        maxWidth:'75%',
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
            {stolenBikesSearch.slice(pagesVisited, pagesVisited + bikesPerPage).map((e) => {
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
                                    <Grid item xs style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Grid >
                                            <Typography gutterBottom variant="subtitle1" style={{ color: 'blue', fontWeight: 'bold' }}>
                                                {e.title}
                                            </Typography>
                                        </Grid>
                                        <Grid style={{ display: 'flex', alignItems: 'center',justifyContent:'space-around' }}>
                                            <Typography variant="body2" gutterBottom style={{opacity:'0.5'}}>
                                                {e.description}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item style={{display:'flex', flexDirection:'column', justifyContent:'space-around',alignItems:'center'}}>
                                        <Grid style={{ display: 'flex', alignItems: 'row' }}>
                                            <Typography variant="body2" color="textPrimary" style={{ fontWeight: 'bold' }}>
                                                Date Stolen:
                                            </Typography>
                                            <Typography variant="body2" color="textPrimary">
                                                {`${new Date(e.date_stolen * 1000).getDate()}/${new Date(e.date_stolen * 1000).getMonth()}/${new Date(e.date_stolen * 1000).getFullYear()}`}
                                            </Typography>
                                        </Grid>
                                        <Grid style={{ display: 'flex', alignItems: 'row' }}>
                                            <Typography variant="body2" style={{ color: 'red', fontWeight: 'bold' }}>
                                                Stolen Location:
                                            </Typography>
                                            <Typography variant="body2" >
                                                {e.stolen_location}
                                            </Typography>
                                        </Grid>
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
            />
        </div>
    );
}