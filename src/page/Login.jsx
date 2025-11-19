import './Login.css';

const Login = () => {
    return (
        <div className="login-page">
            <div className="login-card">
                <div className="left-panel">
                    <div className="logo-box">Logo</div>
                </div>

                <div className="right-panel">
                    <h2>Sign in</h2>
                    <form className="login-form" onSubmit={(e)=>e.preventDefault()}>
                        <input type="text" placeholder="Username" aria-label="username" />
                        <input type="password" placeholder="Password" aria-label="password" />

                        <div className="actions">
                            <label style={{display:'flex',alignItems:'center',gap:'8px'}}>
                                <input type="checkbox" />
                                Remember me
                            </label>
                            <a href="#" onClick={(e)=>e.preventDefault()}>Forget password</a>
                        </div>

                        <button className="signin-btn" type="submit">Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;