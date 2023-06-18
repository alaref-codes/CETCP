import Navbar from './Navbar';
import Footer from './Footer';
import CourseNavbar from './CourseNavbar';
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}