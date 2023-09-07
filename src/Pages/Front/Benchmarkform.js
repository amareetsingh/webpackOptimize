import React, { useEffect, useState } from 'react';
import styles from './evalinator.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Benchmarkform(props) {

	return (

                <>
                    <div className={styles.Benchmarkformpage}>
                        <div className={styles.benchmarkformMain}>
                        <Form>
                           <h2 className={styles.headingform}>Benchmark Yourself On These Parameters</h2>
                           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                           <Form.Label>Type of Business</Form.Label>
                            <Form.Select aria-label="Default select example" >
                                <option value="">Select a response</option>
                                <option value="">Coaching</option>
                                <option value="">Enterprise Software</option>
                                <option value="">Marketing Services</option>
                                <option value="">Management Consulting</option>
                                <option value="">IT Services &amp; Consulting</option>
                                <option value="">Software as a Service</option>
                                <option value="">Other</option>
                            </Form.Select>
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                           <Form.Label>Function</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option value="">Select a response</option>
                                <option value="">Sales</option>
                                <option value="">Marketing</option>
                                <option value="">Product</option>
                            </Form.Select>
                          </Form.Group>
                          <div className={styles.textCenter}>
                            <Button variant="primary" type="submit">
                             Continue
                            </Button>
                            </div>
                        </Form>
                        </div>
                    </div>
                </>
	);
}

export default Benchmarkform;
