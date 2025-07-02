import "./App.css";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div>
      <Routes>
        <Route path="login" element={<LoginForm />}></Route>
      </Routes>
    </div>
  );
}

export default App;
