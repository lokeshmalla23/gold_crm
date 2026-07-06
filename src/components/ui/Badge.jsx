export default function Badge({ children, variant = 'gray', className = '' }) {
  const variants = {
    gray: 'bg-gray-100 text-gray-700',
    green: 'bg-emerald-100 text-emerald-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-amber-100 text-amber-800',
    blue: 'bg-blue-100 text-blue-700',
    purple: 'bg-purple-100 text-purple-700',
    gold: 'bg-amber-100 text-amber-700 border border-amber-200',
    vip: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white',
    premium: 'bg-purple-100 text-purple-700',
    regular: 'bg-gray-100 text-gray-700'
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${variants[variant] || variants.gray} ${className}`}>
      {children}
    </span>
  );
}

export function StockBadge({ status }) {
  if (status === 'In Stock') return <Badge variant="green">In Stock</Badge>;
  if (status === 'Out of Stock') return <Badge variant="red">Out of Stock</Badge>;
  return <Badge variant="yellow">Restock</Badge>;
}

export function CustomerTypeBadge({ type }) {
  if (type === 'VIP') return <Badge variant="vip">VIP</Badge>;
  if (type === 'Premium') return <Badge variant="premium">Premium</Badge>;
  return <Badge variant="regular">Regular</Badge>;
}
