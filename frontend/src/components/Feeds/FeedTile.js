import React, {useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import {Box, Rating} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import Swal from "sweetalert2";
import axios from "axios";
import {useHistory} from "react-router-dom";

const labels = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
};
const FeedTile =(props) => {
    const history = useHistory();
    const [value, setValue] = useState(0);
    const [hover, setHover] = useState(-1);
    const [feedback, setFeedBack] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(()=>{
        setFeedBack(props.feedback);
        setValue(props.rating);
    },[props.feedback, props.rating])

    useEffect(()=> {
        if(null == user || !user) {
            history.push('/');
        }
    },[]);

    const submitPost = () => {
        if(!user) {
            history.push('/');
        }
        if(value === 0 || feedback === '') {
            Swal.fire('Kindly give rating and Feedback!', '', 'error');
            return;
        }
        const feedBack = {
            name:props.text,
            rating:value,
            feedback:feedback,
            userId: user.id
        }
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        axios.post('http://localhost:5000/api/feeds/'+feedBack.name, feedBack, config).then( resp => {
          //  Swal.fire('Saved!', '', 'success');
            if(props.client) {
                props.client.send(JSON.stringify({
                    type: "message",
                    msg: `${user.name} has given ${labels[value]} rating for ${feedBack.name} and Feedback: ${feedBack.feedback}`
                }));
            }
        }).catch(err => {
                //console.log(err);
            Swal.fire('Error occurred!', '', 'error');
            });
    }

    return(
        <>
            <Card className={"mb-4"} onClick={props.func} style={{cursor:'pointer',width:'23rem'}}>
                <Card.Header className="text-center">
                    <span className="h4">{props.text}</span>
                </Card.Header>
                <Card.Body>
                    <img src={props.imgPath} alt={"img"} className="img-fluid"/>
                    <div className="container pt-3">
                        <Box
                            sx={{
                                width: 200,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Rating
                                name="hover-feedback"
                                value={value}
                                precision={1}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                }}
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />
                            {value !== null && (
                                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                            )}
                        </Box>
                    </div>
                    <div className="container-fluid">
                        <textarea type="text" rows="4" cols="30" id="prescriptionText" value={feedback}
                                  onChange={(event)=>{setFeedBack(event.target.value)}}/>
                    </div>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-center">
                    <button className="btn btn-lg btn-primary w-100" onClick={submitPost}>Post</button>
                </Card.Footer>
            </Card>
        </>
    )
}
export default FeedTile;