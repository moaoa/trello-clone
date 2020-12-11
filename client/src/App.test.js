
import authReducer from '../src/redux/reducers/authReducer'
import constants from '../src/redux/actions/constants'


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