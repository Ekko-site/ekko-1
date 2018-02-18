const config = process.env

const intercom = {
    update: ({ firstName, lastName, email, createdAt }) => {
        if(config.REACT_APP_NODE_ENV !== 'production'){
            return
        }
        window.Intercom && window.Intercom("update", {
            name: `${firstName} ${lastName}`,
            email,
            created_at: createdAt
        });
    },
    locationChange: () => window.Intercom && window.Intercom("update"),
    logout: () => window.Intercom && window.Intercom("shutdown"),
    track: event => {
        window.Intercom && window.Intercom("trackEvent", event)
        setTimeout(() => intercom.locationChange(), 1000)
    }
}

export default intercom
