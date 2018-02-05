export function required(val) {
    return val && (val.length || val === true)
}

export function passwordsMatch({
    password,
    confirmPassword
}) {
    return password === confirmPassword
}
