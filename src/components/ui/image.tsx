import { useState, useMemo } from 'react';
import { Icon } from './icon';
import { ImageIcon } from 'lucide-react';

const fallbackStyles = [
  // Dark glass
  'bg-black/20 backdrop-blur-2xl shadow-xl',
];

export default function Image({
  src,
  alt = '',
  className = '',
  fallbackClassName = '',
  ...props
}) {
  const [hasError, setHasError] = useState(false);

  const randomStyle = useMemo(() => {
    const index = Math.floor(Math.random() * fallbackStyles.length);
    return fallbackStyles[index];
  }, []);

  const isValidSrc = typeof src === 'string' && src.trim() !== '';

  if (!isValidSrc || hasError) {
    return (
      <div
        className={`flex items-center justify-center text-white text-sm font-medium ${randomStyle} ${fallbackClassName} ${className}`}
        {...props}
      >
        <Icon icon={ImageIcon} className="w-6 h-6" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${className}`}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
