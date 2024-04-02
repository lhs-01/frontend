import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');

    const onIdHandler = (event) => {
        setId(event.target.value);
    }

    const onPwdHandler  = (event) => {
        setPwd(event.target.value);
    }

    const loginBtnClick = () => {
        if (id === '') {
            alert('아이디를 입력해주세요.');
            document.getElementById("id").focus();
            return;
        }

        if (pwd === '') {
            alert('비밀번호를 입력해주세요.');
            document.getElementById("pwd").focus();
            return;
        }

        axios.post("http://192.168.0.30:8080/user/login",{
            userId:id,
            userPwd:pwd
        })
            .then(response => {
                if(!(response.status > 200 && response.status < 300)) {
                    navigate(`/timeCheck/${response.data.no}`);
                } else {
                    alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
                                    }
            })
            .catch(error => {
                alert("로그인 요청 중 오류가 발생했습니다.");
            });
    }

    return (
        <>
            <div className={'inputDiv'}>
                <div className={'inputIdDiv'}>
                    <input id={"id"} type={'text'} onChange={onIdHandler} placeholder={'아이디'}/>
                </div>
                <div className={'inputPwfDiv'}>
                    <input id={"pwd"} type={'password'} onChange={onPwdHandler} placeholder={'비밀번호'}/>
                </div>
            </div>
            <div className={'buttonDiv'}>
                <button className={'btn'} onClick={loginBtnClick}><span className={'btn-text'}>로그인</span></button>
            </div>
        </>
    )
}

export default LoginForm;

