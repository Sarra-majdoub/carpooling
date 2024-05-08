import React ,{useState}from 'react';
import RegisterHeader from './RegisterHeader';
import RegisterCard from './RegisterCard';
import ProfileCard from './ProfileCard';
import SentenceHeader from './SentenceHeader';
import SentenceCard from './SentenceCard';
import './Register.css';
import './RegisterCard.css';
import image1 from './img.png'
import image2 from './img_1.png'
import image3 from './img_2.png'

function Register() {
  const [image, setImage] = useState(null);
  return (
    <div className="Register">

        <RegisterHeader />
        <div className="RegisterContainer">
            <div className="Card">
                <RegisterCard image={image}/>
            </div>
            <div className="Relations">
                <ProfileCard setImage={setImage}/>
                <SentenceHeader/>
                <SentenceCard sentence={"Explore all the recent car pool offers in your area "} image ={image1}/>
                <SentenceCard sentence={"Save Time and Money without compromising comfort "} image ={image2}/>
                <SentenceCard sentence={"Engage with a large community of car pool enthusiasts "} image={image3}/>
            </div>
        </div>

    </div>
  );
}

export default Register;