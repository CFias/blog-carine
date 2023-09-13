export default function Login() {
  return (
    <div className="login-container">
      <h1 className="form-logo-name">Carine Lima</h1>
      <h2 className="form-title">Cadastre-se</h2>
      <form className="login-content">
        <label >
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
      </form>
    </div>
  );
}
