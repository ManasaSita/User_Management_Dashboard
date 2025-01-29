import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add-user" element={<UserForm isEditing={false} />} />
        <Route path="/edit-user/:id" element={<UserForm isEditing={true} />} />
      </Routes>
    </Router>
  );
}

export default App;
