const APIURL = "https://conduit.productionready.io/api";
function sendGetRequest(url: string = "") {
  return fetch(`${APIURL}/${url}`)
    .then((resp: any) => {
      if (!resp) throw new Error(resp);
      return resp.json();
    })
    .catch((err: any) => {
      throw new Error(err);
    });
}

export default class Service {
  static getAllPosts = () => {
    return sendGetRequest("articles?limit=100");
  };
  static getPost = (slug: string) => {
    return sendGetRequest(`articles/${slug}`);
  };
}
