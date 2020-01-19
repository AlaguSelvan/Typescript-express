import { Router, Request, Response, NextFunction } from 'express'
import { get, post, controller, bodyValidator } from './decorators'

@controller('/auth')
class LoginContoller {
  @get('/')
  add(a: number, b:number): number {
    return a + b
  }

  @get('/login')
  getLogin(req: Request, res: Response): void {
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
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body
    if (email && password && email === 'hi@hi.com' && password === 'password') {
      req.session = { loggedIn: true }
      res.redirect('/')
    } else {
      res.send('Invalid email or password')
    }
  }
  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/')
  }
}