export default class User {
  public id!: number;
  public username!: string;
  public token!: string;
  
  public static getUser(): User | null {
    const data = window.localStorage.getItem("user");
    if (data) {
      const user = JSON.parse(data);
      return Object.assign(new User(), user);
    }
    return null;
  }
  
  public static setUser(user: User): void {
    window.localStorage.setItem("user", JSON.stringify(user));
  }
}