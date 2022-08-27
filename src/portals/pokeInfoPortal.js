import ReactDOM from "react-dom";
import './pokeInfoPortal.css';

export default function({children, show, setShow}){

    const className = 'pokemon-portal '+(show ? 'show-pokemon-portal ':'hidden-pokemon-portal ')

    return ReactDOM.createPortal((
        <>
        <section className={className}>
            <span onClick={()=>setShow(false)} className='close-portal'>&times;</span>
            {children}
        </section>
        </>
    ), document.getElementById('pokemon-information'));
}