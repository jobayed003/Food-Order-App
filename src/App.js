import { Fragment } from 'react';
import Cart from './Components/Cart/Cart';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';

const App = () => {
  return (
    <Fragment>
      <Cart />
      <Header />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
};

export default App;
