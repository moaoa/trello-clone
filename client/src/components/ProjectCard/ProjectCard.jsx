import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import Card from '@material-ui/core/Card';
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import {FiMoreVertical} from 'react-icons/fi'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    minWidth: 275,
    alignSelf: 'self-start'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    marginBottom: 10
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ProjectCard({projectName, imgUrl, members, _id , openModal, admin}) {
  console.log('_id : ', _id);
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardHeader
            action={
                <IconButton aria-label='settings' onClick={() => openModal(_id)}>
                    <FiMoreVertical/>
                </IconButton>
            }
            title={
              <Link to={`/project/${_id}`} >{projectName}</Link>
            }

            />
            <CardMedia
                className={classes.media}
                image={imgUrl}
            />
              <AvatarGroup style={{display: 'flex', justifyContent: 'flex-end'}} max={4}>
                  <Avatar src={admin.imgUrl}></Avatar>
                {
                  members?.map((member, i) => <Avatar src={member.imgUrl}  key={`${i}-${Date.now()}`} ></Avatar> )
                }
              </AvatarGroup>
        </Card>
    
    )
}
