import axios from "axios";

const BASE_URL = "http://localhost:2004/theatre";

class TheatreService {
    addTheatre(theatre) {
        return axios.post(BASE_URL + "/add", theatre);
    }

    getAllTheatres() {
        return axios.get(BASE_URL + "/displayall");
    }

    getTheatreById(id) {
        return axios.get(BASE_URL + "/display/" + id);
    }

    updateTheatre(id, theatre) {
        return axios.put(BASE_URL + "/update/" + id, theatre);
    }

    deleteTheatre(id) {
        return axios.delete(BASE_URL + "/delete/" + id);
    }
}

export default new TheatreService();