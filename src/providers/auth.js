import storage from "./storage";
import { translate } from "ra-core";
import mockDataProvider from "./data";
import pengguna from "../resources/pengguna";

export default {
  login: async ({ username, password }) => {
    await mockDataProvider
      .getList(pengguna.identities.name, {
        pagination: { page: 1, perPage: 1 },
        sort: { field: pengguna.fields.id.source, order: "ASC" },
        filter: {
          no_identitas: username,
          kata_sandi: password
        }
      })
      .then(({ data: res }) => {
        const pengguna = res[0];

        if (pengguna !== undefined) {
          storage.set(pengguna);

          return Promise.resolve();
        } else {
          return Promise.reject(translate("Login Gagal"));
        }
      });
  },
  logout: () => {
    storage.clear();

    return Promise.resolve();
  },
  checkError: error => {
    const status = error.status;

    if (status === 401 || status === 403) {
      storage.clear();
      return Promise.reject();
    }

    return Promise.resolve();
  },
  checkAuth: () => (storage.get() ? Promise.resolve() : Promise.reject()),
  getPermissions: () => {
    const pengguna = storage.get();

    return pengguna ? Promise.resolve(pengguna) : Promise.reject();
  }
};
