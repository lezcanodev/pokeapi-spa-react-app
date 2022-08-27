
import ImageLoading from './loading.gif';
import './loading.css';

export default function(){
    return <div className='loader'>
        <img src={ImageLoading} />
        <span>Loading...</span>
    </div>
}