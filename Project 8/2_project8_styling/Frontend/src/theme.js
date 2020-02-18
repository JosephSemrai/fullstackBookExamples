import { createMuiTheme } from '@material-ui/core'
import { orange } from '@material-ui/core/colors'

const baseTheme = {
  status: {
    danger: orange[500],
  }
};

const theme = createMuiTheme(baseTheme)

export default theme