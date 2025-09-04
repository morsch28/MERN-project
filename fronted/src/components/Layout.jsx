import Main from "./main/Main";
import Header from "./header/Header";
import Footer from "./footer/Footer";

function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default Layout;
