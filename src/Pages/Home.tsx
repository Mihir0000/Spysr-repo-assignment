import React, { useEffect } from 'react'
import Hero from '../Components/Hero/Hero'

import { clientStore, serverStore } from '../store/store'
import { fetchName, fetchEmailAddresses, fetchUserNameAndId } from '../store/actions'
import { Link } from 'react-router-dom'
import style from '../Styles/Home.module.css'

const Home = () => {
  const store = clientStore()

  useEffect(() => {
    store.dispatch(fetchName())
    store.dispatch(fetchEmailAddresses())
    store.dispatch(fetchUserNameAndId())
  }, [])

  const data = store.state.userData
  if (data) {
    console.log(data)
  }

  return (
    <div>
      <Hero title={store.state.name} subtitle="page subtitle" />
      <section className={style.sections}>
        <div className="container">
          <div className={style.information}>
            <h2 className={style.heading}>Address: {store.state.address}</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img style={{ maxWidth: 200 }} src="/img/react-logo.svg" />
            </div>

            <Link className={style.link} to="/tutorials">
              Go to the tutorials
            </Link>
            <p className={style.para}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book...
            </p>
          </div>
          <div className={style.information}>
            <h2 className={style.heading}>Employer Information</h2>
            <div className={style.containerBox}>
              {data &&
                data.map(item => (
                  <div className={style.biodata} key={item.id}>
                    <h2>
                      <span>Name: </span>
                      {item.name}
                    </h2>
                    <p>
                      <span>User Name: </span>
                      {item.username}
                    </p>
                    <p>
                      <span>Phone No: </span>
                      {item.phone}
                    </p>

                    <p>
                      <span>Website: </span> {item.website}
                    </p>
                    <p>
                      <span>Email: </span> {item.email}
                    </p>
                    <div className={style.address}>
                      <h4>Address:</h4>
                      <p>City : {item.address.city}</p>
                      <p>Street : {item.address.street}</p>
                      <p>ZipCode : {item.address.zipcode}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <br />
          <h2>Emails</h2>
          <ul>
            {store.state?.emails ? (
              store.state?.emails?.map((email, i) => (
                <li className={style.emails} key={i}>
                  {email}
                </li>
              ))
            ) : (
              <div>...loading</div>
            )}
          </ul>
        </div>
      </section>
    </div>
  )
}

Home.prefetchData = () => {
  // if you fetch only one resource you can simply use ↵
  // return serverStore.dispatch(fetchName())
  // but if you fetch multiple resources use an array ↵
  return [serverStore.dispatch(fetchName()), serverStore.dispatch(fetchEmailAddresses())]
}

export default Home
