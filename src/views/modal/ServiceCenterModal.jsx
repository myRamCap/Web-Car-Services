import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Autocomplete, Card, CardMedia, FormControlLabel, IconButton, Radio, RadioGroup, TextField } from '@mui/material';
import Province from '../../data/JSON/refProvince.json'
import City from '../../data/JSON/refCityMun.json'
import Barangay from '../../data/JSON/refBrgy.json'
import MapsModal from './MapsModal';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '../../axios-client';
import Swal from 'sweetalert2'
import ImageModal from './ImageModal';
import NoImage from '../../assets/images/No-Image.png';

export default function ServiceCenterModal(props) {
  const location = useLocation()
  const navigate = useNavigate()
  const [errors, setErrors] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [country, setCountry] = useState('Philippines')
  const [municipality, setMunicipality] = useState([])
  const [brgy, setBrgy] = useState([])
  const [valCityMun, setValCityMun] = useState(null);
  const [valBrgy, setValBrgy] = useState(null);
  const longi = localStorage.longi ?? ''
  const lati = localStorage.lati ?? ''
  const id = props.Data?.id ?? null
  const [serviceCenter, setServiceCenter] = useState({
    id: null,
    name: "",
    category: "",
    country: "Philippines",
    house_number: "",
    barangay: "",
    municipality: "",
    province: "",
    longitude: "",
    latitude: "",
    branch_manager_id: "",
    image: "",
  })

  useEffect(() => {
    if (id) {
      setServiceCenter({
        ...serviceCenter,
        id: props.Data.id,
        name: props.Data.name,
        category: props.Data.category,
        country: props.Data.country,
        house_number: props.Data.house_number,
        barangay: props.Data.barangay,
        municipality: props.Data.municipality,
        province: props.Data.province,
        longitude: props.Data.longitude,
        latitude: props.Data.latitude,
        branch_manager_id: props.Data.branch_manager_id,
        image: props.Data.image,
      })
    }
  }, [id])

  const handleChangeProvince = (event, newValue) => {
    const filterCity = City.RECORDS.filter((data) => data.provCode === newValue.provCode)
    setMunicipality(filterCity)
    setValCityMun(null);
    setValBrgy(null);
    // console.log(newValue)
    setServiceCenter({
      ...serviceCenter,
      province: newValue.provDesc,
    })
  }
 
  const handleChangeMunicipality = (event, newValue) => {
    setValCityMun(newValue);
    const filterBrgy = Barangay.RECORDS.filter((data) => data.citymunCode === newValue.citymunCode)
    setBrgy(filterBrgy) 
    setValBrgy(null);
    // console.log(newValue)
    setServiceCenter({
      ...serviceCenter,
      municipality: newValue.citymunDesc,
    })
  }

  const handleChangeBrgy = (event, newValue) => {
    setValBrgy(newValue)
    setServiceCenter({
      ...serviceCenter,
      barangay: newValue.brgyDesc,
    })
  }
 
  const optionsProvince = Province.RECORDS.map((option) => {
    const firstLetter = option.provDesc[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  })

  const optionsCityMun = municipality.map((option) => {
    const firstLetter = option.citymunDesc[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  })

  const optionsBarangay = brgy.map((option) => {
    const firstLetter = option.brgyDesc[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  })

  const onSubmit = (ev) => {
    ev.preventDefault()
    const payload = {...serviceCenter}
    // console.log(payload)
    axiosClient.post('/servicecenter', payload)
    .then(({}) => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: "Your data has been successfully saved!",
      }).then(() => {
        navigate('/servicecenter' , {state:  'success' })
      })
    })
    .catch(err => {
      const response = err.response
      if (response && response.status === 422) {
        console.log(response.data.errors)
        setErrors(response.data.errors)
      }
    }) 
  }

  const onclickMap = (ev) => {
    setShowModal(true)
  }

  const onclickImage = (ev) => {
    setShowImageModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
    // setServicesInfo([])
  }

  const handleImageClose = () => {
    setShowImageModal(false)
    // setServicesInfo([])
  }

  const onRadioChange = (event, newValue) => {
    setServiceCenter({
      ...serviceCenter,
      category: newValue,
    })
  }

  const onImageChoose = (ev) => {
    const file = ev.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      setServiceCenter({
        ...serviceCenter,
        image: reader.result,
      }) 
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (props.show == false) {
      setValBrgy(null);
      setValCityMun(null);
      setServiceCenter({
        ...serviceCenter,
        id: null,
        name: "",
        category: "",
        country: "Philippines",
        house_number: "",
        barangay: "",
        municipality: "",
        province: "",
        longitude: "",
        latitude: "",
        branch_manager_id: "",
        image: "",
      })
    }
  }, [props.show])
  useEffect(() => {
    
    if (location.state == 'coordinates'){
      setServiceCenter({
        ...serviceCenter,
        longitude: longi,
        latitude: lati,
      })
      // getServices()
      setShowModal(false)
      location.state = null
    }
  },[location.state])

  return (
    <div id="serviceCenterModal">
        <Modal show={props.show} onHide={props.close} backdrop="static" size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Create Service Center</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-main">
            {errors && 
              <div className="sevices_logo_errors">
                {Object.keys(errors).map(key => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            }
            <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-form-control-label-placement"
                    name="category"
                    onChange={onRadioChange}
                    value={serviceCenter.category ?? null}
                    // defaultValue="delearship"
                  >
                    <FormControlLabel value="delearship" control={<Radio />} label="DEALERSHIP"/>
                    <FormControlLabel value="nondelearship" control={<Radio />} label="NON-DEALERSHIP"/>
                  </RadioGroup>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6}>
                  <TextField type="text" value={serviceCenter.name} onChange={ev => setServiceCenter({...serviceCenter, name: ev.target.value})} id="name" label="Name" variant="outlined" fullWidth/>
                </Col>

                <Col xs={12} md={6}> 
                  <TextField type="text" onChange={ev => setServiceCenter({...serviceCenter, country: ev.target.value})} id="country" label="Country" variant="outlined" value={country} disabled fullWidth/>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6}>
                  <TextField type="text" onChange={ev => setServiceCenter({...serviceCenter, house_number: ev.target.value})} id="street" label="House Number / Street" variant="outlined" fullWidth/>
                </Col>

                <Col xs={12} md={6}> 
                  <Autocomplete
                    disableClearable
                    value={serviceCenter.province}
                    options={optionsProvince.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    onChange={handleChangeProvince}
                    getOptionLabel={(options) => options.provDesc ? options.provDesc.toString() : serviceCenter.province}  
                    isOptionEqualToValue={(option, value) => option.provDesc === value.provDesc}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label="Province"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                        />
                    )}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6}>
                  <Autocomplete
                    disableClearable
                    onChange={handleChangeMunicipality}
                    options={optionsCityMun.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    value={serviceCenter.municipality ?? valCityMun  }
                    getOptionLabel={(options) =>  options.citymunDesc ? options.citymunDesc.toString() : serviceCenter.municipality ?? null}  
                    isOptionEqualToValue={(option, value) => option.citymunDesc === value.citymunDesc}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Municipality"
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                        }}
                      />
                    )}
                  />
                </Col>

                <Col xs={12} md={6}> 
                  <Autocomplete
                    disableClearable
                    onChange={handleChangeBrgy}
                    options={optionsBarangay.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    value={serviceCenter.barangay ?? valBrgy}
                    getOptionLabel={(options) => options.brgyDesc ? options.brgyDesc.toString() : serviceCenter.barangay ?? null}
                    // isOptionEqualToValue={(option, value) => option.brgyDesc === value.brgyDesc}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Barangay"
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                        }}
                      />
                    )}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6}>
                  <TextField type="text" id="longitude" label="Longitude" value={serviceCenter.longitude} variant="outlined" fullWidth/>
                </Col>
                <Col xs={12} md={5}> 
                  <TextField type="text" id="latitude" label="Latitude" value={serviceCenter.latitude}  variant="outlined" fullWidth/>
                </Col>
                <Col xs={12} md={1} > 
                  {/* <Link to="/data"> */}
                    <IconButton className="globe-icon" onClick={onclickMap}>
                      <box-icon name='globe' className="globe-icon"></box-icon>
                    </IconButton>
                  {/* </Link> */}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6}>
                  <TextField type="text" value={serviceCenter.branch_manager_id}  onChange={ev => setServiceCenter({...serviceCenter, branch_manager_id: ev.target.value})}  id="branchManager" label="Branch Manager" variant="outlined" fullWidth/>
                </Col>
                <Col xs={12} md={5}> 
                    <input accept=".jpg, .jpeg, .png" onChange={onImageChoose} className="fileUpload" name="arquivo" id="arquivo" type="file" />
                </Col>
                <Col xs={12} md={1}> 
                    <Card raised className='sc-image' onClick={onclickImage}>
                        <CardMedia className='sc-image' src={serviceCenter.image ? serviceCenter.image :  NoImage} 
                            component="img"
                            height="40"
                            alt={"alt"}
                            sx={{  objectFit: "contain" }}
                            />
                    </Card>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row >
                <Col xs={12} md={12}>
                  <Button variant="success"  type="submit">Save Changes</Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
            </Modal.Body>
        </Modal>

        <MapsModal show={showModal} close={handleClose} id={1} /> 
        <ImageModal show={showImageModal} close={handleImageClose}  image={serviceCenter.image} /> 
    </div>
  )
}
