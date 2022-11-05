import React, { useCallback, useEffect, useState, memo } from "react";
import {
	Button,
	Col,
	Container,
	Form,
	FormGroup,
	InputGroup,
	ProgressBar,
	Row,
} from "react-bootstrap";
import PropTypes from "prop-types";
import CategoryService from "@services/CategoryService";
import ProductService from "@services/ProductService";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase";

const categoryService = new CategoryService();
const productService = new ProductService();

const AddProduct = ({ setIsFetching }) => {
	const [validated, setValidated] = useState(false);
	const [getCategory, setGetCategory] = useState([]);
	const [enteredProductName, setEnteredProductName] = useState("");
	const [enteredProductPrice, setEnteredProductPrice] = useState("");
	const [enteredProductCategory, setEnteredProductCategory] = useState("");
	const [enteredProductImage, setEnteredProductImage] = useState("");
	const [enteredProductVideo, setEnteredProductVideo] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [videoUrl, setVideoUrl] = useState("");
	const [progress, setProgress] = useState(0);

	const fetchGetCategoryHandler = useCallback(async () => {
		try {
			const data = await categoryService.getAllCategories();
			setGetCategory(data.categories);
		} catch (error) {
			// silent e
		}
	}, []);

	useEffect(() => {
		fetchGetCategoryHandler();
	}, [fetchGetCategoryHandler]);

	let formIsValid = false;

	if (
		enteredProductName &&
		enteredProductPrice &&
		enteredProductCategory &&
		imageUrl &&
		videoUrl
	) {
		formIsValid = true;
	}

	const addProductHandler = async (event) => {
		event.preventDefault();

		setIsFetching(false);

		const form = event.currentTarget;

		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		if (
			enteredProductName.trim().length === 0 ||
			enteredProductPrice.trim().length === 0 ||
			enteredProductCategory.trim().length === 0 ||
			!enteredProductImage
		) {
			return alert("Please provide a valid data!");
		}

		const body = {
			name: enteredProductName,
			price: enteredProductPrice,
			CategoryId: enteredProductCategory,
			imageUrl,
			videoUrl,
		};

		const data = await productService.addProduct(body);
		alert(data.message);
		if (data.message === "The name of product is already exist!") {
			setEnteredProductName(enteredProductName);
			setEnteredProductPrice(enteredProductPrice);
			setEnteredProductCategory(enteredProductCategory);
			setEnteredProductImage(enteredProductImage);
		} else {
			setIsFetching(true);
			setEnteredProductName("");
			setEnteredProductPrice("");
			setEnteredProductCategory("");
			setEnteredProductImage("");
			setImageUrl("");
			setProgress(0);
			setValidated(false);
		}
	};

	const productNameChangeHandler = (event) => {
		setEnteredProductName(event.target.value);
	};

	const productPriceChangeHandler = (event) => {
		setEnteredProductPrice(event.target.value);
	};

	const productCategoryChangeHandler = (event) => {
		setEnteredProductCategory(event.target.value);
	};

	const imageChangeHandler = (event) => {
		const image = event.target.files[0];
		setEnteredProductImage(image);
	};

	const videoChangeHandler = (event) => {
		const video = event.target.files[0];
		setEnteredProductVideo(video);
	};

	const imageUpload = (fileType, fileState, setUrlFile) => {
		if (!fileState) {
			alert(`Please provide a valid ${fileType}!`);
		} else {
			const metadata = {
				contentType: `${fileType}/image`,
			};
			const storageRef = ref(storage, `${fileType}s/${fileState.name}`);
			const uploadTask = uploadBytesResumable(
				storageRef,
				enteredProductImage,
				metadata
			);

			// Listen for state changes, errors, and completion of the upload.
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setProgress(progress);
					console.log(`Upload is ${progress} % done`);
					switch (snapshot.state) {
						case "paused":
							console.log("Upload is paused");
							break;
						case "running":
							console.log("Upload is running");
							break;
					}
				},
				(error) => {
					// A full list of error codes is available at
					// https://firebase.google.com/docs/storage/web/handle-errors
					switch (error.code) {
						case "storage/unauthorized":
							// User doesn't have permission to access the object
							break;
						case "storage/canceled":
							// User canceled the upload
							break;

						// ...

						case "storage/unknown":
							// Unknown error occurred, inspect error.serverResponse
							break;
					}
				},
				() => {
					// Upload completed successfully, now we can get the download URL
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						setUrlFile(downloadURL);
						console.log("File available at", downloadURL);
					});
				}
			);
		}
	};

	const videoUpload = (fileType, fileState, setUrlFile) => {
		if (!fileState) {
			alert(`Please provide a valid ${fileType}!`);
		} else {
			const metadata = {
				contentType: `${fileType}/mp4`,
			};
			const storageRef = ref(storage, `${fileType}s/${fileState.name}`);
			const uploadTask = uploadBytesResumable(
				storageRef,
				enteredProductImage,
				metadata
			);

			// Listen for state changes, errors, and completion of the upload.
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setProgress(progress);
					console.log(`Upload is ${progress} % done`);
					switch (snapshot.state) {
						case "paused":
							console.log("Upload is paused");
							break;
						case "running":
							console.log("Upload is running");
							break;
					}
				},
				(error) => {
					// A full list of error codes is available at
					// https://firebase.google.com/docs/storage/web/handle-errors
					switch (error.code) {
						case "storage/unauthorized":
							// User doesn't have permission to access the object
							break;
						case "storage/canceled":
							// User canceled the upload
							break;

						// ...

						case "storage/unknown":
							// Unknown error occurred, inspect error.serverResponse
							break;
					}
				},
				() => {
					// Upload completed successfully, now we can get the download URL
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						setUrlFile(downloadURL);
						console.log("File available at", downloadURL);
					});
				}
			);
		}
	};

	return (
		<Container className="bg-light mt-5" fluid="md">
			<Row className="justify-content-center">
				<Col lg={6}>
					<Form onSubmit={addProductHandler} validated={validated} noValidate>
						<h1>Add Product</h1>
						<FormGroup className="my-3">
							<Form.Control
								required
								id="productName"
								name="productName"
								placeholder="Product Name"
								type="text"
								onChange={productNameChangeHandler}
								value={enteredProductName}
							/>
							<Form.Control.Feedback type="invalid" className="text-start">
								Please provide a valid product name.
							</Form.Control.Feedback>
						</FormGroup>
						<InputGroup className="mb-3">
							<InputGroup.Text id="productPrice">Rp</InputGroup.Text>
							<Form.Control
								required
								placeholder="Product Price"
								type="number"
								onChange={productPriceChangeHandler}
								value={enteredProductPrice}
							/>
							<Form.Control.Feedback type="invalid" className="text-start">
								Please provide a valid product price.
							</Form.Control.Feedback>
						</InputGroup>
						<Form.Group as={Row} className="mb-3 text-start">
							<Form.Label htmlFor="categorySelect" column md={3}>
								Category
							</Form.Label>
							<Col md={9}>
								<Form.Select
									required
									as="select"
									id="categorySelect"
									name="categorySelect"
									type="select"
									onChange={productCategoryChangeHandler}
									value={enteredProductCategory}
								>
									<option value="">Please select your product category!</option>
									{getCategory.map((category) => {
										return (
											<option value={category.id} key={category.id}>
												{category.name}
											</option>
										);
									})}
								</Form.Select>
								<Form.Control.Feedback type="invalid" className="text-start">
									Please select a valid product category.
								</Form.Control.Feedback>
							</Col>
						</Form.Group>
						<InputGroup className="mb-3">
							<Form.Control
								required
								placeholder="Upload image"
								type="file"
								onChange={imageChangeHandler}
							/>
							<Form.Control.Feedback
								type="invalid"
								tooltip
								className="text-start"
							>
								Please provide a valid image file.
							</Form.Control.Feedback>
							<Button
								onClick={() =>
									imageUpload("image", enteredProductImage, setImageUrl)
								}
							>
								Upload Image
							</Button>
						</InputGroup>
						<InputGroup className="mb-3">
							<Form.Control
								required
								placeholder="Upload video"
								type="file"
								onChange={videoChangeHandler}
							/>
							<Form.Control.Feedback
								type="invalid"
								tooltip
								className="text-start"
							>
								Please provide a valid video file.
							</Form.Control.Feedback>
							<Button
								onClick={() =>
									videoUpload("video", enteredProductVideo, setVideoUrl)
								}
							>
								Upload Video
							</Button>
						</InputGroup>
						{progress > 0 ? (
							<ProgressBar now={progress} className="mb-3" />
						) : (
							""
						)}
						<Button className="mb-3" type="submit" disabled={!formIsValid}>
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

AddProduct.propTypes = {
	setIsFetching: PropTypes.func.isRequired,
};

export default memo(AddProduct);
