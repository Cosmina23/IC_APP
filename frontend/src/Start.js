import { Link } from 'react-router-dom';
import './Css/Start.css';
import Icon from "./resources/Android.png"
import Logo from "./resources/Logo.png";
import './index.css'

export default function Start(){
    return(
        <>
        <div className='main-container'>
        <div className='start-container'>
            <div className='container1'>
                <div>
                    <img src={Icon} alt='Imagine' className='img1'/>
                </div>
                <p className='text1'>
                Transformă învățarea într-un joc captivant cu 
                <p className='text12'>EasyBac!</p> 
                </p>
                <p className='text2'>  
                Pregătire distractivă pentru bacalaureat.
                </p>
                <div className='button-container'>
                    <p>
                        <Link to="/register"><button>Inregistrare</button></Link>
                    </p>
                    <p>
                        <Link to="/login"><button>Logare</button></Link>
                    </p>
                </div>
            </div>
            <div className='img-class'>
                <img src={Logo} alt='Imagine' className='img2'/>
            </div>
        </div>
        </div>
        </>
    )
}