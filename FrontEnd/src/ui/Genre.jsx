function Genre({genre }) {
	return (
		<div className="capitalize space-x-8 my-6">
			<p className="px-4 py-2 border-lightGrey border rounded-full inline">
				{genre}
			</p>
			<p className="px-4 py-2 border-lightGrey border rounded-full inline">
				comics
			</p>
		</div>
	);
}

export default Genre;
