import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Projects  from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/projetos" element={<Projects />} />
                    <Route path="/sobre" element={<About />} />
                    <Route path="/contato" element={<Contact />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
