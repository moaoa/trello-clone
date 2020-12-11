export const addInviteUtil = (state, action) => ({
    ...state,
    user: { ...state.user ,invitations: [...state.user.invitations, action.payload]}
})

export const removeInviteUtil =  (state, action) => (
    {
        ...state,
        user: {
            ...state.user,
            invitations: state.user.invitations.filter(invite => invite._id !== action.payload._id)
        }
    }
)