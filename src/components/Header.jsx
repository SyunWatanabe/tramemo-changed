import * as React from 'react';
import Link from 'next/link';
import * as ROUTES from '../constants/routes';

const Header = ({ pathname }) => (
  <header>
    <Link href={ROUTES.LANDING}>
      <a className={pathname === ROUTES.LANDING ? 'is-active' : ''}>Home</a>
    </Link>
    <Link href={ROUTES.ABOUT}>
      <a className={pathname === ROUTES.ABOUT ? 'is-active' : ''}>About</a>
    </Link>
    <Link href={ROUTES.SIGN_IN}>
      <a className={pathname === ROUTES.SIGN_IN ? 'is-active' : ''}>Sign In</a>
    </Link>
    <Link href={ROUTES.SIGN_UP}>
      <a className={pathname === ROUTES.SIGN_UP ? 'is-active' : ''}>Sign UP</a>
    </Link>
    <Link href={ROUTES.LANDING}>
      <a className={pathname === ROUTES.LANDING ? 'is-active' : ''}>Landing</a>
    </Link>
    <Link href={ROUTES.MYPAGE}>
      <a className={pathname === ROUTES.MYPAGE ? 'is-active' : ''}>Mypage</a>
    </Link>
    <Link href={ROUTES.ACCOUNT}>
      <a className={pathname === ROUTES.ACCOUNT ? 'is-active' : ''}>Account</a>
    </Link>
    <Link href={ROUTES.ADMIN}>
      <a className={pathname === ROUTES.ADMIN ? 'is-active' : ''}>Admin</a>
    </Link>
    <style jsx>{`
      a {
        margin: 10px;
      }
    `}</style>
  </header>
);

export default Header;
