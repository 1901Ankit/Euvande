import Layout from "@/components/layout";
import "@/styles/globals.css";
import "aos/dist/aos.css";
import "swiper/css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-multi-carousel/lib/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'react-multi-carousel/lib/styles.css';
import "animate.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Modal from "@/components/modal";
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Modal />
        <ToastContainer autoClose={1000} />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
