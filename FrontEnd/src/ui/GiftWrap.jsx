import GiftPink from "/Images/pinkBoxes.jpg";

function GiftWrap() {
	return (
		<div className="flex gap-6 my-12">
			<img src={GiftPink} className="h-24 w-24" alt="Pink Box" />
			<div className="space-y-4">
				<strong>The Pink Box</strong>
				<p className="text-sm">
					All our products come wrapped to give as a gift to your
					friends or <strong className="capitalize">youself</strong>
				</p>
				<p></p>
			</div>
		</div>
	);
}

export default GiftWrap;
