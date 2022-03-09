import React from 'react'
import ReactLoading from 'react-loading';
import "../App.css"
const Loading = () => {
    return (
        <>
            <ReactLoading className='loading' type={"spinningBubbles"} color={"#3366cc"} height={"50px"} width={'50px'} />
        </>
    )
}

export default Loading
