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
				<ReactPlayer url="https://firebasestorage.googleapis.com/v0/b/binar-e-commerce-007.appspot.com/o/videos%2Fcontoh-video-shoes.mp4?alt=media&token=db5c9d95-1960-4b0f-9840-a48dbbf610b4" />
			)}
		</div>
	);
};

export default ShowVideo;

// source: https://next-with.moxy.tech/docs/recipes/video-player
