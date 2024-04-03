import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import clockImg from "../../assets/img/clock.png";
import {useParams} from "react-router-dom";
import axios from "axios";

const TimeCheckForm = () => {
    const navigate = useNavigate();
    const {id} = useParams(); // 로그인한 아이디의 인덱스 (No)
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    // 로그인한 직원의 출퇴근시간 조회
    const getUserTime = () => {
        axios.get(`http://localhost:8080/timeCheck/${id}`)
            .then(response => {
                //console.log(response);
                if(!(response.status > 200 && response.status < 300)) {
                    setStartTime(response.data.startTime);
                    setEndTime(response.data.endTime);
                } else {
                    navigate(`/`);
                    alert("오류가 발생했습니다.");

                }
            })
            .catch(error => {
                navigate(`/`);
                alert("오류가 발생했습니다.");
            });
    }

    const timeCheckBtnClick = () => {
        let confirmMsg = "";
        if(startTime == null) {
            confirmMsg = "출근하시겠습니까?";
        } else if(endTime == null) {
            confirmMsg = "퇴근하시겠습니까?";
        } else {
            alert("이미 퇴근 처리되었습니다.");
            return;
        }

        const confirm = window.confirm(confirmMsg);
        if(confirm) {
            axios.post(`http://192.168.0.11:8080/timeCheck/${id}`)
                .then(response => {
                    console.log("response: " + response);
                    if(!(response.status > 200 && response.status < 300)) {
                        alert(response.data);
                    } else {
                        alert("오류 발생");
                    }
                })
                .catch(error => {
                    alert("출근 요청 중 오류가 발생했습니다.");
                });
            window.location.reload();
        }
    };

    useEffect(() => {
        getUserTime();
    }, []);

    return (
        <>
            <div className={'mainDiv'}>
                <div className={'subDiv centerLine'}>
                    <div className={'textDiv'}>
                        <img src={clockImg} alt={'시계이미지'}/>
                        <span>출근시간</span>
                    </div>
                    <div className={'timeDiv'}>
                        <span>{startTime == null ? `00/00/00` : startTime.substring('0','10')}</span>
                        <span className={'timeSpan'}>{ startTime == null ? `00:00:00` : startTime.substring('11', startTime.lastIndexOf("."))}</span>
                    </div>
                </div>
                <div className={'subDiv'}>
                    <div className={'textDiv'}>
                        <img src={clockImg} alt={'시계이미지'}/>
                        <span>퇴근시간</span>
                    </div>
                    <div className={'timeDiv'}>
                        <span>{endTime == null ? `00/00/00` : endTime.substring('0','10')}</span>
                        <span className={'timeSpan'}>{endTime == null ? `00:00:00` : endTime.substring('11', startTime.lastIndexOf("."))}</span>
                    </div>
                </div>
            </div>
            <div className={'buttonDiv'}>
                <button className={'btn'} onClick={timeCheckBtnClick}><span className={'btn-text'}>출근(퇴근)</span></button>
            </div>
        </>
    )
}

export default TimeCheckForm;

