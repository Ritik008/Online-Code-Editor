import React from "react"
import {Switch, Route} from "react-router-dom"
import Signup from "./Signup"
import Login from "./Login"
import Practice from "./Practice"
import Logout from "./Logout"

const Routes = () => {
    return (
            <Switch>
                <Route path="/" component={Practice} exact={true}/>
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
            </Switch>
    )
}

export default Routes