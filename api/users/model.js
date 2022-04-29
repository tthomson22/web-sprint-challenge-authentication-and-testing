const db = require('../../data/dbConfig')

function get(){
    return db('users')
}

function getById(id){
    return db('users')
        .where('id', id)
        .first()
}

async function add({ username, password }){
    const [id] = await db('users').insert({ username, password })
    return getById(id)
}

module.exports = {
    get,
    getById,
    add
}