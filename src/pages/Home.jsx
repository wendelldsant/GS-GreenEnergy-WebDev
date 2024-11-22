import CardsHome from "../componentes/CardsHome";
import FirstSection from "../componentes/FirstSectionHome";
import Footer from "../componentes/Footer";
import Problema from "../componentes/Problema";
import dadosCards from "../dados/cardshome.json"
function Home() {
    return ( 
        <section>
            <FirstSection/>
            <Problema/>
            <CardsHome dadosCards={dadosCards}/>
            <Footer />

        </section>


     );
}

export default Home;