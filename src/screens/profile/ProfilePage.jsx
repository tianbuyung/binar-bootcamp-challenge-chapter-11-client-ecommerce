import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import BreadcrumbComponent from "@components/breadcrumbs/BreadCrumbs";
import Navbar from "@components/navbar";
import UserService from "@services/UserService";
import OrderService from "@services/OrderService";
import ProfilePicture from "./components/ProfilePicture";
import SocialMedia from "./components/SocialMedia";
import ProfileMenu from "./components/ProfileMenu";
import classes from "./ProfilePage.module.css";
import { withAuth } from "../../hoc/withAuth";

const userService = new UserService();
const orderService = new OrderService();

const ProfilePage = () => {
	const [profile, setProfile] = useState("");
	const [badge, setBadge] = useState("");
	const [orders, setOrders] = useState("");
	const [isfetching, setIsFetching] = useState(false);

	useEffect(() => {
		const fetchGetUserHandler = async () => {
			try {
				const getUser = await userService.getUser();
				const getBadge = await userService.getBadge();
				const getOrders = await orderService.getOrders();
				setProfile(getUser);
				setBadge(getBadge);
				setOrders(getOrders);
			} catch (error) {
				// silent error
			}
		};

		fetchGetUserHandler();
	}, [isfetching]);

	const userTwitter = profile.user?.twitter;
	const userInstagram = profile.user?.instagram;
	const userFacebook = profile.user?.facebook;

	let socialMedias = "";

	if (!userTwitter && !userInstagram && !userFacebook) {
		socialMedias = "";
	} else {
		socialMedias = [
			{
				name: "Twitter",
				icon: "bi bi-twitter",
				data: userTwitter,
				link: `https://twitter.com/${profile.user?.twitter}`,
			},
			{
				name: "Instagram",
				icon: "bi bi-instagram",
				data: userInstagram,
				link: `https://www.instagram.com/${profile.user?.instagram}`,
			},
			{
				name: "Facebook",
				icon: "bi bi-facebook",
				data: userFacebook,
				link: `https://www.facebook.com/${profile.user?.facebook}`,
			},
		];
	}

	const breadcrumbs = [
		{ title: "Home", isActive: false, href: "/" },
		{ title: "Profile", isActive: true },
	];

	return (
		<div>
			<Navbar variant="dark" bg="dark" />
			<Container className={classes["main-body"]}>
				<BreadcrumbComponent data={breadcrumbs} />
				<Row className="gutters-sm mb-3 justify-content-center">
					<Col md={12}>
						<ProfilePicture
							profile={profile}
							badge={badge}
							setIsFetching={setIsFetching}
						/>
					</Col>
				</Row>
				<Row className="gutters-sm mb-3">
					<Col md={12}>
						<ProfileMenu profile={profile} badge={badge} orders={orders} />
					</Col>
				</Row>
				<Row className="gutters-sm">
					<Col md={12}>
						{socialMedias && <SocialMedia socialMedias={socialMedias} />}
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default withAuth(ProfilePage);
