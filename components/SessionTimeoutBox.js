import MessageBox from "./MessageBox"
import AppContext from "./AppContext"
const SessionTimeoutBox = () => {
    return (
        <AppContext.Consumer>
            {value => <MessageBox message="session out, please login" onclickEvent={value}/>}
        </AppContext.Consumer>
    )
}

export default SessionTimeoutBox