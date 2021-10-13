import React, { useState, useEffect } from 'react'
import axios from 'axios'

function DashboardPage() {
    const apiKey = "563492ad6f91700001000001fb4b588e36424f5db5e96fd30f05c911";
    const uri = "https://api.pexels.com/v1/search?query=singapore&orientation=landscape"

    const [background, setBackground] = useState();
    const config = {
        headers: {
            Authorization: {apiKey},
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }

    useEffect(()=>{
        fetchImage();
    },[])

    const fetchImage = async () => {
        try{
            let res = await fetch(uri, 
                {
                    method: 'GET',
                    headers: {
                        Authorization: "563492ad6f91700001000001fb4b588e36424f5db5e96fd30f05c911",
                        Accept: 'application/json',
                    },
                })
            res = await res.json();
            let i = Math.floor(Math.random() * 15)
            console.log(res.photos[0].src.landscape)
            await setBackground(res.photos[i].src.landscape)
        }
        catch(err){
            console.log("ERROR", err);
        }
    }
   
    return (
        <div>
            DashboardPage
            <img className="dashboard-background" src={background}/>
            <form>
                Country<input type="text" placeholder="Country"/>
                Start Date<input type="date"/>
                End Date<input type="date"/>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default DashboardPage
