import React from 'react';
import { Container, Table } from 'react-bootstrap'

const Products = ({ authState, products }) => {


    if (!authState.isAuthenticated) {
        return <div>
            <p>Hey there, it looks like you aren't logged in yet.  To log in, click here.</p>
        </div>
    }
    else if (!products) {
        return <Container>
            Loading....
        </Container>
    }

    return (
        <Container>
            <Table className="table table-striped">
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
                                <td>{'$ ' + product.data.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                            </tr>)
                    })}
                </tbody>
            </Table>
        </Container>

    );
};
export default Products;