import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import UserProtectionWrapper from "./components/UserProtectionWrapper";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route
                    path="/home"
                    element={
                        <UserProtectionWrapper>
                            <Home />
                        </UserProtectionWrapper>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
