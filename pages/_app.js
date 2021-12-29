import "normalize.css/normalize.css";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import "../styles/globals.css";
import firebase, { FirebaseContext } from "../firebase";
import useAuthenticator from "../hooks/useAuthenticator";

config.autoAddCss = false;
library.add(fas, far);

function MyApp({ Component, pageProps }) {
  const user = useAuthenticator();
  console.log(FirebaseContext.Provider);

  return (
    <FirebaseContext.Provider value={{ firebase, user }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}

export default MyApp;
