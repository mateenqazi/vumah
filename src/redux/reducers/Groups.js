export const Groups = (state = [], action) => {
    switch (action.type) {
        case "Groups":
            return action.payload
        default:
            return state
    }
}