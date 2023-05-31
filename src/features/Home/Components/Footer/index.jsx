import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

Footer.propTypes = {
    data: PropTypes.object,
};


Footer.defaultProps = {
    data: {}
};

function Footer({ data }) {
    console.log('🚀 ~ file: index.jsx:15 ~ Footer ~ data:', data)
    const about = data.aboutUs
    return (
        <div className="footer">
            <div className="box-container">
                <div className="box">
                    <h4>Về chúng tôi</h4>
                    <p>
                        {data.aboutUs}
                    </p>
                </div>

                <div className="box">
                    <h4>Link nhanh</h4>
                    <a href="#home">Trang chủ</a>
                    <a href="#features">Tính năng</a>
                    <a href="#about">Ứng dụng</a>
                    <a href="#developer">Team phát triển</a>
                    <Link to='/account/registry'>Đăng ký</Link>
                    <Link to='/account/login'>Đăng nhập</Link>
                </div>

            </div>

            <h2 className="copyright">
                {!data.copyright ? data.copyright : `Bản quyền thuộc về © Zala Chat ${new Date().getFullYear()}`}
            </h2>
        </div>
    )
}

export default Footer
