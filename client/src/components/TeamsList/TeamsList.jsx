import React from 'react'
import './TeamsList.css'
import TeamItem from '../TeamItem/TeamItem'
import {FcGoogle} from 'react-icons/fc'
import {FaSpotify} from 'react-icons/fa'

function TeamsList() {
    return (
        <div className='TeamsList'>
            <TeamItem Icon={FcGoogle} teamName={'google'}/>
            <TeamItem Icon={FaSpotify} teamName={'spotify'}/>

        </div>
    )
}

export default TeamsList
