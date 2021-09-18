import React, {useEffect, useState} from "react";
import china from "../../assets/china.jpg";
import egypt from "../../assets/egypt.jpg";
import canada from "../../assets/canada.jpg";
import FeedTile from "./FeedTile";
import axios from "axios";
import {useHistory} from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Swal from "sweetalert2";

const Feeds = () => {
    const history = useHistory();
    const client = new W3CWebSocket('ws://localhost:8001');
    const [feeds,setFeeds] = useState([
        {
            "imgPath": canada,
            "text": "Canada",
            "rating": 0,
            "feedback": ''
        },
        {
            "imgPath": egypt,
            "text": "Egypt",
            "rating": 0,
            "feedback": ''
        },
        {
            "imgPath": china,
            "text": "China",
            "rating": 0,
            "feedback": ''
        }
    ]);

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        if(null == user || !user) {
            history.push('/');
        }
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        axios.get(`http://localhost:5000/api/feeds/${user.id}`,config).then(resp => {
            let userFeeds = resp.data;
            let updatedFeeds = [];
            feeds.map(feed => {
                let updatedFeed = {...feed};
                const foundFeed = userFeeds.filter(fd => fd.name === feed.text)[0];
                if(foundFeed) {
                    updatedFeed.rating = foundFeed.rating;
                    updatedFeed.feedback = foundFeed.feedback;
                }
                updatedFeeds.push(updatedFeed);
            });
            setFeeds(updatedFeeds);
        }).catch(err => {
        });
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            if (dataFromServer.type === "message") {
                Swal.fire({
                    title: 'Update!',
                    text: dataFromServer.msg,
                    icon: 'info',
                });
            }
        };
    },[]);
    return (
        <div className="container mt-5">
            <div className="row">
                {
                    feeds ? feeds.map(feed => (
                        <div className="col-lg-4 d-flex justify-content-center" key={feed.text}>
                            <FeedTile imgPath={feed.imgPath} text={feed.text} rating={feed.rating} feedback={feed.feedback} client ={client}/>
                        </div>
                    )) : ''
                }
            </div>
        </div>
    );
}
export default Feeds;