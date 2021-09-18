import React, {useEffect} from "react";
import Tile from "../Tile/Tile";
import {useHistory} from "react-router-dom";
import blockChain from '../../assets/blockChain.jpg';
import Feed from '../../assets/feed.png';
import MultiStep from '../../assets/multiStep.jpg';

const Home = () => {

    const history = useHistory();

    const onViewMultiStepFormClick =  () => {
        history.push('/MultiStepForm');
    }

    const onViewFeedsClick =  () => {
        history.push('/Feeds', );
    }

    const onViewBlockChainClick =  () => {
        history.push('/BlockChain');
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-4 d-flex justify-content-center">
                    <Tile imgPath={MultiStep} text={"View MultiStepForm"} func={onViewMultiStepFormClick}/>
                </div>
                <div className="col-lg-4 d-flex justify-content-center">
                    <Tile imgPath={Feed} text={"View Feeds"} func={onViewFeedsClick}/>
                </div>
                <div className="col-lg-4 d-flex justify-content-center">
                    <Tile imgPath={blockChain} text={"View BlockChain"} func={onViewBlockChainClick}/>
                </div>
            </div>
        </div>
    );
}

export default Home;