import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Prices from "../components/Prices";
import Size from "../components/Size";
import { addToCart } from "../slice/cartSlice";
class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: 0,
    };
  }
  handler = (id) => {
    this.setState({
      image: id,
    });
  };

  render() {
    const addCart_style = {
      pointerEvents: this.props.carts.attributes.length === 0 ? "none" : "fill",
      cursor:
        this.props.carts.attributes.length === 0 ? "not-allowed" : "pointer",
    };
    const { name, id, gallery, description, prices, attributes, brand } =
      this.props.state.productDescription.product;
    let regex = /(<([^>]+)>)/gi;
    let result = description.replace(regex, "");
    return (
      <ProductMain key={id}>
        <ProductLeft>
          <LeftImage>
            {gallery.map((gallery, index) => (
              <img
                src={gallery}
                alt=""
                key={gallery}
                onClick={() => this.handler(index)}
              />
            ))}
          </LeftImage>
          <RightImage>
            <img src={gallery[`${this.state.image}`]} alt="" />
          </RightImage>
        </ProductLeft>
        <ProductRight>
          <ProductBrand key={brand}>{brand}</ProductBrand>
          <ProductName key={name}>{name}</ProductName>
          <ProductSize>
            <div key={attributes}>
              {attributes.map((s, index) => (
                <Size
                  size={s}
                  key={index}
                  index={index}
                  productId={id}
                  id={s.id}
                />
              ))}
            </div>
          </ProductSize>
          <ProductPrice>
            <h3>Price</h3>
            <div>
              {prices.map((s, index) => (
                <Prices price={s} key={index} />
              ))}
            </div>
          </ProductPrice>
          <AddCart style={addCart_style}>
            <span
              onClick={() =>
                this.props.cart(this.props.state.productDescription.product, id, prices)
              }
            >
              Add To Cart
            </span>
          </AddCart>
          <ProductDescriptions>{result}</ProductDescriptions>
        </ProductRight>
      </ProductMain>
    );
  }
}
const ProductMain = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
  height: 100%;
`;
const ProductLeft = styled.div`
  flex: 0.6;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const RightImage = styled.div`
  img {
    width: 450px;
  }
`;
const LeftImage = styled.div`
  display: flex;
  flex-direction: column;
  width: 65px;
  img {
    padding-bottom: 10px;
  }
`;
const ProductRight = styled.div`
  flex: 0.4;
  padding: 50px;
  display: flex;
  flex-direction: column;
`;
const ProductName = styled.h2`
  margin-bottom: 70px;
  font-size: 40px;
  font-weight: 500;
`;
const ProductBrand = styled.h1`
  margin-bottom: 10px;
  font-size: 34px;
`;
const ProductSize = styled.div`
  margin-bottom: 40px;
`;
const ProductPrice = styled.div`
  margin-bottom: 30px;
  h3 {
    font-size: 25px;
    font-style: normal;
    line-height: 30px;
    letter-spacing: 0em;
  }
  p {
    font-size: 28px;
    font-style: normal;
    line-height: 60px;
    letter-spacing: 0em;
  }
`;
const AddCart = styled.div`
  height: 60px;
  cursor: pointer;
  width: 350px;
  background-color: #5ece7b;
  margin-bottom: 40px;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 20px;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;
const ProductDescriptions = styled.p`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: left;
`;
const mapStateToProps = (state) => {
  return {
    state: state.product,
    carts: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    cart: (product, id, prices) => dispatch(addToCart(product, id, prices)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDescription);
