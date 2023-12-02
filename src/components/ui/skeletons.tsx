const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function HomeVideoListSkeleton() {
  return (
    <div className={`${shimmer} grid grid-cols-1 laptop:grid-cols-3 desktop:grid-cols-5 gap-4 mt-4 mb-4`}>
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className='bg-white rounded-lg shadow-md p-4 animate-pulse'>
          <div className='bg-gray-300 h-60 w-full rounded-lg'></div>
          <div className='h-4 my-2 bg-gray-300 rounded-lg'></div>
          <div className='h-4 my-2 bg-gray-300 rounded-lg'></div>
          <div className='h-4 my-2 bg-gray-300 rounded-lg'></div>
        </div>
      ))}
    </div>
  );
}
