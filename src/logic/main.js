import {getDaysToBookFromJson} from "./functions";

export default () => {
    return new Promise((res, rej) => {
        fetch("https://www.gov.uk/bank-holidays.json")
            .then(data => data.json())
            .then(data => res(getDaysToBookFromJson(data)))
            .catch(err => rej(err))
    })
}