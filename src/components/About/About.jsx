import imgInsta from '../../assets/img/colognese-instagram.png';

import './About.scss';

export default function About(){
    return (
        <section className="container-about">
            <article className="footer-left">
                <h1>Confiança e Tradição!</h1>
                <h2>
                    A Brigaderia Colognese há mais de 10 anos encanta nossos clientes e não tem barreiras digitais, também estamos presentes online!
                </h2>
                <p>
                    A nossa loja física está localizada na Rua Nove de Julho, 685 - Centro, Adamantina - SP, Brasil. 
                    O sonho cresceu tanto que desejamos levar a alegria dos doces para os amantes da confeitaria do Brasil inteiro, e é por isso que estamos aqui no digital, permitindo que todos experimentem o que quiserem na nossa fábrica de delícias!
                    Que tal começar agora mesmo? Bem-vindo ao nosso portal, amante da confeitaria!
                </p>
            </article>
                <article className="footer-right">
                    <h1>Acompanhe nosso Instagram</h1>
                    <img src={imgInsta} alt="imagem do insta" />
                </article>
        </section>
    )
}