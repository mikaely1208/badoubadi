import { initializeApp } from "firebase/app";
import firebaseConfig from './config.js';
import logo from './logo.svg';
import './App.css';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, updateCurrentUser } from "firebase/auth";
import {collection, getFirestore, orderBy, query} from 'firebase/firestore'


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

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

 const msgCollection = collection(firestore, 'message') 
 const q = query(msgCollection, orderBy('timestamp'))

 const [message] = useCollectionData(q)

 

  return (
    <>
    <main className="chatroom">
    <ol>
  
      {message &&

      message.map((msg) => (
        <li>
          <Message key = {msg.id} message={msg}/>
        </li>))}
    </ol>
        

        
    </main>
    
    

    <form>
      <input type='text' placeholder='Write some...'/>
      <button type="submit">Send</button>
    </form>
    </>
  )
}

function Message (props) {
const {text, avatar, userID} = props.message;
const msgClass = userID === auth.currentUser.uid ? "message--sent" : "message--received";

  return (
    <>
      <div className={`message ${msgClass}`} >
        <img alt='Avatar' src={avatar || "https://avatars.dicebear.com/4.5/api/human/reyact-chat.svg?w=96&h=96"}/>
          <p> 
            {props.message.text}
         </p>
      </div>
    </>
  )
}


export default App;