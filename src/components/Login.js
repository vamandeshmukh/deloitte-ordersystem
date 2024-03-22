import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router"; // Import useNavigate from react-router
import { app } from "../firebase/firebase"; // Import initialized Firebase app
import { collection, getDocs, query, where } from "@firebase/firestore";
import { firestore } from '../firebase/firebase';

const Login = () => {

    const [loggedInUser, setLoggedInUser] = useState({});
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [loginMessage, setLoginMessage] = useState('');
    const [messageStyle, setMessageStyle] = useState('text-brown bg-lightblue');
    const [messageStyle2, setMessageStyle2] = useState('text-blue');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleLogin = (evt) => {
        setLoginData({ ...loginData, [evt.target.name]: evt.target.value });
    };
    const submitLogin = (evt) => {
        evt.preventDefault();

        const auth = getAuth(app);
        // Sign in with email and password
        signInWithEmailAndPassword(auth, loginData.email, loginData.password)
            .then((resp) => {
                console.log(resp);
                setLoggedInUser(resp.user);
                const userRef = collection(firestore, 'users'); // For Firestore
                const q = query(userRef, where('uid', '==', auth.currentUser.uid)); // For Firestore
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



        // try {
        //     const auth = getAuth(app);
        //     // Sign in with email and password
        //     const temp = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
        //     console.log(temp.user.email);
        //     setLoggedInUser(temp.user);

        //     const userRef = collection(firestore, 'users'); // For Firestore
        //     const q = query(userRef, where('uid', '==', auth.currentUser.uid)); // For Firestore
        //     const userSnapshot = await getDocs(q); // For Firestore
        //     console.log(userSnapshot);
        //     const userData = userSnapshot.docs.map((doc) => ({
        //         id: doc.id,
        //         ...doc.data()
        //     })
        //     );

        //     // Display or use the fetched user data
        //     console.log(userData);
        //     // call user data based on username 
        //     // Redirect to home page after successful login
        //     navigate(`/home/${temp.user.email}`);
        // } catch (error) {
        //     console.error('Error logging in:', error.message);
        //     setLoginMessage(error.message);
        //     setMessageStyle('text-red');
        // }
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
// import { useState } from "react";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { useNavigate } from "react-router"; // Import useNavigate from react-router
// import { app } from "../firebase/firebase"; // Import initialized Firebase app

// const Login = () => {
//     const [loginData, setLoginData] = useState({ email: '', password: '' });
//     const [loginMessage, setLoginMessage] = useState('');
//     const [messageStyle, setMessageStyle] = useState('text-brown bg-lightblue');
//     const [messageStyle2, setMessageStyle2] = useState('text-blue');
//     const navigate = useNavigate(); // Initialize useNavigate hook

//     const handleLogin = (evt) => {
//         setLoginData({ ...loginData, [evt.target.name]: evt.target.value });
//     };

//     const submitLogin = async (evt) => {
//         evt.preventDefault();
//         try {
//             const auth = getAuth(app);
//             // Sign in with email and password
//             await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
//             console.log('User logged in successfully');
//             // Redirect to home page after successful login
//             navigate("/home");
//         } catch (error) {
//             console.error('Error logging in:', error.message);
//             setLoginMessage(error.message);
//             setMessageStyle('text-red');
//         }
//     };

//     return (
//         <div className="d-flex justify-content-center align-items-center" style={{ height: '85vh', backgroundImage:'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQITSx7lylxpBTbPk-xtNRiCCXc3DfGZA0t3w&s")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
//             <div className="bg-lightyellow border p-4">
//                 <h1 className={messageStyle}>Login Component</h1>
//                 <form onSubmit={submitLogin}>
//                     <input className="form-control mb-2" type="email" name="email" placeholder="Enter Email" value={loginData.email} onChange={handleLogin} />
//                     <input className="form-control mb-2" type="password" name="password" placeholder="Enter Password" value={loginData.password} onChange={handleLogin} />
//                     <button className="btn btn-primary" type="submit">Login</button>
//                 </form>
//                 {loginMessage && <p className={messageStyle2}>{loginMessage}</p>}
//             </div>
//         </div>
//     );
// }

// export default Login;





