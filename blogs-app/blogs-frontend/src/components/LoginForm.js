import PropTypes from 'prop-types'

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (
    <div className="loginform">
      <h3>Log in</h3>
      <form onSubmit={handleLogin}>
        <label>Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter username"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <label>Password</label>
        <input
          id="password"
          type ="password"
          placeholder="Enter password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <button id="login-button">Log in</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm