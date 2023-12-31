import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';

const app = express();

const customLogger = (message) => (req, res, next) => {
  console.log('Hello from ', message);
  next();
}

app.use(cors());
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(customLogger('custom logger'));

app.use((req, res, next) => {
  //@ts-ignore
  req.shhhhhh_secret = 'doggy';
  next();
})

app.get('/', (req, res, next) => {
  res.status(200);
  res.json({ message: 'hello' })
})

app.use('/api', protect, router);
app.post('/user', createNewUser)
app.post('/signin', signin)

app.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401).json({ message: 'Unauthorized' })
  }
  else if (err.type === 'input') {
    res.status(400).json({ message: 'Invalid input' })
  }
  else {
    res.status.json({ message: 'That our fault' })
  }

})

export default app