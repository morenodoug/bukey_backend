
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
const jwtSecret = 'hamburguesas';
const valid_hours = 24
const optionsJWT = {
    expiresIn:24*60*60,
}

//bcrypt
const saltRounds = 10;

module.exports = {
    databaseConnection: generateUrlDatabaseConnection(),
    jwtSecret: jwtSecret,
    optionsJWT: optionsJWT,
    saltRounds: saltRounds
}