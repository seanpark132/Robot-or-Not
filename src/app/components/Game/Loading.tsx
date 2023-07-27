export default function Loading() {
	return (
		<div className="text-center">
			<h1 className="text-5xl loading-color">Generating Game...</h1>
			<div className="parent">
				<div className="loading-moving"></div>
			</div>
		</div>
	);
}
