import React from 'react'
import { useSelector } from 'react-redux'
import IndexPage from './IndexPage'




export default function Dasboard (){

    const stolenBikesSearch = useSelector((state) => state?.stolen_bikes)
    const error = useSelector((state) => state?.error_message)
    const isLoading = useSelector((state) => state?.isLoading)
    


    if(isLoading) <h1>Loading...</h1>

    if (error)<h1>Something went wrong</h1>

    if (!stolenBikesSearch?.length)<h1>No results</h1>

    return(
        <div>
            <IndexPage/>
        </div>
    )
}