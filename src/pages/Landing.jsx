import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Landing() {
    return (
        <>
            <section className='container d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
                <Row className='d-flex align-items-center justify-content-center'>
                    <Col>
                        <img src="/Posts-amico.png" alt="" className='img-fluid w-100' />
                    </Col>
                    <Col>
                        <h2>Post CRUD Operation</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto provident,
                            velit sunt odit quas impedit, totam consequatur non, ut aperiam sit. Cum in a
                            vero odit mollitia voluptas consequatur blanditiis.
                        </p>
                        <Link to={'/dash'} className='btn btn-info w-50'>Go to Dashboard ...</Link>
                    </Col>
                </Row>
            </section>
        </>
    )
}

export default Landing