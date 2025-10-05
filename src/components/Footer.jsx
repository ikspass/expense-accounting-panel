import React from 'react'
import classes from './../styles/Footer.module.css'

const Footer = () => {
  return (
    <div className={`text-small ${classes.container}`}>
      <div className={classes.containerItem}>
        <div>
          <img src="/images/footer-logo.png" width='144px' alt="Logo" />
          <div>
            <p>© 2025 ExpenseVista</p>
            <p>All Rights Reserved</p>
          </div>
        </div>
        <div className={classes.gap8}>
          <div className={classes.contactsItem}>
            <img src="/svg/Address.svg" alt="Address icon" />
            <p>1234 Finance Avenue, San Francisco, CA 94105, USA</p>
          </div>
          <div className={classes.contactsItem}>
            <img src="/svg/Phone.svg" alt="Phone icon" />
            <p>+1 (415) 555-0199</p>
          </div>
          <div className={classes.contactsItem}>
            <img src="/svg/Email.svg" alt="Email icon" />
            <p>support@expensevista.com</p>
          </div>
        </div>
      </div>
      <div className={classes.containerItem}>
        <div className={classes.gap8}>
          <div className={classes.gap4}>
            <p className='text-caps'>support & help</p>
            <p>Help Center</p>
            <p>Contact Us</p>
          </div>
        </div>
        <div className={classes.gap8}>
          <div className={classes.gap4}>
            <p className='text-caps'>security & trust</p>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>
        </div>
        <div className={classes.gap8}>
          <div className={classes.gap4}>
            <p className='text-caps'>resources</p>
            <p>Feedback</p>
            <p>Blog</p>
          </div>
          </div>
      </div>
    </div>
  )
}

export default Footer