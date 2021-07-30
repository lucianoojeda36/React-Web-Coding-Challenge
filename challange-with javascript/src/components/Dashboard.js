import React from 'react'
import { useSelector } from 'react-redux'
import IndexPage from './IndexPage'



export default function Dasboard() {

    const stolenBikesSearch = useSelector((state) => state?.stolen_bikes)
    const error = useSelector((state) => state?.error_message)
    const isLoading = useSelector((state) => state?.isLoading)


    if (isLoading) {
        return <h1>Loading...</h1>
    }
    else if (error) {
        return <h1 style={{color:'red'}}>Ooops Something went wrong</h1>
    }
    else if (!stolenBikesSearch?.length) {
        return <h1>No results</h1>
    }
    else {
        return (<div>
            <IndexPage />
        </div>)
    }

}