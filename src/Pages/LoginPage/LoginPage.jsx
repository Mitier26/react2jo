import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import '../LoginPage/Login_Page.css';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebase';

const LoginPage = ({ setLoginTrue }) => {
    let Auth = getAuth(app);
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState('');
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const navigate = useNavigate();

    const LoginCheck = async (data) => {
        try {
            setLoading(true);
            await signInWithEmailAndPassword(Auth, data.email, data.password);
            setLoginTrue(true);
            alert('로그인 되었습니다.');
            navigate('/');
        } catch (error) {
            console.error(error);
            setErrorMessages(error.message);
            setTimeout(() => {
                setErrorMessages('');
            }, 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="LoginForm" onSubmit={handleSubmit(LoginCheck)}>
            <Row className="LoginContainer">
                <h1>로그인</h1>
                <div className="inputContainer">
                    <label className="labelBox" htmlFor="email">
                        이메일
                    </label>
                    <input
                        className="inputBox"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="이메일을 입력해주세요."
                        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    ></input>
                    {errors.email && <p className="warningText">이메일을 입력해주세요.</p>}
                </div>
                <div className="inputContainer">
                    <label className="labelBox" htmlFor="password">
                        비밀번호
                    </label>
                    <input
                        className="inputBox"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="비밀번호를 입력해주세요."
                        {...register('password', { required: true, minLength: 6 })}
                    ></input>
                    {errors.password && <p className="warningText">비밀번호를 잘못입력하셨습니다.</p>}
                    {errors.minLength < 6 && <p className="warningText">비밀번호는 최소 6자리 이상 입력해주세요.</p>}
                </div>
                {errorMessages && <p className="errorText">{errorMessages}</p>}
                <div className="LoginBtnContainer">
                    <button className="LoginBtn">{loading ? 'Loading' : '로그인'}</button>
                </div>
                <Link to={'/auth/register'} className="NoIdText">
                    회원가입 하러가기
                </Link>
            </Row>
        </form>
    );
};

export default LoginPage;
