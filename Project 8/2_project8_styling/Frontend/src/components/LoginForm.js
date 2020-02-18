import React from 'react'
import PropTypes from 'proptypes'

const LoginForm = ({
  loginAddress,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {

  return (
    <form action={loginAddress} method={'post'}>
      <div>
            Username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
            Password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

LoginForm.propTypes = {
  loginAddress: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm