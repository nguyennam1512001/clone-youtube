import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

function HomePage({}) {
    return <div>HomePage</div>;
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
