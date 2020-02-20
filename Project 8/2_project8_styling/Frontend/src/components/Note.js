import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, Checkbox, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    marginBottom: 10,
  }
})

const Note = ({ note, toggleFlagged }) => {
  const classes = useStyles()

  if (!note) {
    note = {
      flagged: false,
      content: 'Note content not found'
    }
  }
  return (
    <li>
      <Card className={classes.root}>
        <CardContent>
          <Checkbox checked={note.flagged} onChange={toggleFlagged} />
          <Typography component={Link} to={`/notes/${note.id}`} color="primary">
            {note.content}
          </Typography>
        </CardContent>
      </Card>
    </li>
  )
}

export default Note