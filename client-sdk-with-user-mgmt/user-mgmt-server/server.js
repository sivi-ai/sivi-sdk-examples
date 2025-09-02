import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 4000;

// Middleware
app.use(cors()); // Allow all origins
app.use(express.json()); // Parse JSON bodies

// Example login route
app.post('/login-sivi', (req, res) => {

    const loginInput = {
        abstractUserId: 'user-0100' // Update abstractUserId
    }

    console.time('auth-api-login')

    fetch(`${process.env.SIVI_AUTH_URL}/login-user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'sivi-api-key': process.env.SIVI_API_KEY
        },
        body: JSON.stringify(loginInput),
    })
        .then(response => {
            console.timeEnd('auth-api-login')
            return response.json()
        }
        )
        .then(data => res.json(data))
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        })
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
