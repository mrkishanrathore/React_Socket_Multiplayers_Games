import "./Card.css";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import {useGameName} from '../Context';

const GameCard = ({ image, title, description, game }) => {

  const {updateGameName} = useGameName();
  

  return (
    <div className={"card"}>
      <img src={image} alt={title} className={"cardImage"} />
      <div className={"cardContent"}>
        <h2 className={"cardTitle"}>{title}</h2>
        <p className={"cardDescription"}>{description}</p>
        <Link to="/JoinCreateRoom" className={"playButton"} onClick = {()=>updateGameName(game)}>Play</Link>
      </div>
    </div>
  );
};

GameCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    game: PropTypes.string.isRequired,
  };
  

export default GameCard;
