import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AppLayout from './Layout/AppLayout';
import MainPage from './Pages/MainPage/MainPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import MyPage from './Pages/MyPage/MyPage';
import FestivalPage from './Pages/FestivalPage/FestivalPage';
import FestivalDetailPage from './Pages/FestivalDetailPage/FestivalDetailPage';
import CampingPage from './Pages/CampingPage/CampingPage';
import CampingDetailPage from './Pages/CampingDetailPage/CampingDetailPage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import SearchedPage from './Pages/SearchedPage/SearchedPage';
import app from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { userSlice, clearUser } from './reducers/userSlice';
import Bottom from './Layout/Bottom';

function App() {
    const [isLogged, setIsLogged] = useState(false);
    const [LoginTrue, setLoginTrue] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const appAuth = getAuth(app); // firebase auth 인증서

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(appAuth, (user) => {
            if (user) {
                //userSlice Update 현재 유저로 상태 업데이트
                dispatch(
                    userSlice.actions.setUser({
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    })
                );
                setIsLogged(true);
            } else {
                dispatch(clearUser());
                setIsLogged(false);
            }
        });
        return () => {
            unsubscribe(); // 인증해제
        };
    }, [appAuth]);

    return (
        <>
            <Routes>
                <Route path="/" element={<AppLayout isLogged={isLogged} />}>
                    <Route index element={<MainPage />} />
                    <Route path="auth">
                        <Route path="login" element={<LoginPage setLoginTrue={setLoginTrue} />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route path="myPage" element={<MyPage />} />
                    </Route>
                    <Route path="camping">
                        <Route index element={<CampingPage />} />
                        <Route path=":id" element={<CampingDetailPage />} />
                    </Route>
                    <Route path="festival">
                        <Route index element={<FestivalPage />} />
                        <Route path=":id" element={<FestivalDetailPage />} />
                    </Route>
                    <Route path="search" element={<SearchedPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Bottom />
        </>
    );
}

export default App;
