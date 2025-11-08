import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ rating, numReviews, showReviews = true, size = 'normal' }) => {
  const stars = [];
  const sizeClass = size === 'small' ? 'text-xs' : 'text-sm';

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-300" />);
    }
  }

  return (
    <div className="flex items-center gap-1">
      <div className={`flex gap-0.5 ${sizeClass}`}>{stars}</div>
      {showReviews && numReviews !== undefined && numReviews > 0 && (
        <span className={`text-gray-500 dark:text-gray-400 ml-1 ${size === 'small' ? 'text-xs' : 'text-sm'}`}>
          ({numReviews})
        </span>
      )}
    </div>
  );
};

export default Rating;
