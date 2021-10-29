import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Demo from './demo/Pages/Demo/index';
import HandsOn from './handsOn/Pages/HandsOn/index';

function App() {
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <div className='brand-session'>
            <img src={logo} className='App-logo' alt='logo' />
            <a
              className='App-link'
              href='https://pt-br.reactjs.org/docs/hooks-intro.html'
              target='_blank'
              rel='noopener noreferrer'
            >
              Aprendendo hooks
            </a>
          </div>

          <nav className='links'>
            <Link to='/demo'>Demo</Link>
            <Link to='/handsOn'>HandsOn</Link>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path='/'>
              <Redirect to='/demo' />
            </Route>
            <Route path='/demo'>
              <h1 className='is-size-1 my-5'>Demo - TodoList </h1>
              <Demo />
            </Route>
            <Route path='/handsOn'>
              <h1 className='is-size-1 my-5'>TodoList </h1>
              <HandsOn />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
