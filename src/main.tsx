import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch } from 'react-router'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import Login from '@/app/containers/Login'
import TodoApp from '@/app/containers/TodoApp'
import AppController from '@/app/components/AppController'
import { Authenticated } from '@/app/components/Authenticated'
import { configureStore } from '@/app/store'
import { paths } from '@/app/common/paths'
import '@/assets/css/reboot.css'
import '@/assets/css/common.scss'

if (process.env.NODE_ENV !== 'production') {
  console.info('Build with development mode')
}

const history = createBrowserHistory()
const store = configureStore(history)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppController>
        <Switch>
          <Route exact path={paths.login} component={Login} />
          <Authenticated>
            <Route exact path={paths.root} component={TodoApp} />
          </Authenticated>
          {/* FIXME: Following "Not Found" is unreachable and doesn't work. */}
          <Route render={() => <h1>404 Not Found</h1>} />
        </Switch>
      </AppController>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
