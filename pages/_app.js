import "../styles/globals.scss";
import Contentlayout from "../shared/layout-components/layout/content-layout";
import Landingpagelayout from "../shared/layout-components/layout/landingpage-layout";
import Switcherlayout from "../shared/layout-components/layout/switcher-layout";
import Authenticationlayout from "../shared/layout-components/layout/authentication-layout";
import SSRProvider from "react-bootstrap/SSRProvider";
import { Provider, useDispatch } from "react-redux";
import store from "@/store";
import { authActions } from "@/redux/authSlice";

const layouts = {
  Contentlayout: Contentlayout,
  Landingpagelayout: Landingpagelayout,
  Switcherlayout: Switcherlayout,
  Authenticationlayout: Authenticationlayout,
};
function MyApp({ Component, pageProps }) {
  if (typeof window !== "undefined") {
    const storedEmail = localStorage.getItem("UserEmail");
    const storedRUC = localStorage.getItem("RUC");
    if (storedEmail && storedRUC) {
      store.dispatch(authActions.signIn());
    }
  }

  const Layout =
    layouts[Component.layout] ||
    ((pageProps) => <Component>{pageProps}</Component>);
  return (
    <Layout>
      <SSRProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SSRProvider>
    </Layout>
  );
}

export default MyApp;
