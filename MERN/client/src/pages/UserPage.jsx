import React, { useState } from 'react';
import '../styles/UserRegister.css'


const UserPage = () => {
  const [qrCode, setQrCode] = useState('');

  const generateQr = () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const url = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=Name:${name}%0a Email: ${email} Subject: ${subject} Message: ${message}`;

    const ifr = `<iframe src="${url}" height="200" width="200"></iframe>`;

    setQrCode(ifr);
  };

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-5">
            <h2 className="heading-section"><u><b>STUDENT CONTACT FORM</b></u></h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="wrapper">
              <div className="row">
                <div className="col-md-3">
                  <div id="qrcode" className="mt-5 text-center" dangerouslySetInnerHTML={{ __html: qrCode }}></div>
                </div>
                <div className="col-md-9">
                  <div className="row no-gutters">
                    <div className="col-lg-12 col-md-12 order-md-last d-flex align-items-stretch">
                      <div className="contact-wrap w-100 p-md-5 p-4">
                        <h3 className="mb-4"><b>GET IN TOUCH</b></h3>
                        <div id="form-message-warning" className="mb-4"></div>
                        <div id="form-message-success" className="mb-4">
                          Your message was sent, thank you!
                        </div>
                        <form method="AdminRegister" name="contactForm" className="contactForm">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="label" htmlFor="name">FULL NAME</label>
                                <input type="text" className="form-control" name="name" id="name" placeholder="FULL NAME" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="label" htmlFor="email">EMAIL</label>
                                <input type="email" className="form-control" name="email" id="email" placeholder="abcd1234@gmil.com" />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label className="label" htmlFor="subject">REGISTER NUMBER</label>
                                <input type="text" className="form-control" name="subject" id="subject" placeholder="REGISTER NUMBER" />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label className="label" htmlFor="message">PARENT WHATSAPP NUMBER</label>
                                <textarea name="message" className="form-control" id="message" placeholder="PARENT WHATSAPP NUMBER"></textarea>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <input type="button" value="Send Message" className="btn btn-primary" onClick={generateQr} />
                                <div className="submitting"></div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="text pl-3">
                    <p><span>2024@SPIKKERS TEAM  &#127891;</span> <a href="https://www.google.com/search?q=mahendra+educational+institutions&rlz=1C1JJTC_en-GBIN1072IN1072&oq=&gs_lcrp=EgZjaHJvbWUqCQgDECMYJxjqAjIJCAAQIxgnGOoCMgkIARAjGCcY6gIyCQgCECMYJxjqAjIJCAMQIxgnGOoCMgkIBBAjGCcY6gIyCQgFECMYJxjqAjIJCAYQRRg7GMIDMgkIBxBFGDsYwgPSAQ05OTMzOTYyNzNqMGo3qAIIsAIB&sourceid=chrome&ie=UTF-8">MAHENDRA.INFO.COM</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
  );
  


};


export default UserPage;
