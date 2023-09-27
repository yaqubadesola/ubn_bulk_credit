
import React from 'react';
import {LinearProgress, Fade} from '@material-ui/core';

const FuseLoader = (props) => {

    return (
       <Fade
                    in={props.axiosReqUploading}
                    style={{
                    transitionDelay: props.axiosReqUploading ? '800ms' : '0ms',
                    }}
                    unmountOnExit
                        >
                    <LinearProgress variant="query" />
            </Fade>
    );

}

export default FuseLoader;
