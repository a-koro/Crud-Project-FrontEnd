import React from 'react';

export default function Footer() {
    return (
        <footer className="container">
            <hr />
            <div className="row">
                <div className="col-md-9 col-xs-12">
                    <p className="text-muted">Copyright &copy; 2020 All Rights Reserved by Articl-O-matic.</p>
                </div>
                <div className="col-md-3">
                    <ul className="social-icons float-right">
                        <li style={{'display': 'inline'}}><a className="linkedin ml-2" href="https://www.linkedin.com/in/alexandros-korovesis/"><i className="fab fa-linkedin fa-2x text-secondary"></i></a></li>
                        <li style={{'display': 'inline'}}><a className="linkedin ml-2" href="https://github.com/a-koro"><i className="fab fa-github-square fa-2x text-secondary"></i></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}