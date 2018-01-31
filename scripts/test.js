import models from './../dist/models'
import services from './../dist/services'
const { Users } = services

const init = async () => {
    await models.sequelize.sync({
        force: true
    })
    const user = new Users()
    return await user.createUser(
        'benhowdle89@gmail.com',
        'ben',
        'howdle',
        'foobar'
    )
}

const teardown = async () => {
    return await models.sequelize.sync({
        force: true
    })
}

export {
    init,
    teardown
}
