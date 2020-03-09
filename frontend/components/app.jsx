import React from "react";
import Navbar from "./navbar/navbar_container";
import SignupFormContainer from "./session_form/signup_form_container";
import LoginFormContainer from "./session_form/login_form_container";
import { Switch, Route } from "react-router-dom";
import { AuthRoute } from '../util/route_util'
import ModalContainer from "./modal/modal_container";
import SongShowContainer from "./songs/song_show_container";
import SongIndexContainer from "./songs/song_index_container";
import TestContainer from "./dev_test/testing_temp";
import UserShowContainer from "./users/user_show_container";

const App = () => (
    <div>
        <ModalContainer />
        <header>
            <Navbar />
            <TestContainer/>
            <Route exact path="/users/:userId" component={UserShowContainer} />
            <Route exact path="/songs/:songId" component={SongShowContainer} />
            <Route exact path="/songs" component={SongIndexContainer} />
        </header>
    </div>
);

export default App;