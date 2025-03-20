import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Search from './components/Search';

function App() {
    return (
        <div>
            <Search />
            <Footer />
        </div>
    );
}

export default App;
