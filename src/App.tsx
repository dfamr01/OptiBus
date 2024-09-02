/* eslint-disable react/react-in-jsx-scope */
import "./styles.css";

import DutyManagerContainer from "./features/duty-manager/duty-manager-components/DutyManagerContainer";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <div className="App">
      <DutyManagerContainer />
    </div>
  );
};

export default App;
