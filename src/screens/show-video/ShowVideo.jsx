import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";

const ShowVideo = () => {
	const [hasWindow, setHasWindow] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setHasWindow(true);
		}
	}, []);

	return (
		<div className="d-flex align-items-center justify-content-center">
			{hasWindow && (
				<ReactPlayer url="https://firebasestorage.googleapis.com/v0/b/binar-e-commerce-007.appspot.com/o/videos%2FMy%20bansky%20NFT.mp4?alt=media&token=71947e92-89b5-4dd4-a7a3-c720b1c39a2d" />
			)}
		</div>
	);
};

export default ShowVideo;

// source: https://next-with.moxy.tech/docs/recipes/video-player
