import React from 'react'
import './NotificationsBill.css'
import { BsFillBellFill } from "react-icons/bs";
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));


export default function NotificationsBill({className, invitations}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        console.log('fire');
        if(!anchorEl) setAnchorEl(event.currentTarget);
        else setAnchorEl(null)
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    let InvitationsPreview  = null
    
    if(invitations &&  invitations.length) {

      
      InvitationsPreview = (
      <div className='notification-menu'>
              <ul>
                {invitations.map((invite, i) => {
                  return <li key={`${i}-${Date.now()}`}>
                    you got invitation from   <strong> {invite.senderName } </strong> 
                    to join <strong>  {invite.projectName} </strong> project
                    </li>
                })}
              </ul>
        </div>  )
     
      }
    

    
  
    return (
        <div className={'NotificationsBill pointer cardShadow ' + className} onClick={handleClick}>
            <BsFillBellFill color='939394' />

          <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
            >
                <Typography className={classes.typography}>{InvitationsPreview}</Typography>
            </Popover>

            
        </div>
    )
}


