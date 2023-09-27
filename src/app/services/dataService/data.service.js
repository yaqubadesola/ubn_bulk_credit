let startDate
let endDate

const DataService = {

    setStartDate(date) {
        startDate = date
    },

    getStartDate() {
        return startDate
    },

    setEndDate(date) {
        endDate = date
    },

    getEndDate() {
        return endDate
    }
}

export default DataService