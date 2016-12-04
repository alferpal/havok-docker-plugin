'use strict'

function isAllowed () {
  const allowed = (new Date().getMinutes() % 2 ) === 0

  const errResponse = {
    "Allow": allowed,
    "Msg":   "Allowed if the minute number is even",
    "Err":   "Minutes are odd"
  }

  const okResponse = {
    "Allow": allowed
  }

  return allowed ? okResponse : errResponse
}

const Hapi = require('hapi')

const server = new Hapi.Server()

server.connection({ port: 8192 })

server.route({
    method: 'POST',
    path: '/Plugin.Activate',
    handler: function (request, reply) {
      return reply({"Implements": ["authz"] })
    }
})

server.route({
    method: 'POST',
    path: '/AuthZPlugin.AuthZReq',
    handler: function (request, reply) {
      return reply(isAllowed())
    }
})

server.route({
    method: 'POST',
    path: '/AuthZPlugin.AuthZRes',
    handler: function (request, reply) {
      return reply(isAllowed())
    }
})

server.start((err) => {

    if (err) {
        throw err
    }
    console.log(`Server running at: ${server.info.uri}`)
})
