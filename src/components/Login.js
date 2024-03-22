import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { app } from "../firebase/firebase";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { firestore } from '../firebase/firebase';

const Login = () => {

    const [loggedInUser, setLoggedInUser] = useState({});
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [loginMessage, setLoginMessage] = useState('');
    const [messageStyle, setMessageStyle] = useState('text-brown bg-lightblue');
    const [messageStyle2, setMessageStyle2] = useState('text-blue');
    const navigate = useNavigate();

    const handleLogin = (evt) => {
        setLoginData({ ...loginData, [evt.target.name]: evt.target.value });
    };
    const submitLogin = (evt) => {
        evt.preventDefault();
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, loginData.email, loginData.password)
            .then((resp) => {
                console.log(resp);
                console.log(auth.currentUser);
                const userRef = collection(firestore, 'users');
                const q = query(userRef, where('uid', '==', auth.currentUser.uid));
                getDocs(q)
                    .then((resp) => {
                        console.log(resp);
                        setLoggedInUser(resp.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        })));
                        console.log(loggedInUser);
                        navigate(`/home/${loggedInUser.email}`);
                    });
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '85vh', backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQITSx7lylxpBTbPk-xtNRiCCXc3DfGZA0t3w&s")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="bg-lightyellow border p-4">
                <h1 className={messageStyle}>Login Component</h1>
                <form onSubmit={submitLogin}>
                    <input className="form-control mb-2" type="email" name="email" placeholder="Enter Email" value={loginData.email} onChange={handleLogin} />
                    <input className="form-control mb-2" type="password" name="password" placeholder="Enter Password" value={loginData.password} onChange={handleLogin} />
                    <button className="btn btn-primary" type="submit">Login</button>
                </form>
                {loginMessage && <p className={messageStyle2}>{loginMessage}</p>}
            </div>
        </div>
    );
}


export default Login;

