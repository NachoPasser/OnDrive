import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Testimonial.css";
import { Avatar } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";

const PreviousBtn = (props) => {
  console.log(props);
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIos style={{ color: "white", fontSize: "45px" }} />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIos style={{ color: "white", fontSize: "45px" }} />
    </div>
  );
};

const Testimonial = () => {
  return (
    <div id='testimonial'>
      <div style={{ width: "80%", textAlign: "center" }}>
        <Slider prevArrow={<PreviousBtn />} nextArrow={<NextBtn />} dots>
          <Card 
          img="https://www.tutorialrepublic.com/examples/images/clients/1.jpg"
          name={'Andrea Rodriguez'}
          profession={'Pasajera'}
          p={'Phasellus vitae suscipit justo. Mauris pharetra feugiat ante id lacinia. Etiam faucibus mauris id tempor egestas. Duis luctus turpis at accumsantincidunt. Phasellus risus risus, volutpat vel tellus ac, tinciduntfringilla massa. Etiam hendrerit dolor eget rutrum'}/>
          <Card 
          img="https://www.tutorialrepublic.com/examples/images/clients/2.jpg" 
          name={'Daniel Rojo'}
          profession={'Conductor'}
          p={'Phasellus vitae suscipit justo. Mauris pharetra feugiat ante id lacinia. Etiam faucibus mauris id tempor egestas. Duis luctus turpis at accumsantincidunt. Phasellus risus risus, volutpat vel tellus ac, tinciduntfringilla massa. Etiam hendrerit dolor eget rutrum'}/>
          <Card 
          img="https://www.tutorialrepublic.com/examples/images/clients/3.jpg" 
          name={'Francisco Toloza'}
          profession={'Pasajero'}
          p={'Phasellus vitae suscipit justo. Mauris pharetra feugiat ante id lacinia. Etiam faucibus mauris id tempor egestas. Duis luctus turpis at accumsantincidunt. Phasellus risus risus, volutpat vel tellus ac, tinciduntfringilla massa. Etiam hendrerit dolor eget rutrum'}/>
        </Slider>
      </div>
    </div>
  );
};

const Card = ({ img, name, profession, p}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        color: "gray",
        height: '100%',
        marginTop:'40px'
      }}
    >
      <Avatar
        imgProps={{ style: { borderRadius: "50%" } }}
        src={img}
        style={{
          width: 120,
          height: 120,
          padding: 7,
          marginBottom: 20,
        }}
      />
      <h1 id='name'>{name}</h1>
      <h3 id='profession'>{profession}</h3>
      <p>
        {p}
      </p>
    </div>
  );
};

export default Testimonial;