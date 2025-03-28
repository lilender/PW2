import 'bootstrap/dist/css/bootstrap.css';
import BrownLine from './BrownLine';
import CoverLink from './CoverLink';

function CoversRow(props){
    return(
        <div>
            <BrownLine></BrownLine>
            <h1 className='title m-0 mt-4 p-0'>{props.header}</h1>
            <div className='row justify-content-around mt-3 mx-0 px-5'>
                {props.covers?.map((coverlink, index) => (
                    <CoverLink key={index} src={coverlink.src} content={coverlink.content} />
                ))}
            </div>
        </div>
    );
}

export default CoversRow;