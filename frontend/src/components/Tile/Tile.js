import React from "react";
import {Card} from "react-bootstrap";

const Tile =(props) => {
    return(
        <>
                <Card className={"mb-4"} onClick={props.func} style={{cursor:'pointer',width:'23rem'}}>
                    <Card.Body>
                            <img src={props.imgPath} alt={"img"} className="img-fluid"/>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-center">
                        <span className="h4">{props.text}</span>
                    </Card.Footer>
                </Card>
        </>
    )
}
export default Tile;