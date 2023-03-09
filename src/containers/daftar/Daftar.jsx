import React, { useState, useEffect } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
// import Feature from '../../components/feature/Feature';
import './daftar.css';
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select/'

const Daftar = () => {
    const getPropinsi = async () => {
        try {
            const response = await axios.get('/apibpfk/propinsi')
            // console.log(response.data.data[0].nama)
            // console.log(response)

            const propinsiTemplate = response.data.data.map((value, index) => {
                return {
                    id: value.id,
                    nama: value.nama
                }
            })
            setPropinsi(propinsiTemplate)
            
        } catch (error) {
            
        }
        // console.log(propinsi)
    }

    const [token, setToken] = useState('')
    const [expire, setExpire] = useState('')
    const navigate = useNavigate()
    const [propinsi, setPropinsi] = useState([])
    const [kota, setKota] = useState([])
    const [kepemilikan, setKepemilikan] = useState([])
    const [data, setData] = useState([{
        jenis_user_id: 4,
        nama_institusi: "",
        propinsi_id: 0,
        kota_id: 0,
        alamat: "",
        kepemilikan_id: 0,
        no_telp: 0,
        website: "",
        media_sosial: "",
        nama_pj: "",
        nama_pj_lab_kalibrasi: "",
        nama_pj_mutu: "",
        contact_person: "",
        nomor_izin_operasional: "",
        tanggal_izin_operasional: "1971-01-01",
        email: "",
        dokumen_izin_operasional: "tes"
    }])

    useEffect(() => {
        // refreshToken()
        // getPropinsi()
        // getKepemilikan()
        // console.log(propinsi)
        // eslint-disable-next-line react-hooks/exhaustive-deps

        // if (!propinsi) {
        //     getPropinsi();
        //     console.log(propinsi)
        // } else {
            
        // }
        // console.log(data)
    },[])

    const refreshToken = async() => {
        try {
            // const response = await axios.get('/apibpfk/token')
            // setToken(response.data.accessToken)
            // const decoded = jwt_decode(response.data.accessToken)
            // setExpire(decoded.exp)
            // getDataRS(decoded.rsId)
            getPropinsi()
        } catch (error) {
            if(error.response) {
                // navigate('/')
            }
        }
        // alert(expire)
    }

    const axiosJWT = axios.create()
    axiosJWT.interceptors.request.use(async(config) => {
        const currentDate = new Date()
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('/apibpfk/token')
            config.headers.Authorization = `Bearer ${response.data.accessToken}`
            setToken(response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken)
            setExpire(decoded.exp)
        }
        return config
    }, (error) => {
        return Promise.reject(error)
    })
    

    const getKepemilikan = async () => {
        try {
            const response = await axios.get('/apibpfk/kepemilikan')
            // console.log(response.data.data[0].nama)
            // console.log(response)

            const kepemilikanTemplate = response.data.data.map((value, index) => {
                return {
                    id: value.id,
                    nama: value.nama
                }
            })
            setKepemilikan(kepemilikanTemplate)
            
        } catch (error) {
            
        }
        // console.log(kepemilikan)
    }

    const getKota = async (id) => {
        try {
            const response = await axios.get('/apibpfk/kota?propid='+id)
            // console.log(response.data.data[0].nama)
            // console.log(response)
            const kotaTemplate = response.data.data.map((value, index) => {
                return {
                    value: value.id,
                    label: value.nama
                }
            })
            setKota(kotaTemplate)
            
            // return kotaTemplate
        } catch (error) {
            console.log(error)
        }
        // console.log(kota)
    }

    // const Add = kota.map(value, index)

    function refreshPage() {
        window.location.reload(false);
    }

    const changeHandlerKota = (selectedOption) => {
        // console.log(selectedOption.value)
        let newData = [...data]
        newData[0].kota_id =parseInt(selectedOption.value)
        setData(newData)
        // console.log(data)
    }

    const changeHandler = (event) => {
        // alert('hi')
        let newData = [...data]
        const name = event.target.name
        if (name === 'jenis_user_id') {
            newData[0].jenis_user_id =parseInt(event.target.value)
        } else if (name === 'nama_institusi') {
            newData[0].nama_institusi = event.target.value
        } else if (name === 'propinsi_id') {
            newData[0].propinsi_id =parseInt(event.target.value)
            const propId = event.target.value
            getKota(propId)
        } else if (name === 'kota_id') {
            newData[0].kota_id =parseInt(event.target.value)
            alert('hi')
        } else if (name === 'alamat') {
            newData[0].alamat = event.target.value
        } else if (name === 'kepemilikan_id') {
            newData[0].kepemilikan_id =parseInt(event.target.value)
        } else if (name === 'no_telp') {
            newData[0].no_telp =parseInt(event.target.value)
        } else if (name === 'website') {
            newData[0].website = event.target.value
        } else if (name === 'media_sosial') {
            newData[0].media_sosial = event.target.value
        } else if (name === 'nama_pj') {
            newData[0].nama_pj = event.target.value
        } else if (name === 'nama_pj_lab_kalibrasi') {
            newData[0].nama_pj_lab_kalibrasi = event.target.value
        } else if (name === 'nama_pj_mutu') {
            newData[0].nama_pj_mutu = event.target.value
        } else if (name === 'contact_person') {
            newData[0].contact_person = event.target.value
        } else if (name === 'nomor_izin_operasional') {
            newData[0].nomor_izin_operasional = event.target.value
        } else if (name === 'tanggal_izin_operasional') {
            newData[0].tanggal_izin_operasional = event.target.value
        } else if (name === 'email') {
            newData[0].email = event.target.value
        } else if (name === 'dokumen_izin_operasional') {
            
        } 
        setData(newData)

        // console.log(data)
    }
    

    // const Add = addrtype.map(Add => Add
    //     )

    const handleAddrTypeChange = (e) => {
        // console.clear(), 
        // console.log(e.target.value)
        // getKota(e.target.value)
        let newData = [...data]
        newData[0].propinsi_id =parseInt(e.target.value)
        setData(newData)
        console.log(data)
        console.log(e.target.name)
    }

    const simpanQuery = async() => {
        // e.preventDefault()
        try {
            const dataArray = data.map((value, index) => {
                return {
                    "jenis_user_id": value.jenis_user_id,
                    "nama_institusi": value.nama_institusi,
                    "propinsi_id": value.propinsi_id,
                    "kota_id": value.kota_id,
                    "alamat": value.alamat,
                    "kepemilikan_id": value.kepemilikan_id,
                    "no_telp": value.no_telp,
                    "website": value.website,
                    "media_sosial": value.media_sosial,
                    "nama_pj": value.nama_pj,
                    "nama_pj_lab_kalibrasi": value.nama_pj_lab_kalibrasi,
                    "nama_pj_mutu": value.nama_pj_mutu,
                    "contact_person": value.contact_person,
                    "nomor_izin_operasional": value.nomor_izin_operasional,
                    "tanggal_izin_operasional": value.tanggal_izin_operasional,
                    "email": value.email,
                    "dokumen_izin_operasional": value.dokumen_izin_operasional
                }
            })

            const result = await axios.post('/apibpfk/institusi',{
                data : dataArray
            })
            alert('Registrasi user berhasil, mohon menunggu proses validasi data, password anda akan dikirimkan melalui email terdaftar.')
            
            // setTimeout(() => {
            //     navigate('/daftar')
            // }, 1000);
            refreshPage()
        } catch (error) {
            alert('Data gagal disimpan, pastikan telah mengisi semua field')
            console.log(error)
        }
    }

    const simpan = () => {
        confirmAlert({
            title: 'Konfirmasi Simpan Data',
            message: 'Apakah Anda Yakin? ',
            buttons: [
                {
                    label: 'Ya',
                    onClick: () => {
                        simpanQuery()
                        // alert('Registrasi user berhasil, mohon menunggu proses validasi data, password anda akan dikirimkan melalui email terdaftar.')
                    }
                },
                {
                    label: 'Tidak'
                }
            ]
        })
    }

    const batal = () => {
        confirmAlert({
            title: 'Konfirmasi Pembatalan',
            message: 'Apakah Anda Yakin? ',
            buttons: [
                {
                    label: 'Ya',
                    onClick: () => {
                        refreshPage()
                    }
                },
                {
                    label: 'Tidak'
                }
            ]
        })
    }

    return (
        <div className="gpt3__daftar section__margin" id="wgpt3">
            <div className="gpt3__daftar-heading">
                <h3 className="gradient__text">PENDAFTARAN USER LOGIN BPFK/IPFK - RMC / UNIT PEMELIHARAAN PERALATAN KESEHATAN</h3>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Kategori</h3>
                <select name="jenis_user_id" id="jenis_user_id" onChange={e => changeHandler(e)}>
                    <option value="4">Balai Pengaman Fasilitas Kesehatan / Institusi Pengamanan Fasilitas Kesehatan</option>
                    <option value="5">Regional Maintenance Center / Unit Pemeliharaan Peralatan Kesehatan</option>
                </select>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Nama Institusi</h3>
                <input type="text" name="nama_institusi" placeholder="Nama Institusi" onChange={e => changeHandler(e)} />
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Propinsi</h3>
                <select name="propinsi_id" id="propinsi_id" onChange={e => changeHandler(e)}>
                    <option value="0">Pilih</option>
                    <option value='11'>Aceh</option>
                    <option value='12'>Sumatera Utara</option>
                    <option value='13'>Sumatera Barat</option>
                    <option value='14'>Riau</option>
                    <option value='15'>Jambi</option>
                    <option value='16'>Sumatera Selatan</option>
                    <option value='17'>Bengkulu</option>
                    <option value='18'>Lampung</option>
                    <option value='19'>Kepulauan Bangka Belitung</option>
                    <option value='21'>Kepulauan Riau</option>
                    <option value='31'>DKI Jakarta</option>
                    <option value='32'>Jawa Barat</option>
                    <option value='33'>Jawa Tengah</option>
                    <option value='34'>Di Yogyakarta</option>
                    <option value='35'>Jawa Timur</option>
                    <option value='36'>Banten</option>
                    <option value='51'>Bali</option>
                    <option value='52'>Nusa Tenggara Barat</option>
                    <option value='53'>Nusa Tenggara Timur</option>
                    <option value='61'>Kalimantan Barat</option>
                    <option value='62'>Kalimantan Tengah</option>
                    <option value='63'>Kalimantan Selatan</option>
                    <option value='64'>Kalimantan Timur</option>
                    <option value='65'>Kalimantan Utara</option>
                    <option value='71'>Sulawesi Utara</option>
                    <option value='72'>Sulawesi Tengah</option>
                    <option value='73'>Sulawesi Selatan</option>
                    <option value='74'>Sulawesi Tenggara</option>
                    <option value='75'>Gorontalo</option>
                    <option value='76'>Sulawesi Barat</option>
                    <option value='81'>Maluku</option>
                    <option value='82'>Maluku Utara</option>
                    <option value='91'>Papua</option>
                    <option value='92'>Papua Barat</option>

                </select>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Kab/Kota</h3>
                <Select
                    options={kota} className="selectReact" name="kota_id" id="kota_id"
                    onChange={changeHandlerKota}
                />
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Alamat</h3>
                <input type="text" name="alamat" placeholder="Alamat" onChange={e => changeHandler(e)}/>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Kepemilikan</h3>
                <select name="kepemilikan_id" id="kepemilikan_id" onChange={e => changeHandler(e)}>
                    <option value='1'>Kemkes </option>
                    <option value='2'>Kementerian Lain</option>
                    <option value='3'>Pemprop</option>
                    <option value='4'>Pemkab</option>
                    <option value='5'>Pemkot</option>
                    <option value='6'>POLRI</option>
                    <option value='7'>TNI AD</option>
                    <option value='8'>TNI AL</option>
                    <option value='9'>TNI AU</option>
                    <option value='10'>Organisasi Sosial</option>
                    <option value='11'>Organisasi Islam </option>
                    <option value='12'>Organisasi Katholik</option>
                    <option value='13'>Organisasi Protestan</option>
                    <option value='14'>Organisasi Budha</option>
                    <option value='15'>Organisasi Hindu</option>
                    <option value='16'>BUMN</option>
                    <option value='17'>Perusahaan</option>
                    <option value='18'>SWASTA/ LAINNYA</option>
                    <option value='19'>Perorangan</option>
                </select>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >No. Telepon</h3>
                <input type="number" name="no_telp" placeholder="No. Telepon" onChange={e => changeHandler(e)}/>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Website</h3>
                <input type="text" name="website" placeholder="Website" onChange={e => changeHandler(e)}/>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Media Sosial</h3>
                <input type="text" name="media_sosial" placeholder="Media Sosial" onChange={e => changeHandler(e)}/>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Nama Pimpinan/ Penanggung Jawab</h3>
                <input type="text" name="nama_pj" placeholder="Nama Pimpinan/ Penanggung Jawab" onChange={e => changeHandler(e)}/>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >PJ Laboratorium Pengujian & Kalibrasi</h3>
                <input type="text" name="nama_pj_lab_kalibrasi" placeholder="PJ Laboratorium Pengujian & Kalibrasi" onChange={e => changeHandler(e)}/>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >PJ Mutu Teknis & Manajemen Pelayanan</h3>
                <input type="text" name="nama_pj_mutu" placeholder="PJ Mutu Teknis & Manajemen Pelayanan" onChange={e => changeHandler(e)}/>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Contact Person</h3>
                <input type="text" name="contact_person" placeholder="Contact Person" onChange={e => changeHandler(e)}/>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Nomor Izin Operasional</h3>
                <input type="text" name="nomor_izin_operasional" placeholder="Nomor Izin Operasional" onChange={e => changeHandler(e)}/>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Tanggal Izin Operasional</h3>
                <input type="date" name="tanggal_izin_operasional" placeholder="Tanggal Izin Operasional" onChange={e => changeHandler(e)}/>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Email</h3>
                <input type="text" name="email" placeholder="Email" onChange={e => changeHandler(e)}/>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Dokumen Izin Operasional</h3>
                <input type="file" name="dokumen_izin_operasional" placeholder="Dokumen Izin Operasional" />
            </div>
            <div className="gpt3__header-content__input" style={{ display: "flex" }}>
                <button type="button" style={{ marginLeft: "auto" }} onClick={batal}>Batal</button>
                <button type="button" style={{ marginLeft: "30px"}} onClick={simpan}>Simpan</button>
            </div>
            
            {/* <div className="gpt3__daftar-container">
            <Feature title="Chatbots" text="We so opinion friends me message as delight. Whole front do of plate heard oh ought." />
            <Feature title="Knowledgebase" text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b" />
            <Feature title="Education" text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b" />
            </div> */}
        </div>
    )
    
}

export default Daftar;
