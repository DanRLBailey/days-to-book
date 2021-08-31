import {getDaysToBookFromJson} from "./functions";

export default (region) => {
    return new Promise((res, rej) => {
        fetch("https://www.gov.uk/bank-holidays.json")
            .then(data => data.json())
            .then(data => res(getDaysToBookFromJson(data, region)))
            .catch(err => rej(err))
    })
}