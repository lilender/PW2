import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <div>
            <Dashboard />
            <Footer />
        </div>
    );
}

export default App;
