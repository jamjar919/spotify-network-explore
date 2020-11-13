import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchProfileAction} from "../actions/spotifyProfileAction";
import {State} from "../reducers/rootReducer";

const App = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state: State) => state.spotifyProfile.profile);

    useEffect(() => {
        dispatch(fetchProfileAction());
    }, []);

    return (<div>{JSON.stringify(profile)}</div>);
};

export default App;