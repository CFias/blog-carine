import React from 'react';

export default function Login() {
  return (
    <section>
      <form>
        <label>
          <span>E-mail</span>
          <input type="text" name="email" required placeholder="E-mail de acesso" />
        </label>
      </form>
    </section>
  )
}
