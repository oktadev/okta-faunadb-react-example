import React from 'react';

const Products = ({authState, products}) => {
  if (!authState?.isAuthenticated) {
    return (
      <div className='row'>
        <div className='col-lg-12'>
          <p>
            Hey there, it looks like you aren't logged in yet. To log in, click
            here.
          </p>
        </div>
      </div>
    );
  } else if (!products) {
    return (
      <div className='row'>
        <div className='col-lg-12'>
          <p>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <table className='table table-striped'>
        <thead>
        <tr>
          <th>Product</th>
          <th>Description</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>
        {products.map((product, i) => {
          return (
            <tr key={i}>
              <td>{product.data.name}</td>
              <td>{product.data.description}</td>
              <td>
                {'$ ' +
                  product.data.price
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
