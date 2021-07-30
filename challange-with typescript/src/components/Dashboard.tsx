import React from 'react'
import { useSelector } from 'react-redux'
import { DataType } from '../interfaces/DataType'
import IndexPage from './IndexPage'



export default function Dashboard() {

    const stolenBikesSearch: DataType[] = useSelector((state : any) => state?.stolen_bikes)
    const error : Boolean = useSelector((state : any) => state?.error_message)
    const isLoading : Boolean = useSelector((state: any) => state?.isLoading)


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