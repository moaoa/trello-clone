import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { GrProjects } from 'react-icons/gr'
import { AiOutlineProject } from 'react-icons/ai'
import SidebarItem from '../SidebarItem/SidebarItem'
import Drawer from './Drawer/Drawer'
import NotificationsBill from '../../NotificationsBill/NotificationsBill';
import grey from '@material-ui/core/colors/grey'
import { useSelector } from 'react-redux'
import LogOutButton from '../../LogOutButton/LogOutButton'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    gridColumn: "1/9",
    maxWidth: "100vw"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "white",
    fontWeight: "bold"
  },
  header:{
      flexDirection: 'row',
      backgroundColor: grey[300]
  },

  list:{
      width: 250,
      background: "red "
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false)

  const openDrawer = ( ) => {
    setIsOpen(true)
  }
  const closeDrawer = () => {
    setIsOpen(false)
  }
  const user = useSelector(state => state.auth.user)
  const notificationCssClass = user?.invitations?.length ? 'redNotification': ''


  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <IconButton 
          edge="start" 
          className={classes.menuButton} 
          color="inherit" 
          aria-label="menu"
          onClick={openDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Trello
          </Typography>
         
        </Toolbar>

      </AppBar>
      <Drawer onClose={closeDrawer} isOpen={isOpen}>
        <div style={{padding: "10px 20px"}}><NotificationsBill className={notificationCssClass} invitations={user.invitations} /></div>  
          <div onClick={closeDrawer}><SidebarItem Icon={GrProjects} title={'DASHBOARD'}  /></div>
          <div onClick={closeDrawer}><SidebarItem Icon={AiOutlineProject} title={'MY PROJECTS'} /></div>
          <div style={{paddingLeft: 10}}>
            <LogOutButton/>
          </div>
      </Drawer>
    </div>
  );
}


