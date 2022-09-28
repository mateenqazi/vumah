

export const MapSearch = (state = '', action) => {
    switch (action.type) {
        case "MapSearch":
            return action.payload
        default:
            return state
    }
}

export const MapCenter = (state = {name: 'London', coordinates: [51.509865, -0.118092]}, action) => {
    switch (action.type) {
        case "MapCenter":
            return action.payload
        default:
            return state
    }
}

export const SelectedVehicleOnMap = (state = null, action) => {
    switch (action.type) {
        case "SelectedVehicleOnMap":
            return action.payload
        default:
            return state
    }
}