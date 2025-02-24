import React, { useState } from 'react';
import styles from './Login.module.css';

const Login = () => {
  const [activeForm, setActiveForm] = useState('login');

  return (
    <div className={styles.loginContainer}>
      <section className="h-100">
        <div className={`container py-5 h-100 ${styles.loginWrapper}`}>
          <div className={`row d-flex justify-content-center align-items-center h-100 ${styles.rowLogin}`}>
            <div className="col-xl-10">
              <div className={`card rounded-3 text-black ${styles.loginCard}`}>
                <div className="row g-0">
                  <div className={`col-lg-6 ${styles.colLogin}`}>
                    <div className={`card-body p-md-5 mx-md-4 ${styles.loginCardBody}`}>
                      <div className="text-center">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          alt="logo"
                          className={styles.logo}
                        />
                        <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                      </div>

                      {/* ==== FORM LOGIN ==== */}
                      {activeForm === 'login' && (
                        <form>
                          <div className={`form-outline mb-4 ${styles.formControl}`}>
                            <input type="email" id="loginEmail" placeholder=" " className="form-control" required />
                            <label className={styles.formLabel} htmlFor="loginEmail">Email</label>
                          </div>
                          <div className={`form-outline mb-4 ${styles.formControl}`}>
                            <input type="password" id="loginPassword" placeholder=" " className="form-control" required />
                            <label className={styles.formLabel} htmlFor="loginPassword">Password</label>
                          </div>
                          <button className={`btn ${styles.loginButton}`}>Log in</button>
                          <p className="text-center mt-3">
                            <button className={styles.switchButton} onClick={() => setActiveForm('forgot')}>
                              Forgot password?
                            </button>
                          </p>
                          <p className="text-center">
                            Don't have an account?{" "}
                            <button className={styles.switchButton} onClick={() => setActiveForm('register')}>
                              Create new
                            </button>
                          </p>
                        </form>
                      )}

                      {/* ==== FORM REGISTER ==== */}
                      {activeForm === 'register' && (
                        <form>
                          <div className={`form-outline mb-4 ${styles.formControl}`}>
                            <input type="text" id="registerName" placeholder=" " className="form-control" required />
                            <label className={styles.formLabel} htmlFor="registerName">Full Name</label>
                          </div>
                          <div className={`form-outline mb-4 ${styles.formControl}`}>
                            <input type="email" id="registerEmail" placeholder=" " className="form-control" required />
                            <label className={styles.formLabel} htmlFor="registerEmail">Email</label>
                          </div>
                          <div className={`form-outline mb-4 ${styles.formControl}`}>
                            <input type="password" id="registerPassword" placeholder=" " className="form-control" required />
                            <label className={styles.formLabel} htmlFor="registerPassword">Password</label>
                          </div>
                          <button className={`btn ${styles.loginButton}`}>Sign Up</button>
                          <p className="text-center mt-3">
                            Already have an account?{" "}
                            <button className={styles.switchButton} onClick={() => setActiveForm('login')}>
                              Log in
                            </button>
                          </p>
                        </form>
                      )}

                      {/* ==== FORM FORGOT PASSWORD ==== */}
                      {activeForm === 'forgot' && (
                        <form>
                          <div className={`form-outline mb-4 ${styles.formControl}`}>
                            <input type="email" id="forgotEmail" placeholder=" " className="form-control" required />
                            <label className={styles.formLabel} htmlFor="forgotEmail">Enter your email</label>
                          </div>
                          <button className={`btn ${styles.loginButton}`}>Reset Password</button>
                          <p className="text-center mt-3">
                            Remember your password?{" "}
                            <button className={styles.switchButton} onClick={() => setActiveForm('login')}>
                              Log in
                            </button>
                          </p>
                        </form>
                      )}
                    </div>
                  </div>
                  <div className={`col-lg-6 ${styles.gradientSection}`}>
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
