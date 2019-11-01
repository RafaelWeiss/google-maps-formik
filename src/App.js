import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import GoogleMap from 'google-map-react';
import { Form, FormGroup, Row, Col, Label, Input, Button } from 'reactstrap';
import './App.css';

class App extends Component {
    componentDidMount() {}

    onMarkerDragEnd = (event, setFieldValue) => {
        setFieldValue('latitude', event.latLng.lat());
        setFieldValue('longitude', event.latLng.lng());
    };

    handleFormSubmit = (formikValues) => {
        console.log(formikValues);
    };

    renderMarkers(map, maps, latitude, longitude, setFieldValue) {
        const marker = new maps.Marker({
            position: { lat: latitude, lng: longitude },
            draggable: true,
            map,
            title: 'GoogleMapsFormik'
        });
        marker.addListener('dragend', (event) => this.onMarkerDragEnd(event, setFieldValue));
    }

    render() {
        return (
            <div className="App">
                <Formik
                    initialValues={{ latitude: -27.5986393, longitude: -48.5187229 }}
                    onSubmit={(values) => {
                        this.handleFormSubmit(values);
                    }}>
                    {(props) => {
                        const { values, handleSubmit, setFieldValue } = props;

                        return (
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col>
                                        <Label for="latitude">Latitude: </Label>
                                        <Input type="text" name="latitude" id="latitude" value={values.latitude} disabled/>
                                    </Col>
                                    <Col>
                                        <Label for="latitude">Longitude: </Label>
                                        <Input type="text" name="logitude" id="logitude" value={values.longitude} disabled/>
                                    </Col>
                                    <Col>
                                        <Button type="submit">Submit</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup>
                                            <GoogleMap
                                                bootstrapURLKeys={{
                                                    key: 'AIzaSyB7sugvvSWrb_2mgEQ2pN9lrMMvYp1alEE',
                                                    libraries: ['places', 'geometry']
                                                }}
                                                yesIWantToUseGoogleMapApiInternals
                                                center={[values.latitude, values.longitude]}
                                                defaultZoom={12}
                                                //options={{ scrollwheel: false, streetViewControl: true }}
                                                style={{
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: 800
                                                }}
                                                onGoogleApiLoaded={({ map, maps }) =>
                                                    this.renderMarkers(map, maps, values.latitude, values.longitude, setFieldValue)
                                                }
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        );
    }
}

App.propTypes = {
    handleSubmit: PropTypes.func,
    setFieldValue: PropTypes.func,
    values: PropTypes.any
};
export default App;
