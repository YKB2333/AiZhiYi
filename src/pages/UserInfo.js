/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import withAxios from '../hoc/withAxios';
// import './UserInfo.css';

class UserInfo extends Component {
    constructor(){
        super();
        this.state={
            datalist:[{
                uImg:"https://www.aizhiyi.com/data/upload/shop/avatar/1.png?timestemp=1554122083174",
                telNumber:"",
                nickname:"",
                sex:"",
                birthday:""
            }],
        }
    }
    componentDidMount(){
        let telNumber = localStorage.getItem('telNumber');
        let uImg = localStorage.getItem('uImg');
        let nickname = localStorage.getItem('nickname');
        let sex = localStorage.getItem('sex');
        let birthday = localStorage.getItem('birthday');
;
        this.setState({
            datalist:[{
                uImg:uImg,
                telNumber:telNumber,
                nickname:nickname,
                sex:sex,
                birthday:birthday
            }]
        })
    }
    goBack=()=>{
        this.props.history.goBack();
    }
    render() {
        let {datalist} = this.state;
        return <div>
            <header className="personal_header">
                <div className="header-wrap">
                    <div className="header-l">
                        <a href="javascript:;" onClick={this.goBack}>
                            <i className="back"></i>
                        </a>
                    </div>
                    <div className="header-title">
                        <h1>个人资料</h1>
                    </div>
                </div>
            </header>
            <div className="scroller-body personal_body" id="personal_body">
                <div className="scroller-box" id="scroller-box">
                    <div className="scroller-box" id="scroller-box">
                        <div className="member-center" id="personal_mess">
                            <dl className="mtm">
                                <dt className="mem_pho">
                                    <a href="javascript:;"> </a>
                                    <h3>头像</h3>
                                    <input type="file" className="file_head" name="file_head" id="" style={{ "height": "100%", "left": 0, "zIndex": 50 }}>

                                    </input>
                                    <h5>
                                        <a href="javascript:;"></a>
                                        <div className="person_pho_b">
                                            <a href="javascript:;"></a>
                                            <a href="javascript:;" className="person_pho_box">
                                                <img src={datalist[0].uImg} className="person_pho personal-appen" id="face" />
                                            </a>
                                        </div>
                                    </h5>


                                </dt>
                                <dt className="mem_count">
                                    <a href="javascript:;">
                                        <h3>账号</h3>
                                        <h5><em className="person_count">{datalist[0].telNumber}</em></h5>
                                    </a>
                                </dt>
                                <dt className="nickname">
                                    <a href="javascript:;" id="nickname">
                                        <h3>昵称</h3>
                                        <h5><em className="person_count">{datalist[0].ncikname}</em><i className="arrow-r"></i></h5>
                                    </a>
                                </dt>
                                <dt className="sexbox">
                                    <a href="javascript:;">
                                        <h3>性别</h3>
                                        <h5><em className="person_count">{datalist[0].sex}</em><i className="arrow-r"></i></h5>
                                    </a>
                                </dt>

                                <dt className="birth_day">
                                    <h3>生日</h3>
                                    <h5><em className="person_count ui-alert" id="result">{datalist[0].birthday}</em><i className="arrow-r"></i></h5>

                                </dt>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
UserInfo = withAxios(UserInfo);
export default UserInfo;