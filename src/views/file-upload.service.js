import * as axios from "axios";

function upload(formData) {
  const url = "http://localhost:3000/documents";
  return axios.post(url, formData).then(function() {
    console.log("SUCCESS!!");
  });
  // get data
  //   .then(x => x.data)
  //   // add url field
  //   .then(x =>
  //     x.map(img =>
  //       Object.assign({}, img, { url: `${BASE_URL}/images/${img.id}` })
  //     )
  //       )
  //   );
}

export { upload };
