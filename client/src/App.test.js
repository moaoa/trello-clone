
import authReducer from '../src/redux/reducers/authReducer'
import constants from '../src/redux/actions/constants'
import projectReducer from '../src/redux/reducers/projectReducer'


const initialState = {
  loading : false,
  user: null
}

it('should return initialState', () => {
  expect(authReducer(initialState , {})).toEqual(initialState)
})



it('shoud add invitation to state ', () => {

  const mockUserData = {
    ...initialState,
    user: {
      name: 'moaad',
      invitations : [ {_id : 1, senderName: 'user1', projectName: 'dummyProject'}]
    }
  }
  const mockActionToAddInvitation = {
    type:constants.ADD_INVITE ,
    payload: {
      _id: 2, 
      senderName: "user2",
      projectName: 'project 2',
  
    }
  }

  expect(authReducer(mockUserData, mockActionToAddInvitation)).toEqual({
    loading : false,
    user: {
      name: 'moaad',
      invitations : [
       {_id : 1,
         senderName: 'user1',
        projectName: 'dummyProject'},
       {
        _id: 2, 
        senderName: "user2",
        projectName: 'project 2',
    
      }]
    }
  })
})

it('should remove invitation from state', () => {
  const mockUserData = {
    ...initialState,
    user: {
      name: 'moaad',
      invitations : [ {_id : 1, senderName: 'user1', projectName: 'dummyProject'}]
    }
  }
  const mockActionToRemoveInvitation = {
    type:constants.REMOVE_INVITE ,
    payload: {
      _id: 1, 
    }
  }

  expect(authReducer(mockUserData, mockActionToRemoveInvitation)).toEqual({
    loading : false,
    user: {
      name: 'moaad',
      invitations : []
    }
  })

})


it('should member to project members list', () => {

  const mockState = {
    '1234': {
      members: [{name: 'user1'}, {name: 'user2'}]
    },
    '12345678': {
      members: [{name: 'user1'}]
    }
  }


  const  member3 = {
    name: 'member3'
  }

  const newState = projectReducer(mockState, { type: constants.ADD_MEMBER, payload: {member: member3, projectId: '12345678'} } ) 

  expect(newState).toEqual({
    '1234': {
      members: [{name: 'user1'}, {name: 'user2'}]
    },
    '12345678': {
      members: [{name: 'user1'}, {name: 'member3'}]
    }
  })


})