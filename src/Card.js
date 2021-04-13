import './Card.css';

const Card = ({ image, value, suit, angle }) => {
  return (
    <img
      className='card'
      src={image}
      alt={`${value} of ${suit}`}
      style={{ transform: `rotate(${angle}deg)` }}
    />
  );
};

export default Card;
