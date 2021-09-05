import buildClient from "../api/build-client";
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import Header from "../components/Header";

const AppComponent = ({Component, pageProps, currentUser}) => {
    return <div className="h-screen bg-gray-100 overflow-hidden">
        <Header currentUser={currentUser}/>
        <Component currentUser={currentUser} {...pageProps}/>
    </div>
};

AppComponent.getInitialProps = async appContext => {
    const client = buildClient(appContext.ctx);
    const {data} = await client.get('/api/users/currentuser');

    let pageProps;
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
    }

    return {
        pageProps,
        ...data
    };
}

export default AppComponent;