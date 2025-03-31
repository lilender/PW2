import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Search from './components/Search';
import UserOnline from './components/UserOnline';
import FicContent from './components/FicContent';
import Chapter from './components/Chapter';
import CommentsSection from './components/CommentsSection';
import NewFic from './components/NewFic';

function App() {
    return (
        <div>
            <NewFic></NewFic>
            <Footer></Footer>
        </div>
    );
}

export default App;


/*
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
                    { content: '1. Una vez en invierno' },
                    { content: '2. Una vez en invierno' },
                    { content: '3. Una vez en invierno' },
                    { content: '4. Una vez en invierno' },
                    { content: '5. Una vez en invierno' },
                    { content: '6. Una vez en invierno' },
                    { content: '7. Una vez en invierno'}
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
*/