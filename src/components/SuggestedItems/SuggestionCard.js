import LottieControl from './Lottie';

const SuggestionCard = ({ item }) => {
  const file = require('../../assets/lottiefiles/' +
    item.toLowerCase() +
    '.json');

  return (
    <div className='card'>
      <div className='card-img'>
        <LottieControl animationData={file} />
      </div>

      <h2 className='primary-text'>
        {' '}
        {item} <br />
      </h2>
    </div>
  );
};
export default SuggestionCard;
