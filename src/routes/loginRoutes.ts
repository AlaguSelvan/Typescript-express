import { Router, Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session?.loggedIn) {
    next()
  }
  res.status(403)
  res.send('Not Permitted')
}

const router = Router();

router.get('/login', (req: Request, res: Response) => {
  res.send(`
  <form method="POST">
    <div>
      <label> Email </label>
      <input name="email" type="email" />
    </div>
    <div>
      <label>Password</label>
      <input name="password" type="password" />
    </div>
    <button>Submit</button>
  </form>
  `)
});

router.get('/', (req: Request, res: Response) => {
  if(req.session?.loggedIn) {
    res.send(`
      <div>
        <div>You are Logged In</div>
        <a href="/logout">Logout</a>
      </div>
    `)
  } else {
    res.send(`
      <div>
        <div>You are not Logged In</div>
        <a href="/login">Login</a>
      </div>
    `)
  }
})

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body
  if (email && password && email === 'hi@hi.com' && password === 'password') {
    // mark as logged in
    req.session = { loggedIn: true }
    res.redirect('/')
    // redirect them to the root route
  } else {
    res.send('Invalid email or password')
  }
})

router.get('/logout', (req: RequestWithBody, res: Response) => {
  req.session = undefined
  res.redirect('/')
})

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Welcome to protected route ')
})

export { router }
