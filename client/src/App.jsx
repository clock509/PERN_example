import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom" //Router 라이브러리 호출
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';
import RestaurantDetailPage from './routes/RestaurantDetailPage'
import { RestaurantsContextProvider } from './context/RestaurantsContext';

const App = () => {
  return (
    //Context API로 앱 전체를 감싸기
    <RestaurantsContextProvider>
      <div className="container">
        {/* container: table 좌우측에 gap을 줌 */}
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/restaurants/:id/update" component={UpdatePage} />
            <Route exact path="/restaurants/:id" component={RestaurantDetailPage} />
          </Switch>
        </Router>
      </div>
    </RestaurantsContextProvider>
  )
}
/* path: url
  component: export한 컴포넌트명
  모든 route를 명시하고, 모든 컴포넌트를 호출해
  Switch: Route 목록에서 이름을 비교해 보다가, 매칭되는 이름이 있으면 React router에 탐색을 중단하도록 명령함. 이는 react router가 여러 컴포넌트를 리로딩하는 것을 방지한다.
*/

export default App;