export const Booking = (state = [], action) => {
    switch (action.type) {
        case "Booking":
            return action.payload
        default:
            return state
    }
}

export const BookingChangeRequests = (state = [], action) => {
    switch (action.type) {
        case "BookingChangeRequests":
            return action.payload
        default:
            return state
    }
}

export const BreakDownReasons = (state = [], action) => {
    switch (action.type) {
        case "BreakDownReasons":
            return action.payload
        default:
            return state
    }
}