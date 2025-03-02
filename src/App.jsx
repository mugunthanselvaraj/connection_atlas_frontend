import Features from "./comonents/Features";
import Footer from "./comonents/Footer";
import Navbar from "./comonents/Navbar";
import EventList from "./container/EventList";
function App() {
  return (
    <>
      {/*
    Navbar--done
    events
    footer--done
    signup
  */}
      <Navbar />
      <EventList />
      <Features />
      <Footer />
    </>
  );
}

export default App;
