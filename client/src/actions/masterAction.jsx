import axios from "axios";

// show locations
export const GET_REGION = "GET_REGION";
export const GET_COUNTRY = "GET_COUNTRY";
export const GET_PROVINCE = "GET_PROVINCE";
export const GET_CITY = "GET_CITY";

// add locations region
export const POST_REGION = "POST_REGION";
// update locations region
export const UPDATE_REGION = "UPDATE_REGION";
// delete locations region
export const DELETE_REGION = "DELETE_REGION";

// add locations country
export const POST_COUNTRY = "POST_COUNTRY";
// update locations country
export const UPDATE_COUNTRY = "UPDATE_COUNTRY";
// delete locations country
export const DELETE_COUNTRY = "DELETE_COUNTRY";

// locations
export const getRegions = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_REGION,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "GET",
      url: "http://localhost:4000/regions",
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: GET_REGION,
          payload: {
            data: res.data.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_REGION,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

export const postRegions = (dataRegion) => {
  return async (dispatch) => {
    dispatch({
      type: POST_REGION,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "POST",
      url: "http://localhost:4000/regions",
      timeout: 120000,
      data: dataRegion,
    })
      .then((res) => {
        dispatch({
          type: POST_REGION,
          payload: {
            data: res.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: POST_REGION,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

export const updateRegions = (dataRegion, idRegion) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_REGION,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "PUT",
      url: "http://localhost:4000/regions/" + idRegion,
      data: dataRegion,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: UPDATE_REGION,
          payload: {
            data: res.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_REGION,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

export const deleteRegions = (idRegion) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_REGION,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "DELETE",
      url: "http://localhost:4000/regions/" + idRegion,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: DELETE_REGION,
          payload: {
            data: res.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: DELETE_REGION,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

export const getCountry = (idRegion) => {
  return async (dispatch) => {
    dispatch({
      type: GET_COUNTRY,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "GET",
      url: "http://localhost:4000/country/" + idRegion,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: GET_COUNTRY,
          payload: {
            data: res.data.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_COUNTRY,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

export const postCountry = (dataCountry) => {
  return async (dispatch) => {
    dispatch({
      type: POST_COUNTRY,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "POST",
      url: "http://localhost:4000/country",
      timeout: 120000,
      data: dataCountry,
    })
      .then((res) => {
        dispatch({
          type: POST_COUNTRY,
          payload: {
            data: res.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: POST_COUNTRY,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

export const updateCountry = (dataCountry, idCountry) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_COUNTRY,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "PUT",
      url: "http://localhost:4000/country/" + idCountry,
      data: dataCountry,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: UPDATE_COUNTRY,
          payload: {
            data: res.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_COUNTRY,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

export const deleteCountry = (idCountry) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_COUNTRY,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "DELETE",
      url: "http://localhost:4000/country/" + idCountry,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: DELETE_COUNTRY,
          payload: {
            data: res.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: DELETE_COUNTRY,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

export const getProvince = (idCountry) => {
  return async (dispatch) => {
    dispatch({
      type: GET_PROVINCE,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "GET",
      url: "http://localhost:4000/province/" + idCountry,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: GET_PROVINCE,
          payload: {
            data: res.data.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_PROVINCE,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

export const getCity = (idProvince) => {
  return async (dispatch) => {
    dispatch({
      type: GET_CITY,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "GET",
      url: "http://localhost:4000/city/" + idProvince,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: GET_CITY,
          payload: {
            data: res.data.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_CITY,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};