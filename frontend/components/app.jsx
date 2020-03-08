import React from "react";
import GreetingContainer from "./navbar/navbar_container";
import SignupFormContainer from "./session_form/signup_form_container";
import LoginFormContainer from "./session_form/login_form_container";
import { Switch, Route } from "react-router-dom";
import { AuthRoute } from '../util/route_util'
import ModalContainer from "./modal/modal_container";
import SongShowContainer from "./songs/song_show_container";
import SongIndexContainer from "./songs/song_index_container";

const App = () => (
    <div>
        <ModalContainer />
        <header>
            <GreetingContainer />
            <Route exact path="/songs/:songId" component={SongShowContainer} />
            <Route exact path="/songs" component={SongIndexContainer} />
        </header>
    </div>
);

export default App;