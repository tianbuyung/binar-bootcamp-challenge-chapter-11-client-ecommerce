import React, { useEffect, useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

const ShowPdf = () => {
	const [document, setDocument] = useState(null);
	const defaultLayoutPluginInstance = defaultLayoutPlugin();

	useEffect(() => {
		getDownloadURL(ref(storage, "pdf/example.pdf")).then((url) => {
			console.log(url);
			setDocument(url);
		});
	}, []);

	return (
		<>
			{document !== null && (
				<Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
					<Viewer fileUrl={document} plugins={[defaultLayoutPluginInstance]} />
				</Worker>
			)}
		</>
	);
};

export default ShowPdf;

// source: https://www.youtube.com/watch?v=WBpHWm8FL_E
