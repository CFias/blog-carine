import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../reducer/userReducer";

export default function Login() {
  const dispatch = useDispatch();
  const user = { name: "Fias", age: 25 };

  const usuario = useSelector((state) => state.user)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setUser(user));
  };

  return (
    <div className="login-container">
      <h1 className="form-logo-name">Carine Lima</h1>
      <h2 className="form-title">Fazer Login</h2>
      <form onSubmit={handleSubmit} className="login-content">
        <label>
          <span>E-mail</span>
          <input
            type="text"
            name="email"
            required
            placeholder="E-mail de acesso"
          />
          <span>Senha</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Digite a sua senha"
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
