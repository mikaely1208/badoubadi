import { initializeApp } from "firebase/app";
import firebaseConfig from './config.js';
import logo from './logo.svg';
import './App.css';
import {useAuthState} from 'react-firebase-hooks/auth';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, updateCurrentUser } from "firebase/auth";


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
        <header>
          <h1>
            chatoubadi <img src={logo} alt="logo"/>
          </h1>
          <LogOut />
        </header>
        <section>
          {user ?
            <Chatroom /> : <Login />
          }
        </section>
    </div>
  );
}

const Login = () => {

  const Login_Google = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider);
    
  }
  return (
    <>
    <button onClick={Login_Google}>Login</button>
    </>
  )
}

const LogOut = () => {
  const LogOut_Google = () => {
    signOut(auth)
  }
    return (
      auth.currentUser && 
      <>
        <button onClick={LogOut_Google}>Disconnect</button>
      </>
      )
  }

const Chatroom = () => {
  return (
    <>
    <main class="chatroom">
        <Message message='My first message' />
    </main>

    <form>
      <input type='text' placeholder='Write some...'/>
      <button type="submit">Send</button>
    </form>
    </>
  )
}

function Message (props) {
  return (
    <>
      <div>
        <img alt='message' src="https://avatars.dicebear.com/4.5/api/human/reyact-chat.svg?w=96&h=96"/>
          <p> 
            {props.message}
         </p>
      </div>
    </>
  )
}


export default App;