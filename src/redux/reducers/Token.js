
const token = localStorage.getItem("accessToken")

export const Token = (state = token, action) => {
  switch (action.type) {
    case "Token":
      return action.payload
    default:
      return state
  }
}