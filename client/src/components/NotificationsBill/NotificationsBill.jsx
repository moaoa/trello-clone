import React from 'react'
import {useDispatch} from 'react-redux'
import {addInvite, removeInvite} from '../../redux/actions/project'
import { createProjectSuccess} from '../../redux/actions/project'
import { toast } from 'react-toastify';
import './NotificationsBill.css'
import { BsFillBellFill } from "react-icons/bs";
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core'
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import {useSelector} from 'react-redux'
import {Context} from '../../App'

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  btn: {
    marginRight: 10,
    fontWeight: 700
  }
}));


export default function NotificationsBill({className, invitations}) {

  const  user = useSelector(state => state.auth.user)

  const inviteContext = React.useContext(Context)
  
  const dispatch = useDispatch()


  const acceptInvite = (invite) => () => {
    axios.put('/projects/accept-invite', {invite})
    .then(res => {
      if(res.status === 200) {  
        const {addedMember, project} = res.data
        dispatch(createProjectSuccess(project))
        dispatch(removeInvite(invite))
        inviteContext.inviteAccepted(addedMember, project._id)

      }
    })
    .catch(e =>{
      console.log(e)
      toast.error('Something Went Wrong')
    })
  }

  const declineInvite = invite => () => {
    axios.put('/projects/decline-invite', {invite}, {headers: {Authorization: 'Bearer ' + user.token} })
    .then(res => {
      if(res.status === 200) dispatch(removeInvite(invite))
    })
  }
  


    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
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
                  return <li key={invite._id}>
                            you got invitation from   <strong> {invite.senderName } </strong> 
                            to join <strong>  { invite.projectName } </strong> project
                           <Button onClick={acceptInvite(invite)} className={classes.btn} size='small' color="primary" variant="contained">Accept</Button>
                           <Button onClick={declineInvite(invite)} className={classes.btn} size='small' color="secondary" variant="contained" >Decline</Button>
                          <hr/>
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
                <Typography className={classes.typography}>
                  {InvitationsPreview}
                  </Typography>
            </Popover>

            
        </div>
    )
}


