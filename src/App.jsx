import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { useEffect } from "react";
import { HomePage } from "./pages/HomePage/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { HotelsPage } from "./pages/HotelsPage/HotelsPage";
import { HotelDetailsPage } from "./pages/HotelDetailsPage/HotelDetailsPage";

const App = ()=>{
  const location = useLocation();

   useEffect(() => {
    document.body.classList.remove('modal-open')
    document.body.style.removeProperty('overflow')
    document.body.style.removeProperty('padding-right')
    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => backdrop.remove())
  }, [location.pathname])

  return(
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar/>
      <main className="container py-4 flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/hotels"
          element={
            <ProtectedRoute>
              <HotelsPage/>
            </ProtectedRoute>
          }
          />
          <Route path="/hotels/:hotelId"
          element={
            <ProtectedRoute>
              <HotelDetailsPage/>
            </ProtectedRoute>
          }
          />
          <Route path="/not-found" element={<NotFoundPage/>}/>
          <Route path="*" element={<Navigate to="/not-found" replace />}/>

        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App