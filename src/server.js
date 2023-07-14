const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');

const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
const { default: axios } = require('axios')

const server = jsonServer.create()
const router = jsonServer.router('./src/db.json')
const userdb = JSON.parse(fs.readFileSync('./src/users.json', 'UTF-8'))

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const BASE_URL = process.env.BASE_URL;
const SECRET_KEY = process.env.SECRET_KEY;
const API_TOKEN = process.env.API_TOKEN;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const expiresIn = '15m'

// Create a token from a payload 
function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

// Verify the token 
function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
    return userdb?.users?.findIndex(user => user.email === email && user.password === password) !== -1
}

// Register New User
server.post('/auth/register', (req, res) => {
    console.log("register endpoint called; request body:");
    const { email, password } = req.body;

    if (isAuthenticated({ email, password }) === true) {
        const status = 401;
        const message = 'Email and Password already exist';
        res.status(status).json({ status, message });
        return
    }

    fs.readFile("./src/users.json", (err, data) => {
        if (err) {
            const status = 401
            const message = err
            res.status(status).json({ status, message })
            return
        };

        // Get current users data
        var data = JSON.parse(data.toString());

        // Get the id of last user
        var last_item_id = data.users[data.users.length - 1].id;

        //Add new user
        data.users.push({ id: last_item_id + 1, email: email, password: password }); //add some data
        var writeData = fs.writeFile("./src/users.json", JSON.stringify(data), (err, result) => {  // WRITE
            if (err) {
                const status = 401
                const message = err
                res.status(status).json({ status, message })
                return
            }
        });
    });

    // Create token for new user
    const access_token = createToken({ email, password })
    res.status(200).json({ access_token })
})

// Login to one of the users from ./users.json
server.post('/auth/login', (req, res) => {
    console.log("login endpoint called; request body:");
    const { email, password } = req.body;

    if (isAuthenticated({ email, password }) === false) {
        const status = 401
        const message = 'Incorrect email or password'
        res.status(status).json({ status, message })
        return
    }

    const access_token = createToken({ email, password })

    const refreshToken = jwt.sign({
        email,
    }, REFRESH_TOKEN_SECRET, { expiresIn });

    // Assigning refresh token in http-only cookie 
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None', secure: true,
        maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ access_token })
});

server.post('/auth/refresh', (req, res) => {
    const refreshToken = req?.headers?.cookie?.split('=')[1];

    if (refreshToken) {
        const { email } = req.body;

        // Verifying refresh token
        jwt.verify(refreshToken, "MYREFRESHTOKENSECRET",
            (err, decoded) => {
                if (err) {
                    // Wrong Refesh Token
                    return res.status(406).json({ message: 'Unauthorized' });
                }
                else {
                    // Correct token we send a new access token
                    const accessToken = jwt.sign({
                        email
                    }, SECRET_KEY, {
                        expiresIn: '15m'
                    });
                    
                    return res.json({ accessToken });
                }
            })
    } else {
        return res.status(406).json({ message: 'Unauthorized' });
    }
});

server.use(/^\/(.*)/, (req, res, next) => {
    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const status = 401
        const message = 'Error in authorization format'
        res.status(status).json({ status, message })
        return
    }
    try {
        let verifyTokenResult;
        verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

        if (verifyTokenResult instanceof Error) {
            const status = 401;
            const message = 'Invalid Access token';
            res.status(status).json({ status, message });
            return;
        }
        next()
    } catch (err) {
        const status = 401;
        const message = 'Error access_token is revoked';
        res.status(status).json({ status, message });
    }
})

// Get World news
server.get('/ny-news/world', (req, res, next) => {
    axios.get(`${BASE_URL}/topstories/v2/world.json?api-key=${API_TOKEN}`).then((resp) => {
        res.status(200).json(resp.data);
    }).catch((err) => {
        console.error(err);
    })
})

// Get Science news
server.get('/ny-news/science', (req, res) => {
    axios.get(`${BASE_URL}/topstories/v2/science.json?api-key=${API_TOKEN}`).then((resp) => {
        res.status(200).json(resp.data);
    }).catch((err) => {
        console.error(err);
    })
})

// Get Searched Articles
server.get('/ny-news/article/search', (req, res) => {
    const query = req.query?.search?.replace(/ /g, "+"); (' ', '+');
    const page = req.query?.page;
    const fq = req.query?.fq;

    let queryParam = '';

    if (query) {
        queryParam += `&q=${query}`;
    }
    if (page) {
        queryParam += `&page=${page}`;
    }
    if (fq) {
        queryParam += `&fq=${fq}`;
    }

    const newQuery = queryParam.replace('&', '?');

    axios.get(`${BASE_URL}/search/v2/articlesearch.json${newQuery}&api-key=${API_TOKEN}`).then((resp) => {
        res.status(200).json(resp.data);
    }).catch((err) => {
        console.error(err);
    })
})

server.use(/^(?!\/auth).*$/, (req, res, next) => {
    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const status = 401
        const message = 'Error in authorization format'
        res.status(status).json({ status, message })
        return
    }
    try {
        let verifyTokenResult;
        verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

        if (verifyTokenResult instanceof Error) {
            const status = 401
            const message = 'Access token not provided'
            res.status(status).json({ status, message })
            return
        }
        next()
    } catch (err) {
        const status = 401
        const message = 'Error access_token is revoked'
        res.status(status).json({ status, message })
    }
})

server.use(router)

server.listen(8000, () => {
    console.log('Run Auth API Server')
})