import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Avatar } from 'antd';
import profilePic from './fpic.png';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { db, auth } from "../../fireBaseconfig";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const WrappedStype = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f0f0f0; /* grey background */
    min-height: 100vh;
    padding: 32px 0;
    border-right: 1px solid #d9d9d9;

    .avatar {
        margin-bottom: 12px;
    }
    .username {
        margin-bottom: 24px;
        color: #222;
        font-weight: 500;
    }
    .signout-btn {
        border-radius: 5px;
        width: 120px;
        margin-top: 16px;
    }
    .signout-btn:hover {
        transform: translateY(-2px);
        background-color: rgb(241, 241, 241);
    }
`

function SideBar() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const fetchUserName = async () => {
            const user = auth.currentUser;
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    setUserName(userDoc.data().name);
                }
            }
        };
        fetchUserName();
    }, []);


    async function handleSignOut() {
        Swal.fire({
            title: "Do you really want to sign out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await signOut(auth);
                navigate('/signup');
            }
        })
    }
    return (
        <WrappedStype>
            <Avatar src={profilePic}></Avatar>
            <Typography.Text className='username'>{userName ? userName : "Anonymous"}</Typography.Text>
            <Button className="signout-btn" onClick={handleSignOut}>Sign out</Button>
        </WrappedStype >
    )
}
export default SideBar;