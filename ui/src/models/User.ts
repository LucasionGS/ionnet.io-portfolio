export default class User {
  public username!: string;
  public id!: number;
  public token!: string;

  public static getUser(): User | null {
    const data = window.localStorage.getItem("user");
    if (data) {
      const user = JSON.parse(data);
      return Object.assign(new User(), user);
    }
    return null;
  }

  public static setUser(user: User) {
    window.localStorage.setItem("user", JSON.stringify(user));
  }

  public static logout(){
    window.localStorage.removeItem("user");
  }

  /**
   * Gets the currently logged in user's authentication headers.
   */
  public static get headers(): {
    Authorization?: string;
  } {
    const user = User.getUser();
    if (user) {
      return user.headers;
    }
    return {};
  }

  /**
   * Gets the user's authentication headers.
   */
  public get headers() {
    return {
      "Authorization": `Bearer ${this.token}`
    }
  }
}