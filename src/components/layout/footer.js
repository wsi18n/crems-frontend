import React, { Component } from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

class DefaultFooter extends Component {
    render() {
        return (
            <Footer style={{ textAlign: 'center' }}>
                CREMS ©2018 Created by Watone
            </Footer>
        )
    }
}

export default DefaultFooter;

