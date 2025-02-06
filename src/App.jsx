import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Card from "./components/Card.jsx";
import Grid from "./components/Grid.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <>
      {/* Barra de navegación */}
      <Navbar />

      {/* Contenido principal */}
      <main>
        <Card />
        <Grid />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
