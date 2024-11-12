const UserApi = {
  signUp: (formData) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": formData.email,
      "name": formData.name,
      "password": formData.password,
      "confirmPassword": formData.confirmPassword
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    return fetch(`${process.env.REACT_APP_SERVER_URL}/users/sign_up`, requestOptions)
      .then((response) => response.json())
  },
  signIn: (formData) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": formData.email,
      "password": formData.password
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    return fetch(`${process.env.REACT_APP_SERVER_URL}/users/sign_in`, requestOptions)
      .then((response) => response.json())
  },
  signWithGoogle: () => {
    return window.location.href = `${process.env.REACT_APP_SERVER_URL}/users/google`
  }
}
export { UserApi }
