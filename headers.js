const base64 = require('base-64');

const headers = new Headers();
headers.append("Authorization", "Basic " + base64.encode("retimy-security:7a83758a-0d83-40c1-9dba-ce3612b2ac4f"));

export default headers;

