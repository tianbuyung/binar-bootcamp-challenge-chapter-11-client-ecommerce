import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Col, Container, Row, Placeholder } from "react-bootstrap";
import Link from "next/link";

import Navbar from "@components/navbar";
import CategoryService from "@services/CategoryService";
import ProductService from "@services/ProductService";
import AuthService from "@services/AuthService";
import CardPlaceholder from "@components/CardPlaceholder";

const categoryService = new CategoryService();
const productService = new ProductService();

const fetchGetCategoryHandlerServer = async () => {
  try {
    return await categoryService.getAllCategories();
  } catch (error) {
    // silent e
  }
};

const HomePage = (props) => {
  const [loading, setLoading] = useState(false);
  const [getCategory, _] = useState(props.getCategoryProps);
  const [getProductPopular, setGetProductPopular] = useState([]);
  const fetchGetProductPopularHandler = useCallback(async () => {
    try {
      const data = await productService.getProductPopular();
      setGetProductPopular(data.productPopuler);
      setLoading(false);
    } catch (error) {
      // silent e
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchGetProductPopularHandler();
  }, [fetchGetProductPopularHandler]);

  return (
    <div>
      <Navbar variant="dark" bg="dark" />
      <Container>
        {!loading ? (
          <>
            <div className="my-3 p-3 bg-secondary rounded">
              <h3 className="text-start text-white h2 mt-3">Produk Terlaris</h3>
              <Row xs={1} md={5} className="g-4">
                {getProductPopular?.slice(0, 5).map((productPopuler) => {
                  return (
                    <Col key={productPopuler?.Product?.id}>
                      <Link
                        as={`product/${productPopuler?.Product?.id}`}
                        href="/product/[slug]"
                        className="text-black text-decoration-none"
                      >
                        <Card
                          style={{
                            height: "400px",
                            cursor: "pointer",
                          }}
                        >
                          <Card.Img
                            variant="top"
                            src="https://res.cloudinary.com/drqqwwpen/image/upload/v1596474380/pcs/not-available_g2vsum.jpg"
                          />
                          <Card.Body>
                            <Card.Title>
                              {productPopuler?.Product?.name}
                            </Card.Title>
                            <Card.Text>
                              Price: Rp. {productPopuler?.Product?.price}K
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  );
                })}
              </Row>
            </div>
            <h2 className="text-start h2 mt-3">Jelajahi Produk Kami</h2>
            {getCategory?.map((category) => {
              return (
                <div
                  className="my-3 p-3 bg-secondary rounded"
                  key={category.id}
                >
                  <Row className="align-items-center">
                    <Col lg={2} xl={2} className="text-start text-white">
                      <h3>{category.name}</h3>
                    </Col>
                    <Col lg="auto" xl="10">
                      <Row>
                        <Col className="text-end my-3">
                          <Link
                            className="text-white text-decoration-none"
                            as={`/product/category/${category.id}`}
                            href="/product/category/[slug]"
                          >
                            {category?.Products?.length < 5 ? (
                              ""
                            ) : (
                              <a className="text-light">Lihat Semua</a>
                            )}
                          </Link>
                        </Col>
                      </Row>
                      <Row xs={1} md={5} className="g-4">
                        {category?.Products?.slice(0, 5).map((product) => (
                          <Col key={product.id}>
                            <Link
                              as={`/product/${product.id}`}
                              href="/product/[slug]"
                              className="text-black text-decoration-none"
                            >
                              <Card
                                style={{
                                  height: "400px",
                                  cursor: "pointer",
                                }}
                              >
                                <Card.Img
                                  variant="top"
                                  src="https://res.cloudinary.com/drqqwwpen/image/upload/v1596474380/pcs/not-available_g2vsum.jpg"
                                />
                                <Card.Body>
                                  <Card.Title>{product.name}</Card.Title>
                                  <Card.Text>
                                    Price: Rp. {product.price}K
                                  </Card.Text>
                                </Card.Body>
                              </Card>
                            </Link>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </Row>
                </div>
              );
            })}
          </>
        ) : (
          <>
            <div className="my-3 p-3 bg-secondary rounded">
              <h3 className="text-start text-white h2 mt-3">Produk Terlaris</h3>
              <Row xs={1} md={5}>
                {Array.from(new Array(5)).map((_, i) => (
                  <Col key={i}>
                    <CardPlaceholder />
                  </Col>
                ))}
              </Row>
            </div>
            <h2 className="text-start h2 mt-3">Jelajahi Produk Kami</h2>
            <div className="my-3 p-3 bg-secondary rounded">
              <Row className="align-items-center">
                <Col lg={2} xl={2} className="text-start text-white">
                  <Placeholder
                    md={6}
                    as="h3"
                    animation="wave"
                    variant="primary"
                  />
                </Col>
                <Col lg="auto" xl="10">
                  <Row>
                    <Col className="text-end my-3">
                      <Placeholder xs={3} animation="wave" />
                    </Col>
                  </Row>
                  <Row xs={1} md={5} className="g-4">
                    {Array.from(new Array(5)).map((_, i) => (
                      <Col key={i}>
                        <CardPlaceholder />
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

HomePage.propTypes = {
  getCategoryProps: PropTypes.any.isRequired,
};

HomePage.getInitialProps = async () => {
  const authService = new AuthService();
  const props = {
    getCategoryProps: [],
  };

  try {
    const data = await fetchGetCategoryHandlerServer();
    props.getCategoryProps = data?.categories;

    return props;
  } catch (e) {
    // silent e

    return props;
  }
};

export default HomePage;
