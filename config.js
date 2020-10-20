
const databaseConnection = {
    host: 'localhost',
    port: 27017,
    database: 'bunkeychat',
    engine: "mongodb"

};

function generateUrlDatabaseConnection(){

    return `${databaseConnection.engine}://${databaseConnection.host}:${databaseConnection.port}/${databaseConnection.database}`
}

// jsonwebtoken
const secret = 'hamburguesas';

const optionsJWT = {
    expiresIn: Math.floor(Date.now() / 1000) + (60 * 60),
}

//bcrypt
const saltRounds = 10;

module.exports = {
    databaseConnection: generateUrlDatabaseConnection(),
    secret: secret,
    optionsJWT: optionsJWT,
    saltRounds: saltRounds
}