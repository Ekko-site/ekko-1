import test from 'ava'
import request from 'supertest'
import app from './../dist/app'

const req = request(app)

const realUser = {
    email: 'benhowdle89@gmail.com',
    password: 'foobar'
}

const fakeUser = {
    email: 'fake@gmail.com',
    password: 'foo'
}

import { init, teardown } from './../scripts/test'

test.before(async t => await init())
test.after(async t => await teardown())

test('check auth header without token', async t => {
    const res = await req
        .post('/api/users/password')
        .expect(403)
    t.truthy(res.body.data.error)
})

test('log user in with incorrect details', async t => {
    const res = await req
        .post('/api/users/login')
        .send(fakeUser)
        .expect(404)
})

test('log user in with correct details', async t => {
    const res = await req
        .post('/api/users/login')
        .send(realUser)
        .expect(200)
    t.is(res.body.data.user.email, realUser.email)
})
