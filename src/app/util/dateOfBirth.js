const dateOfBirthGeneration = (dob) => {
    const currentYear = new Date().getFullYear()
    const birthYear = new Date(dob).getFullYear()

    return (currentYear - birthYear)
}

export default dateOfBirthGeneration