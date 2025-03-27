import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Search from './components/Search';
import UserOnline from './components/UserOnline';
import FicContent from './components/FicContent';

function App() {
    return (
        <div>
            <FicContent 
                coversrc='/img/Mirrors (5).png'
                fictittle='Néctar de la noche'
                ficauthor='Lilender'
                ficdescription='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel dolor eros. Aenean sed mi nisi. Aliquam eu nisl eget libero lobortis posuere. Praesent semper, urna tristique porttitor tincidunt, velit enim vehicula nulla, vitae gravida ipsum nulla ut risus. Nam et turpis iaculis, congue eros tincidunt, fermentum elit.'
                fictxtrows='4'
                kudos='200'
                coments='900'
                publisheddate='17 de julio de 2022'
                chapters={[
                    { content: 'Una vez en invierno' },
                    { content: 'Una vez en invierno' },
                    { content: 'Una vez en invierno' },
                    { content: 'Una vez en invierno' },
                    { content: 'Una vez en invierno' },
                    { content: 'Una vez en invierno' },
                    { content: 'Una vez en invierno'}
                ]}
                tags={[
                    { type: '1', content: 'Completada' },
                    { type: '2', content: 'Contenido sexual' },
                    { type: '3', content: 'Amor' },
                    { type: '3', content: 'Time travel' },
                    { type: '3', content: 'Enemies to lovers' },
                    { type: '3', content: 'Drama' },
                    { type: '4', content: '+'}
                ]}
            />
            <Footer></Footer>
        </div>
    );
}

export default App;
