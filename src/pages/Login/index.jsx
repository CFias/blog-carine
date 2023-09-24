import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../reducer/userReducer";
import "../../index.css";

export default function Login() {
  const dispatch = useDispatch();
  const user = { name: "Fias", age: 25 };

  const usuario = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setUser(user));
  };

  return (
    <div className="form-container">
      <h1 className="form-logo-name">Carine Lima</h1>
      <h2 className="form-title">Fazer Login</h2>
      <form onSubmit={handleSubmit} className="form-content">
        <label className="form-item">
          E-mail
          <input
            className="form-in"
            type="text"
            name="email"
            required
            placeholder="E-mail de acesso"
          />
        </label>
        <label className="form-item">
          Senha
          <input
            className="form-in"
            type="password"
            name="password"
            required
            placeholder="Digite a sua senha"
          />
        </label>
        <button className="form-btn" type="submit">Login</button>
      </form>
    </div>
  );
}
