import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { GoogleLogin } from 'react-google-login';

import './Login.module.scss';
import * as actions from '~/store/actions';

function Login() {
    const handleLoginSuccess = (response) => {
        const accessToken = response.accessToken;
        console.log('Access token:', accessToken);
    };

    const handleLoginFailure = (error) => {
        console.error('Login failed:', error);
    };

    return (
        <div>
            <h2>Đăng nhập với Google</h2>
            <GoogleLogin
                clientId="902006562581-99kf6ddm60h9p7utap0r4kaknn7evmov.apps.googleusercontent.com"
                buttonText="Đăng nhập"
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        lang: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
