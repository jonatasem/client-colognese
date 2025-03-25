import Header from "../../components/Header/Header";
import './Home.scss';
import imgLogo from '../../assets/img/logo.png';
import ProductList from '../../components/Products/ProductList';
import About from '../../components/About/About';
import Comments from "../Comments/Comments";
import Waves from '../../components/Waves/Waves';

export default function Home(){
    return (
        <section className="container-home">
            <Header />
            <Waves />
            <article className="home-intro">
                <div className="home-intro-center">
                    <img src={imgLogo} alt="imagem da logo" />
                </div>
                <div className="home-intro-footer">
                    <h2>Aqui você encontra!</h2>
                    <ul>
                        <li>Doces Finos</li>
                        <li>Doces Comuns</li>
                        <li>Outra coisa</li>
                        <li>Outra coisa</li>
                        <li>Outra coisa</li>
                        <li>Outra coisa</li>
                    </ul>
                </div>
            </article>
            <ProductList />
            <Comments />
            <About />
        </section>
    )
}