import axios from "axios";

const CompanyCheck = async (code) => {

    try {

        const response = await axios({
            method: 'GET',
            url: `https://vumah-mvc.herokuapp.com/${code}`
        }).catch(e => {
        })

        return response.data
    } catch (err) {
        return undefined
    }

}

export default CompanyCheck
