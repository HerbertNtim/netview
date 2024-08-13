const MovieSliderSkeleton = () => {
	return (
		<div className='animate-pulse'>
			<div className='bg-gray-700 rounded-md w-[100px] h-6 mb-4 shimmer'></div>
			<div className='bg-gray-700 rounded-md w-[250px] h-[100px] mb-4 shimmer'></div>
			<div className='bg-gray-700 rounded-md w-[100px] h-6 mb-2 shimmer'></div>
		</div>
	);
};
export default MovieSliderSkeleton;
