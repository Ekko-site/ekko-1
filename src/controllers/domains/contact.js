import services from './../../services/'
const { Domains } = services

const contact = {
    async add({ contact }) {
        const domains = new Domains()
        const newContact = await domains.addContact(contact)
        return {
            contact: newContact
        }
    }
}

export default contact
