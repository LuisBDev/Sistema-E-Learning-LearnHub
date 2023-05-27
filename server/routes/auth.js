import express from 'express';
import { login } from '../controllers/auth';

const router = express.Router();

//controllers
import { register } from '../controllers/auth';

router.post('/register', register);
router.post('/login', login);

module.exports = router;