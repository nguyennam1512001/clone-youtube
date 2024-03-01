import axios from '~/axios';

const getDoctors = (data) => {
    return axios.get(`/api/doctors?limit=${data.limit}&pageNumber=${data.pageNumber}`);
};

const getAllDoctors = () => {
    return axios.get(`/api/all-doctors`);
};

const saveInforDoctorSevice = (data) => {
    return axios.post(`/api/save-infor-doctor`, data);
};

const getDetailDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

const getAllDetailDoctor = () => {
    return axios.get(`/api/get-all-detail-doctor`);
};

const updateDetailDoctor = (data) => {
    return axios.put(`/api/edit-detail-doctor-by-id`, data);
};

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
};
export {
    getDoctors,
    getAllDoctors,
    saveInforDoctorSevice,
    getDetailDoctor,
    updateDetailDoctor,
    getAllDetailDoctor,
    saveBulkScheduleDoctor,
};
