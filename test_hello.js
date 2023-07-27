import http from "k6/http";

export const options = {
    vus : 199,
    duration : "10s",
}

export default function() {
    http.get("http://localhost:8000");
}