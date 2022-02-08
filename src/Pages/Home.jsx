import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import faunadb from 'faunadb';

import { withOktaAuth } from '@okta/okta-react';

import Header from '../Components/Header';
import Products from '../Components/Products';

export default withOktaAuth(
  class Home extends Component {
    constructor(props, context) {
      super(props, context);

      this.getProducts = this.getProducts.bind(this);
      this.handleResult = this.handleResult.bind(this);

      this.state = {
        products: undefined,
        pendingProducts: false,
      };
    }

    async getProducts(accessToken, cb) {
      this.setState({
        pendingProducts: true,
      });

      const client = new faunadb.Client({
        domain: 'db.fauna.com',
        secret: accessToken,
        scheme: 'https',
      });
      const q = faunadb.query;

      const {Documents, Collection} = q;

      client
        .query(
          q.Map(
            q.Paginate(Documents(Collection('products'))),
            q.Lambda((x) => q.Get(x))
          )
        )
        .then((result) => {
          cb(null, result);
        })
        .catch((err) => {
          cb(err, null);
        });
    }

    handleResult = (err, result) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          products: result.data,
          pendingProducts: false,
        });
      }
    };

    componentDidUpdate = (prevProps, prevState, snapshot) => {
      if (
        this.props.authState.isAuthenticated &&
        !this.state.pendingProducts &&
        !this.state.products
      ) {
        this.getProducts(
          this.props.authState.accessToken.accessToken,
          this.handleResult
        );
      }
    };

    render() {
      return (
        <Container>
          <Header
            authState={this.props.authState}
            oktaAuth={this.props.oktaAuth}
          ></Header>
          <Products
            authState={this.props.authState}
            products={this.state.products}
          ></Products>

          <footer className='text-muted'>
            <div className='container'>
              <p>A Small demo using Okta to authentication calls to FaunaDB</p>
              <p>By Nik Fisher</p>
            </div>
          </footer>
        </Container>
      );
    }
  }
);
