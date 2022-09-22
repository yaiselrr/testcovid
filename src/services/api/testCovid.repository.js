import repository from "./repository"

const resource = "TestCovid";

export default {
    async getAll({ idUsuario }) {
        let endpoint = `${resource}/obtenerTestCovid?idusuario=${idUsuario}`;
        let response = await repository.get(endpoint);
        return response;
    },
    async add(payload) {
        repository.headers = {
            ...repository.headers,
            'Content-Type': 'multipart/form-data'
        };
        let endpoint = `${resource}/guardarTestCovid`;
        let response = await repository.post(endpoint, payload);
        return response;
    },
    async getAllByPharmacy({ idfarmacia }) {

        repository.headers = {
            ...repository.headers,
            'Content-Type': 'multipart/form-data'
        };
        let endpoint = `${resource}/obtenerTestCovidFarmacia?idfarmacia=${idfarmacia}`;
        let response = await repository.get(endpoint);
        return response;
    },

}