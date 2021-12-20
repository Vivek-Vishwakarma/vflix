import { Pagination } from '@mui/material'
import React from 'react'
import "../App.css"
const Page = ({ total , setPage }) => {
    const handleChange = (page) => {
        setPage(page)
        window.scroll(0,0)
    }
    return (
        <>
        <div className="center">
            <Pagination onChange={(e)=>handleChange(e.target.textContent)} count={total}/>
        </div>
        </>
    )
}

export default Page
