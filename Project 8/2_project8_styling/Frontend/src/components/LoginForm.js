import React from 'react'
import PropTypes from 'proptypes'
import { Input, Button, Typography } from '@material-ui/core'

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
        <Typography>
          Username
        </Typography>  
        <Input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <Typography>
          Password
        </Typography> 
        <Input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <Button 
        variant="contained"
        type="submit"
        color="primary"
      >
        Login
      </Button>
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