import React from "react";
import {injectReducer} from '.';
import {ReactReduxContext} from "react-redux";

const withReducer = (key, reducer) => WrappedComponent =>
    class extends React.PureComponent {
        constructor(props)
        {
            super(props);
            injectReducer(key, reducer);
        };

        render()
        {  console.log("the props ",this.props);
            return (
                <ReactReduxContext.Consumer>
                    {({store, storeState}) => {
                        return storeState[key] ? <WrappedComponent {...this.props} /> : null;
                    }}
                </ReactReduxContext.Consumer>
            );
        };
    };

export default withReducer;
