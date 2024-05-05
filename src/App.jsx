import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TabPage from './components/TabPage'

function App() {

  return (
    
      <Container maxWidth="xl">
        <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>
            Personal Trainer App
          </Typography>
        </Toolbar>
        </AppBar>
        <TabPage />
      </Container>
    
  )
}

export default App
